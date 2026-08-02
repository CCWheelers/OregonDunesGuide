import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source=readFileSync(new URL("../static/site.js",import.meta.url),"utf8");
const context={
  console,
  Date,
  Intl,
  URL,
  URLSearchParams,
  setTimeout,
  clearTimeout,
  document:{addEventListener(){},getElementById(){return null}},
  window:{location:{href:"https://example.test/planner.html"}},
  location:{search:""},
  navigator:{}
};
vm.createContext(context);
vm.runInContext(source,context);

const base={
  arrival:"2026-10-01",
  departure:"2026-10-03",
  region:"florence",
  vehicle:"2wd",
  tripType:"offsite",
  rentalType:"none",
  experience:"first",
  partySize:2,
  planningGroup:false,
  toys:["none"],
  crew:[],
  interests:[]
};

function makePlan(overrides={}){
  return context.buildTrip({...base,...overrides})
}

function itineraryText(plan){
  return context.selectedItinerary(plan,[]).days.flat().join(" ")
}

function checklistText(plan){
  return plan.checklistGroups.flatMap(group=>[group.title,...group.items]).join(" ")
}

test("unselected activities do not leak into non-riding plans",()=>{
  const regions=["florence","winchester","coos"];
  const vehicles=["2wd","4wd","rv"];
  const tripTypes=["camping","offsite","day"];
  const dayRanges=[["2026-10-01","2026-10-01"],["2026-10-01","2026-10-02"],["2026-10-01","2026-10-03"],["2026-10-01","2026-10-05"]];
  const interestModes=[[],["lakes"],["wildlife"],["towns"],["hiking"]];
  const crewModes=[[],["youth"],["dog"],["campfire"],["accessibility"]];
  for(const region of regions)for(const vehicle of vehicles)for(const tripType of tripTypes)for(const [arrival,departure] of dayRanges)for(const interests of interestModes)for(const crew of crewModes)for(const planningGroup of [false,true]){
    const plan=makePlan({region,vehicle,tripType,arrival,departure,interests,crew,planningGroup});
    const itinerary=itineraryText(plan);
    const complete=`${itinerary} ${checklistText(plan)} ${context.renderPlanSources(plan)} ${context.personalizedPlanLead(plan)}`;
    assert.doesNotMatch(complete,/\b(?:OHV|ATV|quad|side-by-side|dirt bike|machines?|riders?|riding|staging)\b/i);
    if(!interests.includes("lakes")&&!interests.includes("wildlife"))assert.doesNotMatch(itinerary,/\b(?:lake|paddling)\b/i);
    if(!interests.includes("towns"))assert.doesNotMatch(itinerary,/\b(?:shopping|dining|lunch|dinner|breakfast)\b/i);
    if(!interests.includes("wildlife")&&!crew.includes("dog"))assert.doesNotMatch(complete,/\b(?:wildlife|habitat)\b/i);
    if(vehicle!=="rv")assert.doesNotMatch(itinerary,/\b(?:RV|trailer)\b/i);
    if(!planningGroup)assert.doesNotMatch(itinerary,/\bgroup\b/i)
  }
});

test("every optional interest adds relevant itinerary content",()=>{
  const expected={
    lakes:/lake/i,
    wildlife:/wildlife/i,
    towns:/shopping.*dining|dining.*shopping/i,
    hiking:/walk.*photography|photography.*walk/i
  };
  for(const [interest,pattern] of Object.entries(expected)){
    const quiet=makePlan({interests:[interest]});
    assert.match(itineraryText(quiet),pattern);
    const riding=makePlan({toys:["quad"],interests:[interest]});
    assert.match(itineraryText(riding),pattern)
  }
});

test("crew choices add relevant preparation without inventing machines",()=>{
  const expected={
    youth:/age-appropriate|supervision/i,
    dog:/leash|dog/i,
    campfire:/fire restriction|extinguisher/i,
    accessibility:/accessible parking|accessible/i
  };
  for(const [crew,pattern] of Object.entries(expected)){
    const plan=makePlan({crew:[crew]});
    const complete=`${itineraryText(plan)} ${checklistText(plan)}`;
    assert.match(complete,pattern);
    assert.doesNotMatch(complete,/\b(?:machine|rider fit|OHV|ATV)\b/i)
  }
});

test("machine, rental, vehicle, and experience choices add matching guidance",()=>{
  const machines={quad:/ATV controls/i,sxs:/side-by-side restraints/i,bike:/dirt-bike controls/i};
  for(const [toy,pattern] of Object.entries(machines)){
    const plan=makePlan({toys:[toy],experience:"some"});
    assert.match(checklistText(plan),pattern);
    assert.match(itineraryText(plan),/conservative first loop/i)
  }
  const rentals={quad:/ATV \/ quad/i,sxs:/side-by-side \/ UTV/i,bike:/dirt bike/i,unsure:/reserved OHV/i};
  for(const [rentalType,pattern] of Object.entries(rentals)){
    const plan=makePlan({rentalType});
    assert.match(`${itineraryText(plan)} ${checklistText(plan)}`,pattern);
    assert.match(checklistText(plan),/OHV rental/i)
  }
  assert.match(checklistText(makePlan({vehicle:"4wd"})),/4×4 vehicle/i);
  assert.match(checklistText(makePlan({vehicle:"rv"})),/RV or trailer/i);
  assert.match(checklistText(makePlan({vehicle:"2wd",toys:["quad"]})),/2WD access/i);
  assert.match(itineraryText(makePlan({toys:["quad"],experience:"first"})),/low-consequence practice area/i);
  assert.match(itineraryText(makePlan({toys:["quad"],experience:"experienced"})),/before increasing the pace/i)
});

test("stay, dog, group, and source results follow their selections",()=>{
  for(const tripType of ["camping","offsite","day"]){
    const plan=makePlan({tripType});
    const stay=context.renderStaySection(plan);
    if(tripType==="day")assert.match(stay,/No overnight stay selected/);
    else if(tripType==="offsite")assert.match(stay,/Town lodging/);
    else assert.match(stay,/Campgrounds/)
  }
  for(const region of ["florence","winchester","coos"])for(const tripType of ["camping","offsite"])for(const vehicle of ["2wd","rv"]){
    const plan=makePlan({region,tripType,vehicle,crew:["dog"]});
    const stay=context.renderStaySection(plan);
    assert.match(stay,/Dog-friendly filter is on/);
    assert.doesNotMatch(stay,/River House Inn|Winchester Bay Inn|Edgewater Inn|Half Moon Bay Campground|Riley Ranch County Park/)
  }
  const solo=makePlan();
  assert.doesNotMatch(context.renderPlanSources(solo),/Forest Service OHV|Oregon ATV Program/);
  assert.match(context.renderPlanSources(makePlan({toys:["quad"]})),/Forest Service OHV/);
  assert.match(JSON.stringify(context.selectionSummaryItems(makePlan({planningGroup:true}),[])),/Group trip/)
});

test("Florence lodging, dog, paddling, and town choices produce only relevant results",()=>{
  const plan=makePlan({
    region:"florence",
    vehicle:"2wd",
    tripType:"offsite",
    rentalType:"none",
    toys:["none"],
    crew:["dog"],
    interests:["lakes","towns"]
  });
  const picks=[
    {key:"stay:lodging:2",name:"Best Western Pier Point Inn"},
    {key:"lake:0",name:"Cleawox Lake at Honeyman"},
    {key:"shopping:0",name:"Historic Old Town Florence"},
    {key:"lunch:0",name:"Mari's Kitchen"},
    {key:"dinner:1",name:"Old Town waterfront dining"},
    {key:"breakfast:0",name:"Little Brown Hen Cafe"}
  ];
  const itinerary=context.selectedItinerary(plan,picks).days.flat().join(" ");
  assert.match(itinerary,/Arrive and check in at Best Western Pier Point Inn/);
  assert.match(itinerary,/Paddling at Cleawox Lake at Honeyman/);
  assert.match(itinerary,/Historic Old Town Florence/);
  assert.match(itinerary,/Mari's Kitchen/);
  assert.match(itinerary,/Old Town waterfront dining/);
  assert.match(itinerary,/Little Brown Hen Cafe/);
  assert.match(context.selectedItinerary(plan,picks).days[0][0],/then dinner at Old Town waterfront dining/);
  assert.match(context.selectedItinerary(plan,picks).days[2][0],/Breakfast at Little Brown Hen Cafe, then head home/);
  assert.equal(context.selectedItinerary(plan,picks).days[0][2].at(-1).time,"17:00");
  assert.equal(context.selectedItinerary(plan,picks).days[2][2][0].time,"09:00");
  assert.doesNotMatch(itinerary,/\bdune walk\b|\bpermitted dune\b/i);
  assert.doesNotMatch(itinerary,/\b(?:OHV|ATV|machine|riding|staging)\b/i);

  const lakeSection=context.renderLakeSection(plan);
  assert.match(lakeSection,/Cleawox Lake at Honeyman/);
  assert.match(lakeSection,/Woahink Lake at Honeyman/);
  assert.match(lakeSection,/Bringing your dog/);
  assert.match(lakeSection,/Current water temperature/);
  assert.match(lakeSection,/lakemonster\.com\/lake\/Oregon\/Cleawox-Lake-14315/);

  const shopping=context.renderLocalStopGroup(
    "TOURIST SHOPPING",
    plan.region.localStops.shopping,
    "shopping"
  );
  assert.match(shopping,/Planned time/);
  assert.match(shopping,/Trip note/);
  assert.doesNotMatch(shopping,/Reservation name|Confirmation number/);

  const lunch=context.renderLocalStopGroup(
    "LUNCH",
    plan.region.localStops.lunch,
    "lunch"
  );
  assert.match(lunch,/Reservation name/);
  assert.match(lunch,/Confirmation number/);
});

test("selected stops can be assigned across arrival, full, and departure days",()=>{
  const plan=makePlan({
    region:"florence",
    tripType:"offsite",
    crew:["dog"],
    interests:["lakes","towns"],
    stopDetails:{
      "dinner:1":{day:"1",time:"18:30"},
      "breakfast:1":{day:"2",time:"08:00"},
      "lake:0":{day:"2",time:"10:00"},
      "lunch:0":{day:"2",time:"13:00"},
      "dinner:0":{day:"2",time:"18:00"},
      "breakfast:0":{day:"3",time:"08:30"}
    }
  });
  const picks=[
    {key:"stay:lodging:2",name:"Best Western Pier Point Inn"},
    {key:"dinner:1",name:"Old Town waterfront dining"},
    {key:"breakfast:1",name:"Fresh Harvest Cafe"},
    {key:"lake:0",name:"Cleawox Lake at Honeyman"},
    {key:"lunch:0",name:"Mari's Kitchen"},
    {key:"dinner:0",name:"The Waterfront Depot"},
    {key:"breakfast:0",name:"Little Brown Hen Cafe"}
  ];
  const itinerary=context.selectedItinerary(plan,picks);
  assert.match(itinerary.days[0][0],/check in at Best Western Pier Point Inn, then dinner at Old Town waterfront dining/i);
  assert.deepEqual(Array.from(itinerary.days[0][2],item=>item.label),["Check in","Dinner"]);
  assert.match(itinerary.days[1][0],/Breakfast at Fresh Harvest Cafe, then paddling at Cleawox Lake at Honeyman, then dinner at The Waterfront Depot/i);
  assert.deepEqual(Array.from(itinerary.days[1][2],item=>item.label),["Breakfast","Paddling","Lunch","Dinner"]);
  assert.match(itinerary.days[2][0],/Breakfast at Little Brown Hen Cafe, then head home/i);

  const breakfast=context.renderLocalStopGroup(
    "BREAKFAST",
    plan.region.localStops.breakfast,
    "breakfast",
    [],
    plan.stopDetails,
    false,
    3
  );
  assert.match(breakfast,/Which day\?/);
  assert.match(breakfast,/Day 1 · Arrival/);
  assert.match(breakfast,/Day 3 · Departure/);
  assert.equal((breakfast.match(/type="checkbox"/g)||[]).length,2);
});

test("default meal times are convenient and late lake outings trigger dinner guidance",()=>{
  const plan=makePlan({
    region:"florence",
    tripType:"offsite",
    interests:["lakes","towns"],
    stopDetails:{
      "lake:0":{day:"2",time:"14:00"},
      "dinner:0":{day:"2",time:"17:00"}
    }
  });
  const picks=[
    {key:"lake:0",name:"Cleawox Lake at Honeyman"},
    {key:"dinner:0",name:"The Waterfront Depot"}
  ];
  const itinerary=context.selectedItinerary(plan,picks);
  assert.match(itinerary.days[1][3],/may not leave enough time/i);
  assert.match(itinerary.days[1][3],/Consider moving dinner to about 6:00 PM/i);

  const breakfast=context.renderLocalStopGroup("BREAKFAST",plan.region.localStops.breakfast,"breakfast",[],{},false,3);
  const lunch=context.renderLocalStopGroup("LUNCH",plan.region.localStops.lunch,"lunch",[],{},false,3);
  const dinner=context.renderLocalStopGroup("DINNER",plan.region.localStops.dinner,"dinner",[],{},false,3);
  assert.match(breakfast,/value="09:00"/);
  assert.match(lunch,/value="12:00"/);
  assert.match(dinner,/value="17:00"/);
});

test("every dune region offers named paddling choices",()=>{
  for(const region of ["florence","winchester","coos"]){
    const plan=makePlan({region,interests:["lakes"]});
    assert.ok(plan.region.lakeStops.length>=2);
    assert.match(context.renderLakeSection(plan),/PADDLING OPTIONS/);
  }
});

test("water-temperature links are used only for exact verified lake matches",()=>{
  const florence=makePlan({region:"florence",interests:["lakes"]});
  const coos=makePlan({region:"coos",interests:["lakes"]});
  const winchester=makePlan({region:"winchester",interests:["lakes"]});
  assert.equal(florence.region.lakeStops.filter(stop=>stop.waterTempUrl).length,2);
  assert.equal(coos.region.lakeStops.filter(stop=>stop.waterTempUrl).length,1);
  assert.equal(winchester.region.lakeStops.filter(stop=>stop.waterTempUrl).length,0);
  for(const plan of [florence,coos,winchester]){
    for(const stop of plan.region.lakeStops){
      if(stop.waterTempUrl)assert.match(stop.waterTempUrl,/^https:\/\/lakemonster\.com\/lake\//);
    }
  }
});

test("sharing prefers the native app handoff and avoids retired messenger.com",()=>{
  assert.doesNotMatch(source,/https:\/\/www\.messenger\.com\//);
  assert.match(source,/navigator\.share\(\{title:shareTitle,text:message\}\)/);
  assert.match(source,/odgTrack\("planner_share_device"/);
});
