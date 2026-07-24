const chapters = {
  camping:{eyebrow:"CAMPING GUIDE",title:"Sleep close to the wild.",intro:"Choose a forest hideaway, lakeside family base, harbor campground, or ride-from-camp site—then build around the access, noise level, and facilities your group actually needs.",sections:[
    ["Pick a region before a campground","Florence is the easiest all-around base for first visits, lakes, and non-riding companions. Winchester Bay is compact and riding-focused. Coos Bay and North Bend offer the most services and broad southern-zone access.",["Florence: South Jetty, Siltcoos, Honeyman, and nearby lakes","Winchester Bay: Umpqua Dunes, harbor services, and lighthouse country","Coos Bay: Spinreel, Horsfall, Riley Ranch, repairs, and full-size groceries"]],
    ["Developed campgrounds","Honeyman is a large state-park option close to Florence. Forest Service sites such as Eel Creek, Spinreel, Horsfall, Bluebill, Waxmyrtle, Lagoon, and Carter Lake vary in access and facilities. Confirm current amenities and reservation status before choosing."],
    ["OHV camping and staging","Some campgrounds connect directly or nearly directly to riding access; others require trailering. Check quiet hours, overflow rules, trailer length, generator limits, and whether riding is permitted between your site and staging."],
    ["Reservations and backups","Summer weekends and event periods fill early. Reserve through the managing agency, save your confirmation offline, and keep a nearby developed-site or town-lodging backup."],
    ["What to pack","Add coastal layers and moisture control to the usual camping kit.",["Windproof shell, warm layer, and dry socks","Water, headlamps, battery bank, and paper map","Wheel chocks, leveling blocks, and trailer lock","First aid, fire extinguisher, and trash bags"]]
  ]},
  riding:{eyebrow:"OHV RIDING",title:"Find your line. Know your zone.",intro:"The Oregon Dunes are not one continuous open riding area. Learn the three zones, use current maps, carry the right permits, and give every crest more margin than you think it needs.",sections:[
    ["Florence: South Jetty to Siltcoos","The northern zone blends open sand, tree islands, narrow connectors, and several access points. It suits mixed-experience groups when riders stay oriented and regroup often."],
    ["Winchester Bay: Umpqua Dunes","Large, exposed dunes define the central zone. Wind changes ridge shape, visibility, and the location of sharp slip faces."],
    ["Coos Bay: Spinreel to Horsfall","The southern network combines open sand, forest edges, camp access, staging areas, and more route decisions."],
    ["Machine and rider checklist","Confirm every machine and operator before staging.",["Visible ATV permit and applicable safety card","Helmet and eye protection","Whip flag for sand use","Working lights for after-dark operation","Tow strap, tools, water, and communication device"]],
    ["Dune-reading fundamentals","Approach crests at an angle so you can scan the downwind side. Watch for razorbacks, witches' eyes, changing sand moisture, hidden traffic, and abrupt bowls."],
    ["Group protocol","Choose a lead and sweep, agree on signals, regroup at every major decision, and never let the fastest rider set the trip's safety margin."]
  ]},
  safety:{eyebrow:"SAFETY FIELDBOOK",title:"Confidence starts before the engine.",intro:"Most dune incidents are preventable. Slow the first hour down, learn how the sand is behaving, and make every group decision easy to understand.",sections:[
    ["Razorbacks and slip faces","The downwind side of a crest can drop steeply. Approach at an angle, slow enough to stop, scan for traffic, and avoid crossing straight over a sharp ridge."],
    ["Witches' eyes and transitions","Deep depressions can hide in slopes, while dry-to-wet sand transitions change grip quickly. Read shadow and texture, reduce speed, and warn riders behind you."],
    ["Recovery readiness","Carry a tow strap, tools, tire gauge, first aid, water, food, layers, light, and navigation. Cell service is not a recovery plan."],
    ["Children and new riders","Use appropriately sized machines, a low-consequence practice area, close adult supervision, and shorter loops."],
    ["If someone is missing","Stop the group, note the last known location and time, check the agreed regroup point, and avoid sending uncoordinated riders in multiple directions."],
    ["Non-riding safety","Hikers also face wind, exposure, soft-sand fatigue, and difficult orientation. Carry water, layers, and an offline map."]
  ]},
  permits:{eyebrow:"PERMITS & REGULATIONS",title:"The rules protect the ride.",intro:"Requirements depend on vehicle class, rider age, residency, and location. Use this planning summary, then verify current Oregon and Forest Service rules.",sections:[
    ["ATV operating permit","Oregon requires an ATV operating permit for machines used on public lands open to ATV use, including plated vehicles when they leave ordinary roads for trails or dunes."],
    ["Safety education","ATV Safety Education Card requirements vary by vehicle class and age. Youth operators may also need hands-on training and adult supervision."],
    ["Vehicle equipment","State guidance covers brakes, fuel systems, sound limits, flags on sand, lights after dark, and seasonal spark-arrestor or fire equipment."],
    ["Closures and designated use","Use current Motor Vehicle Use Maps and posted signs. Seasonal wildlife closures protect specific dry-sand areas and routes."],
    ["Primary sources","Check the Oregon Parks and Recreation ATV program and Siuslaw National Forest OHV pages immediately before travel."]
  ]},
  towns:{eyebrow:"NEARBY TOWNS",title:"Three gateways, three rhythms.",intro:"Florence, Winchester Bay, and Coos Bay/North Bend each shape a different kind of dunes trip.",sections:[
    ["Florence","The north gateway has broad visitor services, Old Town restaurants, fuel, groceries, lodging, rentals, and easy access to South Jetty, Honeyman, and Siltcoos."],
    ["Winchester Bay","A small harbor community near the Umpqua Dunes, with marina character, seafood, lodging, camping, and essential services."],
    ["Reedsport","Just inland from Winchester Bay, Reedsport adds groceries, fuel, dining, and access to the Umpqua Discovery Center."],
    ["Coos Bay and North Bend","The southern hub offers the broadest choice of repairs, medical services, large groceries, lodging, and restaurants."],
    ["Lakeside and Charleston","Lakeside suits freshwater recreation near the central-south dunes. Charleston adds working-harbor atmosphere and Cape Arago access."],
    ["Spend locally","Buy fuel, meals, repairs, guide services, and supplies in coastal communities while confirming legal details with public agencies."]
  ]},
  wildlife:{eyebrow:"WILDLIFE & HABITAT",title:"Notice more. Disturb less.",intro:"Beach, open sand, wetlands, freshwater lakes, shore-pine forest, and estuaries meet within a narrow coastal strip.",sections:[
    ["Western snowy plover","This small shorebird nests on open sand. Keep out of signed seasonal closures, control pets, and never approach nests or chicks."],
    ["Elk and larger mammals","Roosevelt elk may appear near forest edges and meadows. Watch from a distance, secure food, and never block an animal's route."],
    ["Bird-rich edges","Lakes, wetlands, beaches, and estuaries support waterfowl, shorebirds, raptors, and forest birds. Early mornings are quieter for observation."],
    ["Marine life nearby","Coastal viewpoints may offer distant looks at seals, sea lions, or migrating whales. Use established viewpoints."],
    ["Low-impact watching","Use binoculars, stay on permitted routes, pack out scraps, and give every animal an escape path. If behavior changes, you are too close."]
  ]},
  conditions:{eyebrow:"CURRENT CONDITIONS",title:"Check twice. Go ready.",intro:"Weather, fire restrictions, campground status, beach access, and habitat closures can change. Official agencies make the call.",sections:[
    ["Morning-of scan","Review Forest Service alerts, National Weather Service forecasts, Oregon road conditions, and campground notices.",["Wind and gusts","Fog, rain, and temperature","Fire restrictions","Road and staging status","Wildlife closures and beach rules"]],
    ["Marine weather","A warm inland forecast can hide a cool, windy coast. Carry a windproof layer and dry insulation even in midsummer."],
    ["Fire season","Restrictions vary by land manager and conditions. Equipment rules and access can tighten when vegetation is dry."],
    ["A graceful fallback","Keep a lakeside walk, lighthouse stop, harbor meal, forest trail, or town resupply in reserve."]
  ]},
  planner:{eyebrow:"TRIP PLANNER",title:"Build a weekend with breathing room.",intro:"Start with one region, one headline activity, and one weatherproof backup. The coast rarely rewards an overpacked schedule.",sections:[
    ["Choose your base","Pick Florence for variety, Winchester Bay for a focused central-dunes weekend, or Coos Bay/North Bend for services and southern access."],
    ["A rider's three-day plan","Day one: arrive, set camp, inspect machines, and confirm maps. Day two: ride early and save a shorter afternoon loop. Day three: choose a compact final ride and leave with daylight."],
    ["A mixed-group plan","Pair one riding day with lake time, a dune walk, lighthouse country, harbor food, or a town afternoon."],
    ["A quiet-coast plan","Base near Florence or Lakeside, explore freshwater lakes and forest trails, and schedule wildlife watching for calm mornings."],
    ["Departure checklist","Download official maps, confirm permits and reservations, save contacts, check closures, inspect trailer lights and tires, and share the plan."]
  ]}
};

const mapPlaces=[
  {id:"florence",name:"Florence",region:"Florence",type:"town",top:7,left:42,summary:"The north gateway for groceries, fuel, rentals, lodging, dunes, and lakes.",access:"US 101 · north zone",best:"First visits and mixed groups",url:"https://www.google.com/maps/search/?api=1&query=Florence%2C%20Oregon"},
  {id:"south-jetty",name:"South Jetty",region:"Florence",type:"staging",top:14,left:27,summary:"A principal Florence-area day-use access point for the northern riding zone.",access:"South Jetty Road",best:"Day rides",url:"https://www.google.com/maps/search/?api=1&query=South%20Jetty%20OHV%20Staging%20Area%20Oregon"},
  {id:"honeyman",name:"Honeyman State Park",region:"Florence",type:"campground",top:21,left:64,summary:"A large developed campground between freshwater lakes and dunes.",access:"US 101 south of Florence",best:"Families and lake time",url:"https://www.google.com/maps/search/?api=1&query=Jessie%20M.%20Honeyman%20Memorial%20State%20Park"},
  {id:"siltcoos",name:"Siltcoos",region:"Florence",type:"riding",top:28,left:34,summary:"A varied northern riding area with open sand, forest edges, and designated routes.",access:"Siltcoos access roads",best:"Varied terrain",url:"https://www.google.com/maps/search/?api=1&query=Siltcoos%20OHV%20Oregon"},
  {id:"eel-creek",name:"Eel Creek",region:"Winchester Bay",type:"campground",top:40,left:64,summary:"Forested Forest Service camping with a trail toward the open dunes.",access:"Near Lakeside",best:"Quieter dune access",url:"https://www.google.com/maps/search/?api=1&query=Eel%20Creek%20Campground%20Oregon"},
  {id:"umpqua",name:"Umpqua Dunes",region:"Winchester Bay",type:"riding",top:49,left:29,summary:"The dramatic central zone, known for large open dunes.",access:"Winchester Bay approaches",best:"Experienced riders",url:"https://www.google.com/maps/search/?api=1&query=Umpqua%20Dunes%20Oregon"},
  {id:"winchester",name:"Winchester Bay",region:"Winchester Bay",type:"town",top:56,left:58,summary:"A compact harbor base close to the central dunes.",access:"US 101 · central gateway",best:"Riding weekends",url:"https://www.google.com/maps/search/?api=1&query=Winchester%20Bay%2C%20Oregon"},
  {id:"spinreel",name:"Spinreel",region:"Coos Bay",type:"campground",top:68,left:31,summary:"OHV-oriented camping and staging near the southern riding network.",access:"Spinreel Road",best:"Ride-from-camp trips",url:"https://www.google.com/maps/search/?api=1&query=Spinreel%20Campground%20Oregon"},
  {id:"horsfall",name:"Horsfall",region:"Coos Bay",type:"staging",top:77,left:64,summary:"Major access near North Bend with camping, day use, and routes into the dunes.",access:"Horsfall Beach Road",best:"Groups and meetups",url:"https://www.google.com/maps/search/?api=1&query=Horsfall%20OHV%20Staging%20Area"},
  {id:"coos",name:"Coos Bay / North Bend",region:"Coos Bay",type:"town",top:87,left:40,summary:"The south coast's broadest service base for supplies, repairs, food, and lodging.",access:"US 101 · south gateway",best:"Longer stays",url:"https://www.google.com/maps/search/?api=1&query=Coos%20Bay%2C%20Oregon"},
  {id:"riley",name:"Riley Ranch",region:"Coos Bay",type:"campground",top:94,left:67,summary:"County campground and OHV staging base south of Horsfall.",access:"South of Coos Bay",best:"Groups and trailers",url:"https://www.google.com/maps/search/?api=1&query=Riley%20Ranch%20County%20Park%20Oregon"}
];

function renderMap(){
  const canvas=document.getElementById("mapCanvas");
  const detail=document.getElementById("mapDetail");
  if(!canvas||!detail)return;

  const filters=[...document.querySelectorAll("[data-filter]")];
  const typeLabels={town:"Gateway town",staging:"OHV staging",campground:"Campground",riding:"Riding zone"};
  let selectedId=mapPlaces[0].id;
  let activeFilter="all";

  function showPlace(place){
    selectedId=place.id;
    canvas.querySelectorAll(".marker").forEach(marker=>{
      const selected=marker.dataset.placeId===place.id;
      marker.classList.toggle("active",selected);
      marker.setAttribute("aria-pressed",String(selected));
    });
    detail.innerHTML=`<span class="place-type">${typeLabels[place.type]||place.type}</span>
      <span class="region-name">${place.region} region</span>
      <h2>${place.name}</h2>
      <p>${place.summary}</p>
      <dl><div><dt>Access</dt><dd>${place.access}</dd></div><div><dt>Best for</dt><dd>${place.best}</dd></div></dl>
      <a class="button ink" href="${place.url}" target="_blank" rel="noreferrer">Open directions ↗</a>`;
  }

  function drawMarkers(){
    canvas.querySelectorAll(".marker").forEach(marker=>marker.remove());
    const visible=activeFilter==="all"?mapPlaces:mapPlaces.filter(place=>place.type===activeFilter);
    visible.forEach(place=>{
      const marker=document.createElement("button");
      marker.type="button";
      marker.className=`marker marker-${place.type}`;
      marker.dataset.placeId=place.id;
      marker.style.top=`${place.top}%`;
      marker.style.left=`${place.left}%`;
      marker.setAttribute("aria-label",`${place.name}, ${typeLabels[place.type]||place.type}`);
      marker.setAttribute("aria-pressed","false");
      marker.innerHTML=`<i aria-hidden="true"></i><span>${place.name}</span>`;
      marker.addEventListener("click",()=>showPlace(place));
      canvas.appendChild(marker);
    });
    const selected=visible.find(place=>place.id===selectedId)||visible[0];
    if(selected)showPlace(selected);
    else detail.innerHTML="<p>No locations match this filter.</p>";
  }

  filters.forEach(button=>button.addEventListener("click",()=>{
    activeFilter=button.dataset.filter||"all";
    filters.forEach(item=>{
      const active=item===button;
      item.classList.toggle("active",active);
      item.setAttribute("aria-pressed",String(active));
    });
    drawMarkers();
  }));
  filters.forEach(button=>button.setAttribute("aria-pressed",String(button.classList.contains("active"))));
  drawMarkers();
}

function setupMenu(){const header=document.querySelector(".site-header"),button=document.querySelector(".menu-button");if(!button)return;button.addEventListener("click",()=>{const open=header.classList.toggle("open");button.setAttribute("aria-expanded",String(open));button.textContent=open?"Close":"Menu"})}
function currentShareDetails(){
  const title=document.title||"Oregon Dunes Field Guide";
  const description=document.querySelector('meta[name="description"]')?.content||"Plan an Oregon Dunes adventure.";
  return{title,text:description,url:window.location.href};
}
async function copyCurrentLink(button){
  const {url}=currentShareDetails();
  try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(url);
    else{
      const helper=document.createElement("textarea");
      helper.value=url;helper.setAttribute("readonly","");helper.style.position="fixed";helper.style.opacity="0";
      document.body.appendChild(helper);helper.select();
      if(!document.execCommand("copy"))throw new Error("copy failed");
      helper.remove();
    }
    const original=button.textContent;button.textContent="Link copied ✓";button.classList.add("confirmed");
    setTimeout(()=>{button.textContent=original;button.classList.remove("confirmed")},1800);
    return true;
  }catch{
    window.prompt("Copy this page link:",url);
    return false;
  }
}
function setupShareControls(){
  const header=document.querySelector(".site-header");if(!header||header.querySelector(".share-controls"))return;
  const controls=document.createElement("div");controls.className="share-controls";controls.setAttribute("aria-label","Page sharing");
  const share=document.createElement("button");share.type="button";share.className="share-button";share.textContent="Share";
  const copy=document.createElement("button");copy.type="button";copy.className="copy-link-button";copy.textContent="Copy link";
  share.addEventListener("click",async()=>{const details=currentShareDetails();if(navigator.share){try{await navigator.share(details);return}catch(error){if(error?.name==="AbortError")return}}await copyCurrentLink(share)});
  copy.addEventListener("click",()=>copyCurrentLink(copy));
  controls.append(share,copy);
  const menu=header.querySelector(".menu-button");header.insertBefore(controls,menu);
}
function renderGuide(){const root=document.getElementById("guideRoot");if(!root)return;const key=new URLSearchParams(location.search).get("topic")||"camping";const page=chapters[key]||chapters.camping;document.title=`${page.eyebrow} · Oregon Dunes Field Guide`;root.innerHTML=`<section class="guide-hero"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.intro}</p></div></section><div class="guide-layout shell"><aside class="guide-toc"><p>IN THIS GUIDE</p>${page.sections.map((s,i)=>`<a href="#section-${i}"><span>0${i+1}</span>${s[0]}</a>`).join("")}</aside><div class="guide-content">${page.sections.map((s,i)=>`<section id="section-${i}"><span>0${i+1}</span><h2>${s[0]}</h2><p>${s[1]}</p>${s[2]?`<ul>${s[2].map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</section>`).join("")}</div></div><section class="chapter-nav"><div class="shell"><div><small>KEEP PLANNING</small><h2>Ready for the next detail?</h2></div><a class="button ink" href="${key==="conditions"?"maps.html":"planner.html"}">${key==="conditions"?"Open the map":"Build a personal plan"} ↗</a></div></section>`}
function getChecked(form,name){return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value)}
function formatDate(value){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(new Date(`${value}T12:00:00`))}
function chooseRegion(data){
  if(data.region!=="auto")return data.region;
  const hasMachines=data.toys.some(x=>x!=="none")||(data.rentalType&&data.rentalType!=="none");
  if(!hasMachines||data.experience==="first"||data.interests.includes("lakes"))return"florence";
  if(data.experience==="experienced"&&data.tripType!=="day")return"winchester";
  return"coos";
}
function regionProfile(key){
  return{
    florence:{name:"Florence & Siltcoos",base:"Florence",latitude:43.9826,longitude:-124.0998,headline:"A flexible north-dunes base",summary:"A balanced choice for first-time dune visitors, mixed-interest crews, freshwater lakes, South Jetty staging, and the varied Siltcoos area.",ride:"South Jetty and Siltcoos",camp:"Honeyman or a nearby Forest Service campground",backup:"Old Town Florence, a lake walk, or a sheltered forest outing",parking:[
      {name:"Official Old Town parking map",note:"Shows public areas, 3-hour zones, day-use areas, and 7-foot vehicle-height restrictions. RVs and trailers are not allowed in restricted Old Town zones.",url:"https://www.ci.florence.or.us/918/4740/Old-Town-Parking"},
      {name:"Navigate to Old Town parking",note:"Open directions near Bay Street, then follow posted signs because limits vary by block and lot.",url:"https://www.google.com/maps/search/?api=1&query=public+parking+Old+Town+Florence+Oregon"}
    ],stays:{
      rv:[
        {name:"Jessie M. Honeyman State Park",note:"Large state-park campground south of Florence with RV sites, dunes access nearby, and easy access to town services.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95"},
        {name:"Port of Siuslaw Campground & Marina",note:"Riverfront RV camping within walking distance of Historic Old Town Florence restaurants and shops.",url:"https://www.google.com/maps/search/?api=1&query=Port+of+Siuslaw+Campground+and+Marina+Florence+Oregon"},
        {name:"Florence RV and campground directory",note:"Compare additional private parks and public campgrounds around Florence, Siltcoos, and the dunes.",url:"https://florencechamber.com/lodging/"}
      ],
      lodging:[
        {name:"Driftwood Shores Resort",note:"Oceanfront rooms north of Florence with beach access, kitchens in many rooms, and an indoor pool.",url:"https://www.google.com/maps/search/?api=1&query=Driftwood+Shores+Resort+Florence+Oregon"},
        {name:"River House Inn",note:"A riverfront Old Town base within walking distance of Bay Street shopping and dining.",url:"https://www.google.com/maps/search/?api=1&query=River+House+Inn+Florence+Oregon"},
        {name:"Best Western Pier Point Inn",note:"A scenic river-view hotel with breakfast and quick Highway 101 access south of Old Town.",url:"https://www.google.com/maps/search/?api=1&query=Best+Western+Pier+Point+Inn+Florence+Oregon"}
      ],
      camping:[
        {name:"Jessie M. Honeyman State Park",note:"A full-service state-park base near Florence with tent sites and easy access to lakes and dunes.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95"},
        {name:"Siltcoos-area Forest Service camping",note:"Compare developed campgrounds around Siltcoos Lake and the central Oregon Dunes corridor.",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/camping-cabins"}
      ]
    },localStops:{
      shopping:[
        {name:"Historic Old Town Florence",note:"Walk Bay Street for coastal gifts, locally made art, galleries, books, and waterfront views.",url:"https://florencechamber.com/historic-old-town/"},
        {name:"Florence shopping guide",note:"Find antiques, jewelry, outdoor goods, toys, kites, and more locally owned shops around town.",url:"https://florencechamber.com/things-to-do/shopping/"}
      ],
      lunch:[
        {name:"Mari’s Kitchen",note:"A relaxed Bay Street stop for homestyle food in the middle of an Old Town stroll.",url:"https://www.google.com/maps/search/?api=1&query=Mari%27s+Kitchen+Florence+Oregon"},
        {name:"Fresh Harvest Café",note:"A casual Highway 101 café with hearty plates and a good fit for mixed-age groups.",url:"https://www.google.com/maps/search/?api=1&query=Fresh+Harvest+Cafe+Florence+Oregon"}
      ],
      dinner:[
        {name:"The Waterfront Depot",note:"Reserve ahead for seafood, local beef, and a special-occasion dinner in a restored train station.",url:"https://visittheoregoncoast.com/cities/florence/dine/the-waterfront-depot/"},
        {name:"Old Town waterfront dining",note:"Keep the evening flexible and compare current Bay Street menus while you explore the riverfront.",url:"https://florencechamber.com/food-drink/"}
      ],
      breakfast:[
        {name:"Little Brown Hen Café",note:"An all-day-breakfast favorite known for scrambles, pancakes, and classic comfort food.",url:"https://www.google.com/maps/search/?api=1&query=Little+Brown+Hen+Cafe+Florence+Oregon"},
        {name:"Fresh Harvest Café",note:"Start the next morning with a full breakfast, including its well-known marionberry French toast.",url:"https://www.google.com/maps/search/?api=1&query=Fresh+Harvest+Cafe+Florence+Oregon"}
      ]
    }},
    winchester:{name:"Winchester Bay & Umpqua Dunes",base:"Winchester Bay",latitude:43.6765,longitude:-124.1751,headline:"Big sand with a compact harbor base",summary:"Best for a riding-centered trip with experienced dune travelers, large open terrain, harbor services, and lighthouse-country backups.",ride:"Umpqua Dunes",camp:"Winchester Bay area camping or Eel Creek",backup:"Umpqua Lighthouse, the harbor, or Reedsport",parking:[
      {name:"Downtown Reedsport public lot",note:"Ten public spaces at Greenwood Avenue and North Fourth Street; posted two-hour limit from 7 a.m. to 7 p.m.",url:"https://www.google.com/maps/dir/?api=1&destination=Greenwood+Avenue+and+North+Fourth+Street+Reedsport+Oregon"},
      {name:"Rainbow Plaza riverfront lot",note:"Passenger and boat-trailer spaces near Riverfront Way, public restrooms, picnic tables, and the Umpqua riverfront. Check kiosk signs for launch-related fees.",url:"https://www.cityofreedsport.org/community/page/rainbow-plaza-boat-launch"}
    ],stays:{
      rv:[
        {name:"Winchester Bay RV Resort",note:"Waterfront full-hookup RV sites at Salmon Harbor with a compact harbor-town base.",url:"https://www.google.com/maps/search/?api=1&query=Winchester+Bay+RV+Resort+Oregon"},
        {name:"Half Moon Bay Campground",note:"A Douglas County campground near the harbor, Umpqua Dunes, and lighthouse area.",url:"https://www.google.com/maps/search/?api=1&query=Half+Moon+Bay+Campground+Winchester+Bay+Oregon"},
        {name:"Salmon Harbor RV Park",note:"A Highway 101 RV option close to Winchester Bay services and dune access routes.",url:"https://www.google.com/maps/search/?api=1&query=Salmon+Harbor+RV+Park+Winchester+Bay+Oregon"}
      ],
      lodging:[
        {name:"Winchester Bay Inn",note:"A small harbor-community hotel close to bayfront restaurants and Umpqua Dunes access.",url:"https://www.google.com/maps/search/?api=1&query=Winchester+Bay+Inn+Oregon"},
        {name:"Best Western Salbasgeon Inn",note:"A Reedsport hotel with Highway 101 access, useful for groups wanting more town services.",url:"https://www.google.com/maps/search/?api=1&query=Best+Western+Salbasgeon+Inn+Reedsport+Oregon"},
        {name:"Umpqua River Inn & Suites",note:"A Reedsport lodging option convenient to groceries, dining, and the Winchester Bay drive.",url:"https://www.google.com/maps/search/?api=1&query=Umpqua+River+Inn+and+Suites+Reedsport+Oregon"}
      ],
      camping:[
        {name:"Half Moon Bay Campground",note:"Harbor-side camping near Winchester Bay, the lighthouse, and Umpqua Dunes.",url:"https://www.google.com/maps/search/?api=1&query=Half+Moon+Bay+Campground+Winchester+Bay+Oregon"},
        {name:"Umpqua Lighthouse State Park",note:"A state-park campground near Lake Marie and the Umpqua River Lighthouse.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=83"}
      ]
    },localStops:{
      shopping:[
        {name:"Old Towne Reedsport & Fir Avenue",note:"Browse local art, Oregon gifts, home finds, and small shops in Reedsport’s compact downtown.",url:"https://reedsportcc.org/member-directory/"},
        {name:"Myrtlewood Gallery",note:"A classic Highway 101 stop for Oregon myrtlewood gifts, art, and locally crafted keepsakes.",url:"https://www.google.com/maps/search/?api=1&query=Myrtlewood+Gallery+Reedsport+Oregon"}
      ],
      lunch:[
        {name:"Bedrock’s On the Bay",note:"Waterfront lunch in Winchester Bay, convenient after a harbor walk or morning dune session.",url:"https://www.google.com/maps/search/?api=1&query=Bedrock%27s+On+the+Bay+Winchester+Bay+Oregon"},
        {name:"Blue Box Seafood Company",note:"A casual Winchester Bay seafood stop highlighted by Oregon Coast visitor guides.",url:"https://www.google.com/maps/search/?api=1&query=Blue+Box+Seafood+Company+Winchester+Bay+Oregon"}
      ],
      dinner:[
        {name:"Griff’s On the Bay",note:"A longtime bayfront choice for seafood and a relaxed coastal dinner.",url:"https://www.google.com/maps/search/?api=1&query=Griff%27s+On+the+Bay+Winchester+Bay+Oregon"},
        {name:"Big Fish Café & Dinner House",note:"A Reedsport dinner alternative when you want to combine the meal with an evening in town.",url:"https://www.google.com/maps/search/?api=1&query=Big+Fish+Cafe+Reedsport+Oregon"}
      ],
      breakfast:[
        {name:"Sugar Shack Bakery",note:"Pick up pastries and an easy next-morning breakfast before heading back toward the dunes.",url:"https://www.google.com/maps/search/?api=1&query=Sugar+Shack+Bakery+Reedsport+Oregon"},
        {name:"Harbor Light Family Restaurant",note:"A sit-down Reedsport breakfast option with a traditional family-restaurant feel.",url:"https://www.google.com/maps/search/?api=1&query=Harbor+Light+Family+Restaurant+Reedsport+Oregon"}
      ]
    }},
    coos:{name:"Coos Bay & Horsfall",base:"Coos Bay / North Bend",latitude:43.3665,longitude:-124.2179,headline:"Southern access with the fullest services",summary:"A strong match for groups, trailers, multiple machines, ride-from-camp options, and easy access to repairs, groceries, and town lodging.",ride:"Spinreel to Horsfall",camp:"Spinreel, Horsfall, Bluebill, or Riley Ranch",backup:"Coos Bay, North Bend, Charleston, or a Cape Arago day",parking:[
      {name:"Third Street & Central Avenue lot",note:"A completed public downtown lot close to shops, restaurants, and seasonal community events.",url:"https://www.google.com/maps/dir/?api=1&destination=South+3rd+Street+and+Central+Avenue+Coos+Bay+Oregon"},
      {name:"Visitor Center & Boardwalk parking",note:"Public parking beside the Visitor Information Center at 50 Central Avenue, across from the Boardwalk and City Docks.",url:"https://www.coosbayor.gov/Home/Components/FacilityDirectory/FacilityDirectory/14/35"}
    ],stays:{
      rv:[
        {name:"Oregon Dunes KOA Holiday",note:"Full-hookup RV sites with direct access toward the dunes and family-oriented campground amenities.",url:"https://www.google.com/maps/search/?api=1&query=Oregon+Dunes+KOA+Holiday+North+Bend+Oregon"},
        {name:"Riley Ranch County Park",note:"RV and camping options with direct OHV access near the southern dunes and Butterfield Lake.",url:"https://www.google.com/maps/search/?api=1&query=Riley+Ranch+County+Park+North+Bend+Oregon"},
        {name:"Ko-Kwel Casino Resort RV Park",note:"Full-hookup waterfront RV sites near North Bend dining, entertainment, and town services.",url:"https://www.google.com/maps/search/?api=1&query=Ko-Kwel+Casino+Resort+RV+Park+North+Bend+Oregon"}
      ],
      lodging:[
        {name:"Ko-Kwel Casino Resort Coos Bay",note:"A waterfront North Bend hotel with dining, entertainment, pool, and hot tub amenities.",url:"https://www.google.com/maps/search/?api=1&query=Ko-Kwel+Casino+Resort+Coos+Bay+North+Bend+Oregon"},
        {name:"Best Western Holiday Hotel",note:"A Coos Bay hotel across from the bay and within walking distance of downtown shopping and dining.",url:"https://www.google.com/maps/search/?api=1&query=Best+Western+Holiday+Hotel+Coos+Bay+Oregon"},
        {name:"Edgewater Inn",note:"Rooms and suites on the bay with an observation deck and quick access to Coos Bay services.",url:"https://www.google.com/maps/search/?api=1&query=Edgewater+Inn+Coos+Bay+Oregon"}
      ],
      camping:[
        {name:"Spinreel Campground",note:"A Forest Service campground with direct access to the southern Oregon Dunes riding area.",url:"https://www.google.com/maps/search/?api=1&query=Spinreel+Campground+North+Bend+Oregon"},
        {name:"Riley Ranch County Park",note:"Campsites, cabins, showers, lake access, and a direct connection to OHV terrain.",url:"https://www.google.com/maps/search/?api=1&query=Riley+Ranch+County+Park+North+Bend+Oregon"}
      ]
    },localStops:{
      shopping:[
        {name:"Cranberry Sweets",note:"Sample locally made fruit candies and chocolates, then browse Oregon Coast gifts in the showroom.",url:"https://visittheoregoncoast.com/cities/coos-bay/activities/cranberry-sweets/"},
        {name:"Historic Marshfield District",note:"Explore downtown Coos Bay shops, galleries, antiques, and local home-and-gift stores.",url:"https://visittheoregoncoast.com/cities/coos-bay"}
      ],
      lunch:[
        {name:"7 Devils Waterfront Alehouse",note:"Local seafood, salads, burgers, and house beer beside the Coos Bay waterfront.",url:"https://visittheoregoncoast.com/cities/coos-bay/dine/7-devils-waterfront-alehouse/"},
        {name:"Front Street Food Trucks",note:"A flexible lunch stop when everyone wants a different quick bite near the waterfront.",url:"https://www.google.com/maps/search/?api=1&query=Front+Street+Food+Trucks+Coos+Bay+Oregon"}
      ],
      dinner:[
        {name:"7 Devils Waterfront Alehouse",note:"A lively locally focused dinner with water views; check the current schedule before visiting.",url:"https://visittheoregoncoast.com/cities/coos-bay/dine/7-devils-waterfront-alehouse/"},
        {name:"SharkBites Café",note:"A casual downtown Coos Bay alternative for seafood and coastal comfort food.",url:"https://www.google.com/maps/search/?api=1&query=SharkBites+Cafe+Coos+Bay+Oregon"}
      ],
      breakfast:[
        {name:"D Street Café",note:"A North Bend breakfast with biscuits, omelets, chilaquiles, and other hearty plates.",url:"https://visittheoregoncoast.com/cities/d-street-cafe/"},
        {name:"Friends Café & Deli",note:"A convenient North Bend choice for breakfast and coffee before the next day’s outing.",url:"https://visittheoregoncoast.com/cities/friends-cafe-deli/"}
      ]
    }}
  }[key]
}
function collectTrip(form){
  const fd=new FormData(form);
  return{arrival:fd.get("arrival"),departure:fd.get("departure"),region:fd.get("region"),vehicle:fd.get("vehicle"),tripType:fd.get("tripType"),rentalType:fd.get("rentalType")||"none",experience:fd.get("experience"),partySize:Number(fd.get("partySize")||1),toys:getChecked(form,"toys"),crew:getChecked(form,"crew"),interests:getChecked(form,"interests")}
}
function buildTrip(data){
  const start=new Date(`${data.arrival}T12:00:00`),end=new Date(`${data.departure}T12:00:00`);
  const days=Math.round((end-start)/86400000)+1,regionKey=chooseRegion(data),region=regionProfile(regionKey);
  const needsRental=data.rentalType&&data.rentalType!=="none";
  const hasMachines=data.toys.some(x=>x!=="none")||needsRental,isDay=data.tripType==="day";
  const itinerary=[];
  itinerary.push(["Arrive with daylight",isDay?`Start early in ${region.base}, confirm current access, and stage at ${region.ride}.`:`Settle into ${region.camp}. Confirm weather, closures, maps, and the next morning's access before reliable service fades.`]);
  if(days>1)itinerary.push([hasMachines?"Primary riding day":"Dunes and lake day",hasMachines?`Begin early in ${region.ride}. Use a conservative first loop to read the sand, regroup often, and finish with daylight in reserve.`:`Explore a permitted dune trail in the morning, then add a freshwater lake or forest-edge walk after lunch.`]);
  if(days>2)itinerary.push(["Coast and community day",data.interests.includes("towns")?`Use the weather window for ${data.interests.includes("wildlife")?"quiet wildlife watching":"a shorter dune outing"}, then browse ${region.localStops.shopping[0].name}, stop for lunch, and finish with a local dinner. Breakfast choices for the next morning are included below.`:`Use the weather window for ${data.interests.includes("wildlife")?"quiet wildlife watching":"a shorter dune outing"}, then make room for ${region.backup}.`]);
  for(let i=3;i<Math.min(days,7);i++)itinerary.push([i%2?`Flexible adventure day`:`Slow coast day`,i%2?`Choose a second zone only if the group is rested and current conditions support the drive. Otherwise deepen the ${region.name} plan.`:`Rest machines and riders. Explore a town, lake, lighthouse, or forest trail and recheck tomorrow's conditions.`]);
  if(days>1)itinerary.push(["Leave light",`Choose a compact final activity, clean and secure equipment, pack every item, and allow extra time for US 101 and trailer traffic.`]);
  const alerts=[
    ["Check current closures","Review Siuslaw National Forest notices, seasonal wildlife closures, fire restrictions, and campground status on departure morning."],
    [data.vehicle==="rv"?"Trailer access matters":data.vehicle==="2wd"?"Keep access conservative":"Use 4WD as margin, not permission",data.vehicle==="rv"?`Confirm site length, turning room, staging connection, and fuel stops before entering ${region.camp}.`:data.vehicle==="2wd"?"Use developed roads and parking. Do not enter soft sand or informal pullouts based on appearance alone.":"Air pressure and recovery gear matter, but designated access and posted rules still control where you drive."],
  ];
  if(data.crew.includes("youth"))alerts.push(["Youth rider plan","Confirm Oregon safety-card, hands-on training, supervision, rider-fit, restraint, and helmet requirements for every youth operator."]);
  if(data.crew.includes("dog"))alerts.push(["Dog and habitat plan","Check campground and beach rules, carry a leash, protect paws from hot sand, and keep pets far from signed snowy plover habitat."]);
  if(data.crew.includes("campfire"))alerts.push(["Fire plan","Confirm same-day fire restrictions with the managing agency. Carry an extinguisher and never assume a fire is allowed because a ring is present."]);
  if(data.experience==="first"&&hasMachines)alerts.push(["First-hour rule","Use a low-consequence practice area, shorten the first loop, and learn current ridge and slip-face conditions before adding speed."]);
  if(needsRental){
    const rentalName={quad:"ATV / quad",sxs:"side-by-side / UTV",bike:"dirt bike",unsure:"rental machine"}[data.rentalType]||"rental machine";
    alerts.push(["Reserve your rental early",`Ask the rental company about ${rentalName} availability, operator age and license rules, deposits, insurance, safety gear, training, delivery or staging location, fuel, and cancellation terms. Confirm exactly where the machine may be ridden.`]);
  }
  if(data.interests.includes("towns")){
    alerts.push(["Public parking near your town stops",`<span class="parking-links">${region.parking.map(item=>`<a href="${item.url}" target="_blank" rel="noreferrer"><b>${item.name}</b><small>${item.note}</small></a>`).join("")}</span>`]);
    alerts.push(["Weather, rain attire & roads",`<span id="plannerWeatherAlert" class="weather-outlook" aria-live="polite">Checking the forecast for ${region.base} and your trip dates…</span>`]);
  }
  const checklist=["Offline official maps and saved reservations","Coastal wind layer, warm layer, and dry footwear","Water, food, first-aid kit, headlamps, and battery bank","Emergency contacts and plan shared with someone at home","Trash bags and a bin for sandy gear"];
  if(hasMachines)checklist.push("ATV permits for every machine","Required safety cards for operators","Whip flags, helmets, eye protection, and gloves","Tow strap, tools, tire gauge, and recovery plan","Working brakes, lights, exhaust, and secure fuel","Fire-season spark arrestor and equipment as required");
  if(data.vehicle==="rv")checklist.push("Trailer tires, bearings, lights, chocks, leveling blocks, and hitch lock");
  if(data.crew.includes("youth"))checklist.push("Youth training records, supervision plan, and correctly sized machine");
  if(data.crew.includes("dog"))checklist.push("Leash, water bowl, waste bags, towel, and pet-safe backup activity");
  if(data.interests.includes("wildlife"))checklist.push("Binoculars and long lens for distance-respecting wildlife viewing");
  if(needsRental)checklist.push("Rental confirmation, operator documents, deposit method, pickup time, included safety gear, and after-hours contact");
  return{...data,days,regionKey,region,itinerary,alerts,checklist,hasMachines}
}
function plannerDate(value){return new Date(`${value}T12:00:00`)}
function forecastDayLabel(value){return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric"}).format(plannerDate(value))}
function weatherCodeLabel(code){
  if(code===0)return"clear";
  if([1,2,3].includes(code))return"partly cloudy";
  if([45,48].includes(code))return"fog possible";
  if(code>=51&&code<=67)return"rain or drizzle";
  if(code>=71&&code<=77)return"snow possible";
  if(code>=80&&code<=82)return"rain showers";
  if(code>=85&&code<=86)return"snow showers";
  if(code>=95)return"thunderstorms possible";
  return"variable coastal weather"
}
async function loadPlannerWeather(plan){
  const target=document.getElementById("plannerWeatherAlert");if(!target||!plan.interests.includes("towns"))return;
  const today=new Date();today.setHours(12,0,0,0);
  const arrival=plannerDate(plan.arrival),departure=plannerDate(plan.departure);
  const latest=new Date(today);latest.setDate(latest.getDate()+15);
  const tripCheck=`<a href="https://www.tripcheck.com/" target="_blank" rel="noreferrer">Check live Oregon road conditions on TripCheck ↗</a>`;
  if(departure<today){target.innerHTML=`These dates have passed, so a live trip forecast is unavailable. Update the planner dates to receive rain-attire and road-weather guidance. ${tripCheck}`;return}
  if(arrival>latest){const daysUntil=Math.ceil((arrival-today)/86400000);target.innerHTML=`Your trip begins in ${daysUntil} days. Detailed forecasts are available about 16 days ahead; rebuild this plan closer to departure for rain attire and a weather-based road outlook. ${tripCheck}`;return}
  const forecastEnd=departure>latest?latest:departure;
  const url=new URL("https://api.open-meteo.com/v1/forecast");
  url.search=new URLSearchParams({latitude:String(plan.region.latitude),longitude:String(plan.region.longitude),daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_gusts_10m_max",temperature_unit:"fahrenheit",wind_speed_unit:"mph",precipitation_unit:"inch",timezone:"America/Los_Angeles",start_date:plan.arrival,end_date:forecastEnd.toISOString().slice(0,10)}).toString();
  try{
    const response=await fetch(url);if(!response.ok)throw new Error("Forecast unavailable");
    const forecast=await response.json(),daily=forecast.daily;
    const rainChance=Math.max(...daily.precipitation_probability_max.map(value=>Number(value)||0));
    const rainTotal=daily.precipitation_sum.reduce((sum,value)=>sum+(Number(value)||0),0);
    const low=Math.round(Math.min(...daily.temperature_2m_min)),high=Math.round(Math.max(...daily.temperature_2m_max));
    const gust=Math.round(Math.max(...daily.wind_gusts_10m_max.map(value=>Number(value)||0)));
    const condition=weatherCodeLabel(Math.max(...daily.weather_code.map(value=>Number(value)||0)));
    const attire=rainChance>=60||rainTotal>=.1?"Pack a waterproof shell with a hood, water-resistant shoes, and a dry layer for after shopping.":rainChance>=30?"Bring a light rain shell and shoes that handle wet sidewalks; keep a dry layer in the vehicle.":"A wind-resistant coastal layer should be enough, but keep a compact rain shell handy.";
    const roadNotes=[];
    if(rainChance>=60||rainTotal>=.1)roadNotes.push("wet pavement, spray, reduced visibility, and localized standing water are possible");
    else if(rainChance>=30)roadNotes.push("brief slick pavement is possible during showers");
    else roadNotes.push("no strong rain signal is showing yet");
    if(gust>=35)roadNotes.push(`gusts near ${gust} mph could affect high-profile vehicles and exposed bridges`);
    const shownThrough=forecastEnd<departure?` Forecast shown through ${forecastDayLabel(forecastEnd.toISOString().slice(0,10))}; later trip days are not in range yet.`:"";
    target.innerHTML=`<b>${forecastDayLabel(plan.arrival)}–${forecastDayLabel(forecastEnd.toISOString().slice(0,10))}:</b> ${condition}, ${low}–${high}°F, up to ${rainChance}% rain chance, about ${rainTotal.toFixed(2)} in. total precipitation, and gusts up to ${gust} mph. <b>What to wear:</b> ${attire} <b>Possible road effects:</b> ${roadNotes.join("; ")}.${shownThrough} ${tripCheck}<small>Forecast data: Open-Meteo. Weather-based road outlook is not a live closure report.</small>`
  }catch{
    target.innerHTML=`The live forecast could not load right now. Pack a waterproof layer and check again before leaving. ${tripCheck}`
  }
}
function renderLocalStopGroup(label,items,groupKey,selected=[]){
  return`<article class="local-stop-group"><p>${label}</p><div>${items.map((item,index)=>{const key=`${groupKey}:${index}`;return`<article class="local-stop-card"><a class="local-stop-details" href="${item.url}" target="_blank" rel="noreferrer"><b>${item.name}</b><span>${item.note}</span><i>View details ↗</i></a><label class="plan-stop-toggle"><input class="plan-stop-checkbox" type="checkbox" value="${key}" data-plan-name="${item.name}" data-plan-category="${label}" ${selected.includes(key)?"checked":""}><span>Plan this</span></label></article>`}).join("")}</div></article>`
}
function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))
}
function renderStaySection(plan){
  if(plan.tripType==="day")return`<section class="plan-section stay-guide"><p class="section-label">01 · WHERE YOU’LL STAY</p><h2>No overnight stay selected</h2><p class="stay-guide-intro">This plan is set as a day trip. If the group decides to stay overnight, change “How will you use the dunes?” to Camping overnight or Town lodging and rebuild the plan.</p></section>`;
  const stayType=plan.tripType==="offsite"?"lodging":plan.vehicle==="rv"?"rv":"camping";
  const heading=stayType==="lodging"?`Town lodging near ${plan.region.base}`:stayType==="rv"?`RV options near ${plan.region.base}`:`Campgrounds near ${plan.region.base}`;
  const intro=stayType==="lodging"?"Compare hotels and inns convenient to town services, dining, and the dunes.":stayType==="rv"?"Compare RV parks and RV-friendly campgrounds, then verify rig length, hookups, vehicle limits, and access before reserving.":"Compare developed campgrounds, then verify current openings, reservation rules, and site details.";
  const options=plan.region.stays[stayType],selected=plan.plannedStops||[];
  const selectedStayKey=selected.find(key=>key.startsWith("stay:"))||"";
  const selectedStayIndex=Number(selectedStayKey.split(":")[2]);
  const selectedStayName=Number.isInteger(selectedStayIndex)&&options[selectedStayIndex]?options[selectedStayIndex].name:"";
  return`<section class="plan-section stay-guide"><p class="section-label">01 · WHERE YOU’LL STAY</p><h2>${heading}</h2><p class="stay-guide-intro">${intro} Choose one “Plan this” option to include it in the printed and shared plan.</p><div class="stay-options-grid">${options.map((item,index)=>{const key=`stay:${stayType}:${index}`;return`<article class="stay-option-card"><a href="${item.url}" target="_blank" rel="noreferrer"><b>${item.name}</b><span>${item.note}</span><i>View stay details ↗</i></a><label class="plan-stop-toggle"><input class="plan-stop-checkbox" type="radio" name="plannedStay" value="${key}" data-plan-name="${item.name}" data-plan-category="WHERE TO STAY" ${selectedStayKey===key?"checked":""}><span>Plan this</span></label></article>`}).join("")}</div><div class="stay-confirmation-panel" id="stayConfirmationPanel" ${selectedStayName?"":"hidden"}><p id="staySummary">${selectedStayName?`You are staying at “${selectedStayName}”.`:""}</p><label for="stayConfirmation">Confirmation number <span>(optional)</span></label><input id="stayConfirmation" type="text" maxlength="80" autocomplete="off" placeholder="Reservation or confirmation number" value="${escapeHtml(plan.stayConfirmation||"")}"><small class="stay-confirmation-field-note">Saved on this device and included when you print or share.</small><p class="stay-confirmation-print" id="stayConfirmationPrint">${plan.stayConfirmation?`Confirmation number: ${escapeHtml(plan.stayConfirmation)}`:""}</p></div><p class="planned-stay-status" id="plannedStayStatus" aria-live="polite"></p><p class="stay-guide-note">Availability and amenities can change. Confirm dates, rates, cancellation terms, pet rules, trailer parking, and direct dune access with the property before booking.</p></section>`
}
function renderTrip(plan){
  const result=document.getElementById("tripPlan");if(!result)return;
  const tripLabel=plan.tripType==="camping"?"Camping":plan.tripType==="offsite"?"Town lodging":"Day trip";
  result.hidden=false;
  result.innerHTML=`<div class="plan-top"><div><p class="kicker">YOUR PERSONALIZED PLAN</p><h2>${plan.region.name}</h2><p>${plan.region.headline}. ${plan.region.summary}</p></div><div class="plan-actions"><button type="button" id="printPlan">Print / Save PDF</button><button type="button" id="sharePlan" aria-expanded="false" aria-controls="planShareMenu">Share plan</button><button type="button" id="editPlan">Edit answers</button>
    <div class="plan-share-menu" id="planShareMenu" role="dialog" aria-label="Share this trip plan" hidden>
      <div class="plan-share-heading"><div><span>SHARE THIS PLAN</span><b>Choose where to send it.</b></div><button type="button" id="closePlanShare" aria-label="Close share options">×</button></div>
      <a class="plan-share-option" id="shareMessenger" href="https://www.messenger.com/" target="_blank" rel="noreferrer"><span>M</span><div><b>Messenger</b><small>Copy the plan, then open Messenger</small></div><i>→</i></a>
      <a class="plan-share-option" id="shareEmail"><span>@</span><div><b>Email</b><small>Open a ready-to-send message</small></div><i>→</i></a>
      <a class="plan-share-option" id="shareText"><span>TXT</span><div><b>Text</b><small>Send by SMS or iMessage</small></div><i>→</i></a>
      <p class="plan-share-feedback" id="planShareFeedback" aria-live="polite"></p>
    </div>
  </div></div>
  <div class="plan-stats"><div><span>Dates</span><b>${formatDate(plan.arrival)}–${formatDate(plan.departure)}</b></div><div><span>Length</span><b>${plan.days} day${plan.days===1?"":"s"}</b></div><div><span>Stay</span><b>${tripLabel}</b></div><div><span>Crew</span><b>${plan.partySize} traveler${plan.partySize===1?"":"s"}</b></div></div>
  ${renderStaySection(plan)}
  <section class="plan-section"><p class="section-label">KNOW BEFORE YOU GO</p><h2>Your trip-specific notes</h2><div class="alert-grid">${plan.alerts.map(x=>`<article class="plan-alert"><b>${x[0]}</b><p>${x[1]}</p></article>`).join("")}</div></section>
  <section class="plan-section"><p class="section-label">DAY BY DAY</p><h2>A plan with breathing room</h2><div class="itinerary">${plan.itinerary.map((x,i)=>`<article class="day-card"><div class="day-number"><span>DAY</span><b>${i+1}</b></div><div class="day-copy"><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join("")}</div></section>
  ${plan.interests.includes("towns")?`<section class="plan-section local-guide"><p class="section-label">SHOP, EAT & EXPLORE</p><h2>Local picks near ${plan.region.base}</h2><p class="local-guide-intro">Build a town break around these nearby visitor-friendly stops. Check “Plan this” on the places your group chooses, and those picks will be included when you share the plan.</p><div class="local-stop-grid">${renderLocalStopGroup("TOURIST SHOPPING",plan.region.localStops.shopping,"shopping",plan.plannedStops)}${renderLocalStopGroup("LUNCH",plan.region.localStops.lunch,"lunch",plan.plannedStops)}${renderLocalStopGroup("DINNER",plan.region.localStops.dinner,"dinner",plan.plannedStops)}${renderLocalStopGroup("NEXT MORNING BREAKFAST",plan.region.localStops.breakfast,"breakfast",plan.plannedStops)}</div><p class="planned-stops-status" id="plannedStopsStatus" aria-live="polite"></p><p class="local-guide-note"><b>Before you go:</b> Coastal business hours can change seasonally. Open each listing to confirm today’s hours, reservations, and accessibility.</p></section>`:""}
  <section class="plan-section"><p class="section-label">PACK & PREP</p><h2>Your personalized checklist</h2><div class="checklist-columns">${plan.checklist.map(x=>`<div class="checklist-item">${x}</div>`).join("")}</div></section>
  <section class="plan-section"><p class="section-label">PRIMARY SOURCES</p><h2>Verify before the wheels turn</h2><div class="plan-sources"><a href="https://www.fs.usda.gov/r06/siuslaw/recreation/opportunities/highway-vehicles-ohv" target="_blank" rel="noreferrer"><b>Forest Service OHV</b><span>Maps, alerts, and access ↗</span></a><a href="https://www.oregon.gov/oprd/atv/pages/atv-overview.aspx" target="_blank" rel="noreferrer"><b>Oregon ATV Program</b><span>Permits and safety rules ↗</span></a><a href="maps.html"><b>Field Guide Map</b><span>Compare regions and staging →</span></a></div></section>`;
  document.getElementById("printPlan").addEventListener("click",()=>window.print());
  const shareButton=document.getElementById("sharePlan");
  const shareMenu=document.getElementById("planShareMenu");
  const closeShareButton=document.getElementById("closePlanShare");
  const shareFeedback=document.getElementById("planShareFeedback");
  const plannerUrl=new URL("planner.html",window.location.href).href;
  const shareTitle="My Oregon Dunes trip plan";
  const shareSummary=`Oregon Dunes trip: ${plan.region.name}, ${formatDate(plan.arrival)} to ${formatDate(plan.departure)}, ${plan.days} days. Base: ${plan.region.base}. Primary area: ${plan.region.ride}.`;
  const selectedPlanStops=()=>[...result.querySelectorAll(".plan-stop-checkbox:checked")].map(input=>({key:input.value,category:input.dataset.planCategory,name:input.dataset.planName}));
  const buildShareMessage=()=>{const picks=selectedPlanStops(),stay=picks.find(item=>item.key.startsWith("stay:")),otherPicks=picks.filter(item=>!item.key.startsWith("stay:"));const confirmation=(document.getElementById("stayConfirmation")?.value||"").trim();const stayLine=stay?`\n\nYou are staying at "${stay.name}".${confirmation?` Confirmation number: ${confirmation}.`:""}`:"";const groupPicks=otherPicks.length?`\n\nGroup picks:\n${otherPicks.map(item=>`- ${item.category}: ${item.name}`).join("\n")}`:"";return`${shareSummary}${stayLine}${groupPicks}\n\nBuild your own Oregon Dunes plan: ${plannerUrl}`};
  const closeShare=()=>{shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false");shareButton.focus()};
  closeShareButton.addEventListener("click",closeShare);
  shareMenu.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();closeShare()}});
  const emailLink=document.getElementById("shareEmail");
  const textLink=document.getElementById("shareText");
  const refreshShareLinks=()=>{const shareMessage=buildShareMessage();emailLink.href=`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`;textLink.href=`sms:?&body=${encodeURIComponent(shareMessage)}`};
  const confirmationInput=document.getElementById("stayConfirmation");
  const updateStayConfirmation=()=>{
    if(!confirmationInput)return;
    plan.stayConfirmation=confirmationInput.value.trim();
    const confirmationPrint=document.getElementById("stayConfirmationPrint");
    if(confirmationPrint)confirmationPrint.textContent=plan.stayConfirmation?`Confirmation number: ${plan.stayConfirmation}`:"";
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.stayConfirmation=plan.stayConfirmation;saveTrip(savedData)}catch{}}
    refreshShareLinks()
  };
  const updatePlannedStops=()=>{
    const picks=selectedPlanStops(),status=document.getElementById("plannedStopsStatus");
    const stayPick=picks.find(item=>item.key.startsWith("stay:")),otherPicks=picks.filter(item=>!item.key.startsWith("stay:")),stayStatus=document.getElementById("plannedStayStatus");
    const stayPanel=document.getElementById("stayConfirmationPanel"),staySummary=document.getElementById("staySummary");
    plan.plannedStops=picks.map(item=>item.key);
    if(status)status.textContent=otherPicks.length?`${otherPicks.length} group pick${otherPicks.length===1?"":"s"} will be included when this plan is shared.`:"No group picks selected yet.";
    if(stayStatus)stayStatus.textContent=stayPick?"Your selected stay will be included when this plan is printed or shared.":"No stay option selected yet.";
    if(stayPanel)stayPanel.hidden=!stayPick;
    if(staySummary)staySummary.textContent=stayPick?`You are staying at "${stayPick.name}".`:"";
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.plannedStops=plan.plannedStops;saveTrip(savedData)}catch{}}
    refreshShareLinks()
  };
  result.querySelectorAll(".plan-stop-checkbox").forEach(input=>input.addEventListener("change",updatePlannedStops));
  if(confirmationInput)confirmationInput.addEventListener("input",updateStayConfirmation);
  updateStayConfirmation();
  updatePlannedStops();
  shareButton.addEventListener("click",()=>{const opening=shareMenu.hidden;refreshShareLinks();shareMenu.hidden=!opening;shareButton.setAttribute("aria-expanded",String(opening));shareFeedback.textContent="";if(opening)closeShareButton.focus()});
  emailLink.addEventListener("click",()=>{shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false")});
  textLink.addEventListener("click",()=>{shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false")});
  document.getElementById("shareMessenger").addEventListener("click",async()=>{
    const picks=selectedPlanStops();
    shareFeedback.textContent=picks.length?`Plan copied with ${picks.length} group pick${picks.length===1?"":"s"}—choose a conversation and paste it into Messenger.`:"Plan copied—choose a conversation and paste it into Messenger.";
    try{await navigator.clipboard.writeText(buildShareMessage())}
    catch{shareFeedback.textContent="Messenger opened, but this browser blocked copying. Email and Text remain available here."}
  });
  document.getElementById("editPlan").addEventListener("click",()=>{document.getElementById("tripPlannerForm").scrollIntoView({behavior:"smooth"})});
  loadPlannerWeather(plan);
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
function restoreTrip(form,data){
  Object.entries(data||{}).forEach(([key,value])=>{if(["toys","crew","interests"].includes(key)){form.querySelectorAll(`input[name="${key}"]`).forEach(x=>x.checked=value.includes(x.value))}else{const radio=form.querySelector(`input[type="radio"][name="${key}"][value="${value}"]`);if(radio){radio.checked=true;return}const field=form.elements[key];if(field&&typeof field.value!=="undefined")field.value=value}});
}
function readSavedTrip(){try{return window.localStorage.getItem("odfg-trip")}catch{return null}}
function saveTrip(data){try{window.localStorage.setItem("odfg-trip",JSON.stringify(data));return true}catch{return false}}
function clearSavedTrip(){try{window.localStorage.removeItem("odfg-trip")}catch{}}
function setupPlanner(){
  const form=document.getElementById("tripPlannerForm");if(!form)return;
  const error=document.getElementById("plannerError"),saved=readSavedTrip();
  if(saved){try{const data=JSON.parse(saved);restoreTrip(form,data);renderTrip(buildTrip(data))}catch{}}
  form.addEventListener("submit",e=>{e.preventDefault();const data=collectTrip(form);error.textContent="";if(!data.arrival||!data.departure){error.textContent="Please choose arrival and departure dates.";return}if(new Date(data.departure)<new Date(data.arrival)){error.textContent="Departure cannot be before arrival.";return}if(data.toys.includes("none")&&data.toys.length>1){error.textContent='Choose "No machines" or select the machines you are bringing, not both.';return}if(!data.toys.length)data.toys=["none"];saveTrip(data);renderTrip(buildTrip(data))});
  document.getElementById("clearTrip").addEventListener("click",()=>{clearSavedTrip();form.reset();document.getElementById("tripPlan").hidden=true;error.textContent=""});
}
document.addEventListener("DOMContentLoaded",()=>{setupPlanner();setupMenu();setupShareControls();renderGuide();renderMap()});
