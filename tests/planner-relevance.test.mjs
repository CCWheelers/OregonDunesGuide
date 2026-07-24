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
