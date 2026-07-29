window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
window.odgTrack=window.odgTrack||function(eventName,parameters={}){
  window.gtag("event",eventName,{...parameters,page_path:window.location.pathname});
};
(function loadAnalyticsConfiguration(){
  if(typeof location==="undefined"||location.protocol==="file:"||!document.createElement||!document.head?.appendChild)return;
  const script=document.createElement("script");
  script.src="/api/analytics-config";
  script.async=true;
  document.head.appendChild(script)
})();

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
    ["Permits, rules & local support","Handle the legal basics first, then know where to find riding gear, recovery supplies, and machine parts near each dune region."],
    ["Dune-reading fundamentals","Approach crests at an angle so you can scan the downwind side. Watch for razorbacks, witches' eyes, changing sand moisture, hidden traffic, and abrupt bowls."],
    ["Group protocol","A good group ride stays organized without feeling rigid. Set the route and roles before moving, leave room to react, keep every rider accounted for, and make the youngest or least-experienced rider the pace setter."]
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
  {id:"florence",name:"Florence",region:"Florence",type:"town",lat:43.98001,lng:-124.10131,image:"/images/place-florence-harbor.webp",summary:"The north gateway for groceries, fuel, rentals, lodging, dunes, and lakes.",access:"US 101 · north gateway",best:"First visits and mixed groups",url:"https://www.google.com/maps/search/?api=1&query=Florence%2C%20Oregon"},
  {id:"south-jetty",name:"South Jetty OHV Staging",region:"Florence",type:"staging",lat:43.95674,lng:-124.12045,image:"/images/place-south-jetty.webp",summary:"A principal day-use staging point for the northern riding area.",access:"South Jetty Road",best:"Day rides and north-zone access",url:"https://www.google.com/maps/search/?api=1&query=South%20Jetty%20OHV%20Staging%20Area%20Oregon",guide:"riding-florence.html"},
  {id:"honeyman",name:"Honeyman State Park",region:"Florence",type:"campground",lat:43.93041,lng:-124.10892,image:"/images/place-honeyman-cleawox.webp",summary:"A large developed campground between freshwater lakes and dunes.",access:"US 101 south of Florence",best:"Families and lake time",url:"https://www.google.com/maps/search/?api=1&query=Jessie%20M.%20Honeyman%20Memorial%20State%20Park"},
  {id:"siltcoos",name:"Siltcoos Riding Area",region:"Florence",type:"riding",lat:43.88054,lng:-124.13761,image:"/images/place-siltcoos-lake.webp",summary:"The southern half of the Florence riding region, with open sand, forest edges, and designated routes.",access:"Siltcoos and Driftwood access",best:"Varied northern-zone terrain",url:"https://www.google.com/maps/search/?api=1&query=Siltcoos%20OHV%20Oregon",guide:"riding-florence.html"},
  {id:"reedsport",name:"Reedsport",region:"Winchester Bay",type:"town",lat:43.70234,lng:-124.09678,image:"/images/place-reedsport-bridge.webp",summary:"A full-service US 101 town east of Winchester Bay with groceries, fuel, food, and repair support.",access:"US 101 and OR 38",best:"Supplies and central-region backups",url:"https://www.google.com/maps/search/?api=1&query=Reedsport%2C%20Oregon"},
  {id:"winchester",name:"Winchester Bay",region:"Winchester Bay",type:"town",lat:43.67761,lng:-124.17379,image:"/images/place-winchester-bay.webp",summary:"A compact harbor community near the central dunes.",access:"US 101 · central gateway",best:"Riding weekends and harbor evenings",url:"https://www.google.com/maps/search/?api=1&query=Winchester%20Bay%2C%20Oregon"},
  {id:"umpqua",name:"Umpqua Dunes Riding Area",region:"Winchester Bay",type:"riding",lat:43.61296,lng:-124.21156,image:"/images/place-umpqua-dunes.webp",summary:"The dramatic central riding zone, known for large open dunes and changing wind-shaped terrain.",access:"Winchester Bay and Umpqua approaches",best:"Experienced riders and big sand",url:"https://www.google.com/maps/search/?api=1&query=Umpqua%20Dunes%20Oregon",guide:"riding-winchester-bay.html"},
  {id:"eel-creek",name:"Eel Creek Campground",region:"Winchester Bay",type:"campground",lat:43.58831,lng:-124.18723,image:"/images/place-eel-creek.webp",summary:"Forested Forest Service camping with a trail leading toward the open dunes.",access:"Near Lakeside",best:"Quieter dune access",url:"https://www.google.com/maps/search/?api=1&query=Eel%20Creek%20Campground%20Oregon"},
  {id:"lakeside",name:"Lakeside",region:"Winchester Bay",type:"town",lat:43.57567,lng:-124.17512,image:"/images/place-lakeside-tenmile.webp",summary:"A small lake community between the central and southern dunes with food, fuel, and lodging.",access:"US 101 and N 8th Street",best:"Lake stays and regional access",url:"https://www.google.com/maps/search/?api=1&query=Lakeside%2C%20Oregon"},
  {id:"spinreel",name:"Spinreel Campground",region:"Coos Bay",type:"campground",lat:43.56968,lng:-124.20370,image:"/images/place-spinreel-sand.webp",summary:"OHV-oriented Forest Service camping and staging near the southern riding network.",access:"Spinreel Road",best:"Ride-from-camp trips",url:"https://www.google.com/maps/search/?api=1&query=Spinreel%20Campground%20Oregon",guide:"riding-coos-bay.html"},
  {id:"riley",name:"Riley Ranch County Park",region:"Coos Bay",type:"campground",lat:43.5150,lng:-124.2189,image:"/images/place-riley-ranch.webp",summary:"A large county campground beside Butterfield Lake with direct ATV access to the dunes.",access:"US 101 near Hauser",best:"Groups, trailers, and direct access",url:"https://www.google.com/maps/search/?api=1&query=Riley%20Ranch%20County%20Park%20Oregon",guide:"riding-coos-bay.html"},
  {id:"horsfall",name:"Horsfall OHV Staging",region:"Coos Bay",type:"staging",lat:43.44288,lng:-124.24525,image:"/images/place-horsfall.webp",summary:"Major day-use access near North Bend with routes into the southern dunes.",access:"Horsfall Beach Road",best:"Groups and meetups",url:"https://www.google.com/maps/search/?api=1&query=Horsfall%20OHV%20Staging%20Area",guide:"riding-coos-bay.html"},
  {id:"north-bend",name:"North Bend",region:"Coos Bay",type:"town",lat:43.40650,lng:-124.22428,image:"/images/place-north-bend.webp",summary:"The closest full-service town to Horsfall, with lodging, dining, groceries, and machine support.",access:"US 101 · south gateway",best:"Horsfall and Hauser services",url:"https://www.google.com/maps/search/?api=1&query=North%20Bend%2C%20Oregon"},
  {id:"coos",name:"Coos Bay",region:"Coos Bay",type:"town",lat:43.36789,lng:-124.21746,image:"/images/place-coos-bay.webp",summary:"The south coast’s broadest service base for supplies, repairs, food, and lodging.",access:"US 101 · south coast",best:"Longer stays and full services",url:"https://www.google.com/maps/search/?api=1&query=Coos%20Bay%2C%20Oregon"},
  {id:"florence-motorsports",name:"Florence Motorsports",region:"Florence",type:"parts",lat:43.97512,lng:-124.10280,image:"/images/riding-04-checklist.webp",summary:"Powersports sales, service, parts, riding gear, and accessories in Florence.",access:"310 Highway 101",best:"Parts, gear, service, and tires",url:"https://www.florencemotorsports.com/"},
  {id:"one-stop",name:"1 Stop Sport Shop",region:"Winchester Bay",type:"parts",lat:43.70959,lng:-124.10109,image:"/images/riding-04-checklist.webp",summary:"A Reedsport sporting-goods stop known locally for basic ATV and motorcycle supplies.",access:"1401 Oregon Coast Highway",best:"Basic supplies, tools, and parts",url:"https://visittheoregoncoast.com/cities/reedsport/activities/1-stop-sport-shop/"},
  {id:"north-bend-powersports",name:"North Bend Powersports",region:"Coos Bay",type:"parts",lat:43.40726,lng:-124.22300,image:"/images/riding-04-checklist.webp",summary:"A full powersports dealership with parts, service, tires, wheels, and riding gear.",access:"2105 Sheridan Avenue",best:"Parts, repairs, tires, and gear",url:"https://www.northbendpowersports.com/"}
];

function renderMap(){
  const canvas=document.getElementById("mapCanvas");
  const detail=document.getElementById("mapDetail");
  if(!canvas||!detail)return;

  const filters=[...document.querySelectorAll("[data-filter]")];
  const basemapButtons=[...document.querySelectorAll("[data-basemap]")];
  const typeLabels={town:"Gateway town",staging:"OHV staging",campground:"Campground",riding:"Riding area",parts:"Parts & gear"};
  if(!window.L){
    detail.innerHTML=`<span class="place-type">MAP UNAVAILABLE</span><h2>Open the detailed riding guides.</h2><p>The live map could not load. The regional guides still include official map images, staging, camping, and GPS links.</p><a class="button sand" href="riding-florence.html">Open Florence riding guide →</a>`;
    return;
  }
  const map=L.map(canvas,{zoomControl:true,minZoom:8,maxZoom:18}).setView([43.69,-124.16],9);
  const baseLayers={
    street:L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    terrain:L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:'Map data &copy; OpenStreetMap contributors, style &copy; OpenTopoMap'}),
    satellite:L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"Tiles &copy; Esri"})
  };
  let currentBase=baseLayers.street.addTo(map);
  const markerLayer=L.layerGroup().addTo(map);
  const zoneLayer=L.layerGroup().addTo(map);
  const markerColors={town:"#235f77",staging:"#e25b34",campground:"#7e8c43",riding:"#c28d3a",parts:"#6f4c89"};
  const ridingZones=[
    {id:"siltcoos",color:"#e25b34",bounds:[[43.965,-124.151],[43.965,-124.112],[43.875,-124.105],[43.872,-124.153]]},
    {id:"umpqua",color:"#c28d3a",bounds:[[43.695,-124.225],[43.690,-124.174],[43.565,-124.170],[43.560,-124.232]]},
    {id:"horsfall",color:"#3f8c79",bounds:[[43.585,-124.226],[43.581,-124.183],[43.424,-124.202],[43.421,-124.273]]}
  ];
  let selectedId=mapPlaces[0].id;
  let activeFilter="all";

  function showPlace(place){
    selectedId=place.id;
    const rootUsesPublicPrefix=Boolean(document.querySelector('img[src^="public/"]'));
    const publicPath=place.image.startsWith("/images/")?`public${place.image}`:place.image;
    const hostedPath=place.image.replace(/^public\//,"/");
    const imageCandidates=rootUsesPublicPrefix?[publicPath,hostedPath]:[hostedPath,publicPath];
    const applyImage=(url)=>{
      if(selectedId!==place.id)return;
      detail.style.setProperty("--place-image",`url("${url}")`);
      detail.style.backgroundImage=`linear-gradient(180deg,rgba(7,39,37,.25),rgba(7,39,37,.67)),url("${url}")`;
    };
    const tryImage=(index)=>{
      if(index>=imageCandidates.length)return;
      const probe=new Image();
      probe.onload=()=>applyImage(imageCandidates[index]);
      probe.onerror=()=>tryImage(index+1);
      probe.src=imageCandidates[index];
    };
    tryImage(0);
    markerLayer.eachLayer(marker=>marker.getElement()?.classList.toggle("active",marker.options.placeId===place.id));
    detail.innerHTML=`<span class="place-type">${typeLabels[place.type]||place.type}</span>
      <span class="region-name">${place.region} region</span>
      <h2>${place.name}</h2>
      <p>${place.summary}</p>
      <dl><div><dt>Access</dt><dd>${place.access}</dd></div><div><dt>Best for</dt><dd>${place.best}</dd></div></dl>
      <div class="map-detail-actions">${place.guide?`<a class="button sand" href="${place.guide}">Open riding map & guide →</a>`:""}<a class="map-gps-link" href="${place.url}" target="_blank" rel="noreferrer">${place.type==="parts"?"Open business website":"Open GPS directions"} ↗</a></div>`;
  }

  function drawMarkers(){
    markerLayer.clearLayers();
    zoneLayer.clearLayers();
    const visible=activeFilter==="all"?mapPlaces:mapPlaces.filter(place=>place.type===activeFilter);
    if(activeFilter==="all"||activeFilter==="riding")ridingZones.forEach(zone=>{
      const place=mapPlaces.find(item=>item.id===zone.id);
      L.polygon(zone.bounds,{color:zone.color,weight:2,fillColor:zone.color,fillOpacity:.24,dashArray:"7 6"}).on("click",()=>place&&showPlace(place)).addTo(zoneLayer);
    });
    visible.forEach(place=>{
      const icon=L.divIcon({className:"leaflet-place-icon",html:`<span class="leaflet-place-dot" style="--marker-color:${markerColors[place.type]}"></span><b>${place.name}</b>`,iconSize:[20,20],iconAnchor:[10,10]});
      const marker=L.marker([place.lat,place.lng],{icon,keyboard:true,title:place.name,placeId:place.id}).on("click",()=>showPlace(place)).addTo(markerLayer);
      marker.bindTooltip(`${place.name} · ${typeLabels[place.type]}`,{direction:"top",offset:[0,-10]});
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
  basemapButtons.forEach(button=>button.addEventListener("click",()=>{
    const key=button.dataset.basemap;
    if(!baseLayers[key]||baseLayers[key]===currentBase)return;
    map.removeLayer(currentBase);
    currentBase=baseLayers[key].addTo(map);
    currentBase.bringToBack();
    basemapButtons.forEach(item=>item.classList.toggle("active",item===button));
  }));
  drawMarkers();
  setTimeout(()=>map.invalidateSize(),0);
}

function setupMenu(){const header=document.querySelector(".site-header"),button=document.querySelector(".menu-button");if(!button)return;button.addEventListener("click",()=>{const open=header.classList.toggle("open");button.setAttribute("aria-expanded",String(open));button.textContent=open?"Close":"Menu"})}
function currentShareDetails(){
  const title=document.title||"Oregon Dunes Guide";
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
const topicBrowserTitles={
  camping:"Camping",
  riding:"OHV Riding",
  safety:"Dune Safety",
  permits:"Permits & Regulations",
  towns:"Nearby Towns",
  wildlife:"Wildlife",
  conditions:"Current Conditions",
  planner:"Trip Planner"
};

function renderGuide(){
  const root=document.getElementById("guideRoot");if(!root)return;
  const requestedKey=document.body.dataset.topic||new URLSearchParams(location.search).get("topic")||"camping";
  const key=chapters[requestedKey]?requestedKey:"camping";
  const page=chapters[key];
  const isRiding=key==="riding";
  const ridingImages=[
    ["place-south-jetty.webp","ATV riders exploring the open sand and forest-edge routes near Florence"],
    ["place-umpqua-dunes.webp","A side-by-side paused beneath the large wind-shaped Umpqua Dunes"],
    ["place-horsfall.webp","Dirt-bike riders choosing a route where the southern dunes meet the coastal forest"],
    ["riding-04-checklist.webp","A rider checking an ATV, protective equipment, recovery gear, and whip flag before staging"],
    ["riding-05-dune-reading.webp","An ATV rider approaching a sharp dune crest slowly enough to inspect the slip face"],
    ["riding-06-group-protocol.webp","A riding group stopped together to agree on the route and regrouping plan"]
  ];
  const ridingMaps=[
    {
      region:"Florence / South Jetty–Siltcoos",
      pageUrl:"riding-florence.html",
      buttonLabel:"Open the Florence map & guide"
    },
    {
      region:"Winchester Bay / Umpqua Dunes",
      pageUrl:"riding-winchester-bay.html",
      buttonLabel:"Open the Winchester Bay map & guide"
    },
    {
      region:"Coos Bay / Spinreel–Horsfall",
      pageUrl:"riding-coos-bay.html",
      buttonLabel:"Open the Coos Bay map & guide"
    }
  ];
  const renderSection=(section,index)=>{
    const map=ridingMaps[index];
    const mapPanel=map?`<aside class="riding-map-panel"><span>MAPS, STAGING & GPS</span><h3>${map.region}</h3><p>See the official riding-area map, staging choices, trail starting points, nearby camping, and one-tap GPS directions on one simple page.</p><a class="button ink" href="${map.pageUrl}">${map.buttonLabel} →</a></aside>`:"";
    const prepPanel=isRiding&&index===3?`<div class="riding-prep-grid">
      <article class="riding-prep-card"><span>PERMIT</span><h3>Buy the Oregon ATV permit.</h3><p>Oregon's operating permit is required for machines used on public ATV lands. It currently costs $10 and is valid for two years. Online buyers receive temporary proof by email.</p><div><a href="https://store.oregonstateparks.org/index.cfm?do=v.dsp_item&itemId=100" target="_blank" rel="noopener">Buy the permit online ↗</a><a href="https://www.oregon.gov/oprd/ATV/Pages/ATV-permits.aspx" target="_blank" rel="noopener">Read permit details ↗</a></div></article>
      <article class="riding-prep-card"><span>EQUIPMENT</span><h3>Know the rules.</h3><p>Helmet and eye protection, whip flags, lighting, safety cards, sound limits, and equipment requirements depend on rider age, vehicle class, location, and conditions.</p><div><a href="rules.html">Open the rules guide →</a></div></article>
    </div>
    <aside class="riding-local-support"><span>LOCAL GEAR, PARTS & REPAIRS</span><h3>Forgot it—or broke it?</h3><p>These nearby businesses advertise useful riding gear, ATV or motorcycle parts, tools, tires, or repair support. Call before driving over to confirm hours and exact inventory.</p><div class="riding-shop-grid">
      <a href="https://www.florencemotorsports.com/" target="_blank" rel="noopener"><b>Florence Motorsports</b><span>Florence · helmets, riding gear, parts, and accessories</span><strong>Shop information ↗</strong></a>
      <a href="https://visittheoregoncoast.com/cities/reedsport/activities/1-stop-sport-shop/" target="_blank" rel="noopener"><b>1 Stop Sport Shop</b><span>Reedsport · basic ATV and motorcycle parts, air, tools, and chain supplies</span><strong>Shop information ↗</strong></a>
      <a href="https://www.northbendpowersports.com/" target="_blank" rel="noopener"><b>North Bend Powersports</b><span>North Bend · tires, wheels, riding gear, and parts for many makes</span><strong>Shop information ↗</strong></a>
    </div></aside>`:"";
    const duneVideoPanel=isRiding&&index===4?`<aside class="riding-video-panel">
      <div class="riding-video-heading"><span>WATCH: DUNE READING IN ACTION</span><h3>Driving Sand Dunes, Beginners to Advanced</h3><p>Watch how the rider reads crests, slopes, changing sand, and the terrain ahead. Pause as needed and compare each technique with the safety points above.</p></div>
      <a class="riding-video-frame riding-video-preview" href="https://youtu.be/LxyEo_Bnpk0?si=OGAVvjKT6rDICxnB" target="_blank" rel="noopener" aria-label="Watch Driving Sand Dunes, Beginners to Advanced on YouTube"><img src="/images/video-dune-reading.jpg" alt="Preview of Driving Sand Dunes, Beginners to Advanced"><span class="riding-video-play" aria-hidden="true">▶</span><b>Watch the dune-reading video</b></a>
      <p class="riding-video-note"><strong>Remember:</strong> a video can demonstrate technique, but it cannot show today’s sand, traffic, closures, or visibility. Slow down and read the conditions in front of you.</p>
      <a href="https://youtu.be/LxyEo_Bnpk0?si=OGAVvjKT6rDICxnB" target="_blank" rel="noopener">Watch directly on YouTube ↗</a>
    </aside>`:"";
    const groupProtocolPanel=isRiding&&index===5?`<div class="group-protocol-grid">
      <article><span>01 · BEFORE YOU MOVE</span><h3>Plan the ride and assign roles.</h3><ul>
        <li><strong>Riders’ meeting:</strong> review the route, terrain, fuel stops, regroup points, hand signals, and what to do if separated.</li>
        <li><strong>Lead rider:</strong> sets a sustainable pace, scans for hazards, and stops where the entire group can gather safely.</li>
        <li><strong>Sweep rider:</strong> stays last, helps with breakdowns, and confirms that nobody has been left behind.</li>
        <li><strong>Group size:</strong> aim for five to seven riders; split larger groups and give each one its own lead and sweep.</li>
      </ul></article>
      <article><span>02 · SPACE TO REACT</span><h3>Control the gap—not the rider ahead.</h3><ul>
        <li>Ride single file on narrow routes, through dust, near blind crests, and around tight corners.</li>
        <li>Keep at least a three-to-five-second following gap, adding more space when visibility or traction worsens.</li>
        <li>Never “dust-draft.” If you cannot clearly see the route, slow or stop somewhere safe and let the gap open.</li>
      </ul></article>
      <article><span>03 · EVERY TURN COUNTS</span><h3>Use the buddy system.</h3><ul>
        <li>At every confusing turn or intersection, wait until you see the rider behind you recognize and complete the turn.</li>
        <li>If each rider keeps contact with the person behind, the group stays connected and the sweep knows where to go.</li>
        <li>When someone is missing, stop at the agreed regroup point. Do not scatter the group into an uncoordinated search.</li>
      </ul></article>
      <article><span>04 · READ FAR AHEAD</span><h3>Keep your head on a swivel.</h3><ul>
        <li>Look beyond the sand directly in front of the machine. Scan far enough ahead to anticipate traffic, holes, drop-offs, and changing lines.</li>
        <li>Assume the unexpected can happen: another rider may appear, the sand may change, or the safe-looking route may close abruptly.</li>
        <li>When meeting oncoming riders, slow down and use the group’s agreed signal to indicate that more riders are behind you.</li>
      </ul></article>
      <article><span>05 · RIDING WITH KIDS</span><h3>Build an adult safety buffer.</h3><ul>
        <li>Choose an officially open, low-consequence practice area and avoid peak holiday and Saturday traffic when possible.</li>
        <li>Place experienced adults in front of, behind, and—when space permits—beside young riders so approaching traffic recognizes a supervised group.</li>
        <li>Use age-appropriate machines, required training and supervision, full safety gear, and short loops with frequent check-ins.</li>
      </ul></article>
      <article><span>06 · LOOK AFTER PEOPLE</span><h3>Stop, check, and offer help.</h3><ul>
        <li>Wear a helmet and appropriate protective gear. Appearance is irrelevant when the equipment can prevent a life-changing injury.</li>
        <li>If someone is stopped, broken down, or involved in an accident, slow safely and check whether help is needed.</li>
        <li>Even if you cannot repair the machine, you may be able to call for help, share water, direct traffic, or simply stay with an injured rider.</li>
      </ul></article>
    </div>
    <aside class="facebook-video-resource"><div><span>RELATED RIDING VIDEO</span><h3>Tips and ideas for riding sand dunes</h3><p>Facebook does not provide a reliable website player for group posts. This button opens the original post in Facebook, where visibility may depend on the post’s current privacy settings or group membership.</p></div><a class="button sand" href="https://www.facebook.com/groups/258742818128141/posts/575683449767408/" target="_blank" rel="noopener">Watch on Facebook ↗</a></aside>`:"";
    const standardItems=section[2]?`<ul>${section[2].map(item=>`<li>${item}</li>`).join("")}</ul>`:"";
    const copy=`<span>0${index+1}</span><h2>${section[0]}</h2><p>${section[1]}</p>${prepPanel||standardItems}${duneVideoPanel}${groupProtocolPanel}${mapPanel}`;
    if(!isRiding)return `<section id="section-${index}">${copy}</section>`;
    const image=ridingImages[index];
    if(index===5)return `<section id="section-${index}" class="riding-section-card riding-group-section">
      <div class="riding-group-story" aria-label="A group ride from planning through the trail">
        <figure class="riding-group-story-main"><img src="public/images/riding-06-group-protocol.webp" data-fallback-src="/images/riding-06-group-protocol.webp" alt="A riding group stopped together while a leader points out the route"><figcaption><span>01</span><b>Meet, map & assign roles</b></figcaption></figure>
        <figure class="riding-group-story-formation"><img src="public/images/place-horsfall.webp" data-fallback-src="/images/place-horsfall.webp" alt="A group of riders moving together across the Horsfall dunes"><figcaption><span>02</span><b>Ride with visible spacing</b></figcaption></figure>
        <figure class="riding-group-story-regroup"><img src="public/images/camp-ohv-before-ride.webp" data-fallback-src="/images/camp-ohv-before-ride.webp" alt="Riders regrouping beside their machines to check a map and equipment"><figcaption><span>03</span><b>Regroup, check & continue</b></figcaption></figure>
      </div>
      <div class="guide-section-copy">${copy}</div>
    </section>`;
    return `<section id="section-${index}" class="riding-section-card"><img class="guide-section-photo" src="public/images/${image[0]}" data-fallback-src="/images/${image[0]}" alt="${image[1]}"><div class="guide-section-copy">${copy}</div></section>`;
  };
  document.title=`${topicBrowserTitles[key]||page.eyebrow} | Oregon Dunes Guide`;
  root.innerHTML=`<section class="guide-hero guide-hero-${key}"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.intro}</p></div></section><div class="guide-layout shell"><aside class="guide-toc"><p>IN THIS GUIDE</p>${page.sections.map((s,i)=>`<a href="#section-${i}"><span>0${i+1}</span>${s[0]}</a>`).join("")}</aside><div class="guide-content${isRiding?" riding-content":""}">${page.sections.map(renderSection).join("")}</div></div><section class="chapter-nav"><div class="shell"><div><small>KEEP PLANNING</small><h2>Ready for the next detail?</h2></div><a class="button ink" href="${key==="conditions"?"maps.html":"planner.html"}">${key==="conditions"?"Open the map":"Build a personal plan"} ↗</a></div></section>`;
  if(isRiding)root.querySelectorAll(".guide-section-photo").forEach(img=>img.addEventListener("error",()=>{const fallback=img.dataset.fallbackSrc;if(fallback&&img.getAttribute("src")!==fallback)img.src=fallback},{once:true}));
}
function renderCampingGuide(page){
  const regions=[
    ["NORTH","Florence","First trips, families & mixed groups","Developed camping, freshwater lakes, town services, and access to the South Jetty–Siltcoos area.",["Jessie M. Honeyman Memorial State Park","Forest Service lake and forest campgrounds","Town RV parks and private campgrounds"],"place-honeyman-cleawox.webp","Cleawox Lake inside Jessie M. Honeyman Memorial State Park"],
    ["CENTRAL","Winchester Bay","Focused riding weekends","A compact harbor base close to the Umpqua Dunes, food, fuel, and Reedsport services.",["Umpqua Lighthouse State Park","Winchester Bay harbor-area camping","Eel Creek and nearby Forest Service sites"],"place-umpqua-dunes.webp","Banshee Hill in the Umpqua Dunes near Winchester Bay"],
    ["SOUTH","Coos Bay","Ride-from-camp & longer stays","OHV-oriented camping, staging access, repairs, groceries, and group-friendly bases.",["Riley Ranch County Park","Spinreel and Horsfall campgrounds","North Bend and Lakeside RV options"],"place-riley-ranch.webp","Butterfield Lake beside Riley Ranch County Park"]
  ];
  const styles=[
    ["RV + FAMILY","Full-service base","Choose hookups, showers, established roads, and nearby groceries when comfort or a larger crew matters most.","Honeyman or Riley Ranch","camp-style-full-service.webp"],
    ["OHV FOCUSED","Ride from camp","Prioritize legal machine access between the campsite and dunes. Confirm the route and quiet hours.","Riley Ranch, Spinreel, or Horsfall area","camp-style-ride-from-camp.webp"],
    ["TENT + SMALL RV","Quiet forest camp","Trade direct riding access for trees, privacy, lake walks, and a calmer evening.","Eel Creek or nearby lake campgrounds","camp-style-quiet.webp"],
    ["WEATHERPROOF","Cabin or yurt","A good fit for first-time campers, non-riders, and wet-weather trips. Pet-friendly units are limited.","Honeyman, Tugman, or Umpqua Lighthouse","camp-style-cabin-yurt.webp"]
  ];
  return `<section class="guide-hero guide-hero-camping"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.intro}</p></div></section>
  <section class="camp-quick shell" aria-label="Camping guide highlights"><article><span>01</span><b>Pick a region</b><small>Florence, Winchester Bay, or Coos Bay</small></article><article><span>02</span><b>Match your rig</b><small>Tent, RV, trailer, cabin, or yurt</small></article><article><span>03</span><b>Confirm access</b><small>Ride from camp or plan to trailer</small></article><article><span>04</span><b>Reserve a backup</b><small>Coastal weekends can fill quickly</small></article></section>
  <div class="guide-layout camp-guide-layout shell"><aside class="guide-toc"><p>IN THIS GUIDE</p><a href="#camp-style"><span>01</span>Choose your camp style</a><a href="#camp-regions"><span>02</span>Compare dune regions</a><a href="#camp-booking"><span>03</span>Book with a backup</a><a href="#camp-ohv"><span>04</span>Camp with machines</a><a href="#camp-rv"><span>05</span>RV and trailer fit</a><a href="#camp-dogs"><span>06</span>Camping with dogs</a><a href="#camp-pack"><span>07</span>Pack for the coast</a></aside>
  <div class="guide-content camp-content">
  <section id="camp-style"><span class="section-number">01</span><p class="camp-eyebrow">START WITH HOW YOU WANT TO CAMP</p><h2>Choose the experience before the campground.</h2><p class="camp-lead">The closest campsite is not always the best campsite. Decide whether your priority is direct riding access, full hookups, a quiet forest evening, or weatherproof comfort.</p><div class="camp-style-grid">${styles.map((s,i)=>`<article class="camp-style-card camp-style-card-${i+1}"><img class="camp-style-photo" src="public/images/${s[4]}" data-fallback-src="/images/${s[4]}" alt="" aria-hidden="true"><small>${s[0]}</small><h3>${s[1]}</h3><p>${s[2]}</p><b>Good starting point</b><span>${s[3]}</span></article>`).join("")}</div></section>
  <section id="camp-regions"><span class="section-number">02</span><p class="camp-eyebrow">NORTH TO SOUTH</p><h2>Three regions, three different camping trips.</h2><div class="camp-region-grid">${regions.map(r=>`<article><div class="camp-region-identity"><img class="camp-region-photo" src="public/images/${r[5]}" data-fallback-src="/images/${r[5]}" alt="${r[6]}"><small>${r[0]} REGION</small><h3>${r[1]}</h3><b>${r[2]}</b></div><p>${r[3]}</p><ul>${r[4].map(x=>`<li>${x}</li>`).join("")}</ul></article>`).join("")}</div><aside class="camp-callout"><b>Do not assume “near the dunes” means ride from camp.</b><p>Some campgrounds connect to legal OHV routes; others require loading the machines and driving to staging. Confirm the current route before booking.</p><a href="maps.html">Compare campgrounds and staging on the map →</a></aside></section>
  <section id="camp-booking"><span class="section-number">03</span><p class="camp-eyebrow">RESERVATIONS</p><h2>Reserve your base, then plan the adventure.</h2><div class="camp-split"><div class="camp-booking-card"><img class="camp-booking-photo" src="public/images/place-honeyman-cleawox.webp" data-fallback-src="/images/place-honeyman-cleawox.webp" alt="Cleawox Lake inside Jessie M. Honeyman Memorial State Park"><div class="camp-booking-copy"><h3>State park stays</h3><p>Oregon State Parks accepts reservations from the day of arrival through six months in advance. Honeyman offers tent sites, hookup sites, yurts, showers, and a dump station; availability can change.</p><a href="https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95" target="_blank" rel="noreferrer">Check Honeyman State Park ↗</a></div></div><div class="camp-booking-card"><img class="camp-booking-photo" src="public/images/camp-booking-forest-service.webp" data-fallback-src="/images/camp-booking-forest-service.webp" alt="Rustic Forest Service campsite beside coastal dunes"><div class="camp-booking-copy"><h3>Forest Service stays</h3><p>Reservable Forest Service sites are generally handled through Recreation.gov. Review the campground page for season, water, toilets, vehicle limits, and OHV access.</p><a href="https://www.recreation.gov/search?q=Oregon%20Dunes%20National%20Recreation%20Area" target="_blank" rel="noreferrer">Search Recreation.gov ↗</a></div></div></div><div class="camp-backup"><span>THE TWO-BACKUP RULE</span><p><b>Primary:</b> your preferred campground. <b>Backup one:</b> another developed campground in the same region. <b>Backup two:</b> town lodging or an RV park you can reach before dark.</p></div></section>
  <section id="camp-ohv"><span class="section-number">04</span><p class="camp-eyebrow">OHV CAMPING</p><h2>Make the machines good neighbors.</h2><div class="camp-check-grid"><article><img class="camp-check-photo" src="public/images/camp-ohv-before-arrival.webp" data-fallback-src="/images/camp-ohv-before-arrival.webp" alt="Campers checking a map and preparing an OHV before arriving"><div><b>Before arrival</b><p>Confirm legal camp-to-dune access, permits, flags, fire restrictions, and how many vehicles and trailers fit your site.</p></div></article><article><img class="camp-check-photo" src="public/images/camp-ohv-at-campsite.webp" data-fallback-src="/images/camp-ohv-at-campsite.webp" alt="A tidy OHV campsite with machines parked inside the assigned space"><div><b>At the campsite</b><p>Keep machines inside the assigned space, secure fuel, protect quiet hours, control dust, and never use campground roads as a practice loop.</p></div></article><article><img class="camp-check-photo" src="public/images/camp-ohv-before-ride.webp" data-fallback-src="/images/camp-ohv-before-ride.webp" alt="Riders performing helmet, tire, map, and whip-flag checks before a ride"><div><b>Before each ride</b><p>Warm up briefly, gather away from sleeping areas, confirm the return route, and leave one vehicle ready for emergencies.</p></div></article><article><img class="camp-check-photo" src="public/images/camp-ohv-after-ride.webp" data-fallback-src="/images/camp-ohv-after-ride.webp" alt="Riders organizing helmets and inspecting parked machines after a ride"><div><b>After the ride</b><p>Cool equipment safely, contain fluids, store helmets and keys, lower noise early, and keep sandy gear out of shared facilities.</p></div></article></div><a class="camp-source-card" href="https://www.fs.usda.gov/r06/siuslaw/alerts" target="_blank" rel="noreferrer"><span>CHECK CURRENT ORDERS</span><b>Forest Service alerts can change camping, fire, alcohol, occupancy, vehicle, and closure rules.</b><i>Open current Siuslaw alerts ↗</i></a></section>
  <section id="camp-rv"><span class="section-number">05</span><p class="camp-eyebrow">RVS & TRAILERS</p><h2>Measure the whole setup—not just the RV.</h2><ul class="camp-big-list"><li><img class="camp-rv-photo" src="public/images/camp-rv-total-length.webp" data-fallback-src="/images/camp-rv-total-length.webp" alt="Pickup and toy-hauler shown at their full combined length"><div><b>Total length</b><span>Include tow vehicle, tongue, racks, and the machine trailer when asking whether a site will fit.</span></div></li><li><img class="camp-rv-photo" src="public/images/camp-rv-turning-room.webp" data-fallback-src="/images/camp-rv-turning-room.webp" alt="A spotter guides a trailer through a tight coastal campground turn"><div><b>Turning room</b><span>Coastal campgrounds can have narrow loops, overhanging limbs, soft shoulders, and tight backing angles.</span></div></li><li><img class="camp-rv-photo" src="public/images/camp-rv-utilities.webp" data-fallback-src="/images/camp-rv-utilities.webp" alt="Camper connecting electrical, water, and sewer utilities correctly"><div><b>Utilities</b><span>Confirm amperage, water connection, dump availability, generator hours, and needed adapters.</span></div></li><li><img class="camp-rv-photo" src="public/images/camp-rv-parking-count.webp" data-fallback-src="/images/camp-rv-parking-count.webp" alt="Motorhome, tow vehicle, and OHV trailer arranged inside one campsite"><div><b>Parking count</b><span>A campsite may count an RV and its towed trailer as separate vehicles. Verify limits before arrival.</span></div></li><li><img class="camp-rv-photo" src="public/images/camp-rv-moisture-control.webp" data-fallback-src="/images/camp-rv-moisture-control.webp" alt="Wet-weather clothing and sandy boots organized outside a ventilated RV"><div><b>Moisture control</b><span>Bring leveling blocks, wheel chocks, ventilation, and a place for wet clothing and sandy boots.</span></div></li></ul></section>
  <section id="camp-dogs"><span class="section-number">06</span><p class="camp-eyebrow">DOG-FRIENDLY PLANNING</p><h2>Tell the planner you’re bringing your dog.</h2><p>Select “I’m bringing a dog” and the trip planner will show only stays with a verified pet-friendly policy. Before reserving, confirm current pet availability and fees; nearby beaches, habitat areas, and trails may have separate rules.</p><aside class="camp-dog-planner"><span>LET THE PLANNER DO THE FILTERING</span><b>Dog-friendly stay options—without the guesswork.</b><p>The planner matches your region and lodging style, then limits the results to options that welcome dogs.</p><a href="planner.html">Build a dog-friendly trip →</a></aside><div class="camp-dog-notes"><span>Keep dogs leashed where required and away from signed snowy-plover habitat.</span><span>Pack paw protection, water, shade, waste bags, a towel, and a weatherproof backup activity.</span><span>Confirm pet fees, number or size limits, designated units, and whether dogs may be left unattended.</span></div></section>
  <section id="camp-pack"><span class="section-number">07</span><p class="camp-eyebrow">PACK & PREP</p><h2>Your coast-camping checklist.</h2><div class="camp-pack-grid"><div><img class="camp-pack-photo" src="public/images/camp-pack-comfort.webp" data-fallback-src="/images/camp-pack-comfort.webp" alt="Warm layers, waterproof boots, tent stakes, headlamp, and battery bank ready for coastal camping"><div class="camp-pack-copy"><h3>Camp comfort</h3><p>Windproof shell and warm layer</p><p>Dry socks and waterproof footwear</p><p>Ground tarp, extra stakes, and mallet</p><p>Headlamps and battery bank</p></div></div><div><img class="camp-pack-photo" src="public/images/camp-pack-rv-trailer.webp" data-fallback-src="/images/camp-pack-rv-trailer.webp" alt="Travel trailer, utility trailer, wheel chocks, hookups, and roadside gear at a coastal campsite"><div class="camp-pack-copy"><h3>RV & trailer</h3><p>Wheel chocks and leveling blocks</p><p>Trailer lock and spare keys</p><p>Power, water, and sewer adapters</p><p>Tire gauge and roadside kit</p></div></div><div><img class="camp-pack-photo" src="public/images/camp-pack-safety.webp" data-fallback-src="/images/camp-pack-safety.webp" alt="First aid, fire extinguisher, maps, water, food, trash bags, and sealed fuel prepared for camp"><div class="camp-pack-copy"><h3>Safety & stewardship</h3><p>First aid and fire extinguisher</p><p>Paper map and offline reservations</p><p>Water, food, and emergency contacts</p><p>Trash bags and sealed fuel storage</p></div></div></div><div class="camp-official-links"><a href="https://stateparks.oregon.gov/index.cfm?do=reserve.make" target="_blank" rel="noreferrer"><b>Oregon State Parks reservations</b><span>State parks, yurts, and cabins ↗</span></a><a href="https://www.fs.usda.gov/r06/siuslaw/recreation/oregon-dunes-national-recreation-area-south" target="_blank" rel="noreferrer"><b>Forest Service camping guide</b><span>Campgrounds, alerts, and access ↗</span></a><a href="https://co.coos.or.us/riley-ranch" target="_blank" rel="noreferrer"><b>Riley Ranch County Park</b><span>Reservable OHV camping and direct dune access ↗</span></a></div></section>
  </div></div><section class="chapter-nav"><div class="shell"><div><small>NEXT STEP</small><h2>Turn your campsite into a complete trip.</h2></div><a class="button ink" href="planner.html">Build a personal plan ↗</a></div></section>`;
}
function renderTownsGuide(page){
  const gateways=[
    ["01","Florence","Best all-around first base","Old Town, lakes, lodging, groceries, and north-dunes access.","place-florence-harbor.webp","#town-florence"],
    ["02","Winchester Bay & Reedsport","Best for a focused riding trip","Harbor camping and Umpqua Dunes access, backed by Reedsport services.","place-winchester-bay.webp","#town-winchester"],
    ["03","Lakeside","Best for lake-and-dunes balance","A quieter freshwater base near paddling, fishing, and central-south access.","place-lakeside-tenmile.webp","#town-lakeside"],
    ["04","Coos Bay & North Bend","Best full-service south base","The widest choice of stores, repairs, lodging, dining, and south-dunes access.","place-coos-bay.webp","#town-coos"]
  ];
  const gatewayCards=gateways.map(card=>`<a class="towns-gateway-card" href="${card[5]}"><img class="towns-gateway-photo" src="public/images/${card[4]}" data-fallback-src="/images/${card[4]}" alt="" aria-hidden="true"><span>${card[0]} &middot; ${card[2]}</span><h3>${card[1]}</h3><p>${card[3]}</p><b>Explore this base &darr;</b></a>`).join("");
  return `<section class="guide-hero guide-hero-towns"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>Choose the town that fits your trip.</h1><p>Each Oregon Dunes gateway has a different rhythm. Compare the places to sleep, stock up, eat well, reach the sand, and fill a weather-change day.</p><div class="towns-hero-actions"><a class="button light" href="#town-compare">Compare the towns</a><a class="button sand" href="planner.html">Build my trip</a></div></div></section>
  <section class="towns-snapshot shell" aria-label="Town guide highlights"><article><span>01</span><b>Choose your base</b><small>Match the town to the trip</small></article><article><span>02</span><b>Know the drive</b><small>Sand, lake, harbor, or services</small></article><article><span>03</span><b>Plan the stops</b><small>Fuel, food, parking, and supplies</small></article><article><span>04</span><b>Keep a backup</b><small>Make weather changes easy</small></article></section>
  <div class="guide-layout towns-guide-layout shell"><aside class="guide-toc"><p>IN THIS GUIDE</p><a href="#town-compare"><span>01</span>Find your best base</a><a href="#town-florence"><span>02</span>Florence</a><a href="#town-winchester"><span>03</span>Winchester Bay & Reedsport</a><a href="#town-lakeside"><span>04</span>Lakeside</a><a href="#town-coos"><span>05</span>Coos Bay & North Bend</a><a href="#town-arrival"><span>06</span>Arrival-day essentials</a></aside>
  <div class="guide-content towns-content">
    <section id="town-compare"><span class="section-number">01</span><p class="towns-eyebrow">START WITH THE EXPERIENCE</p><h2>Four useful bases. No wrong coast.</h2><p class="towns-lead">Do not choose only by mileage. Pick the base that makes the rest of your group happy and gives your most important activity the easiest start.</p><div class="towns-gateway-grid">${gatewayCards}</div><aside class="towns-tip"><b>Quick match:</b><p>Choose <strong>Florence</strong> for variety, <strong>Winchester Bay/Reedsport</strong> for a riding-first weekend, <strong>Lakeside</strong> for freshwater time, or <strong>Coos Bay/North Bend</strong> for the deepest service bench.</p></aside></section>
    <section id="town-florence" class="towns-feature"><img class="towns-feature-photo" src="public/images/place-florence-harbor.webp" data-fallback-src="/images/place-florence-harbor.webp" alt="Boats and waterfront buildings at Florence Harbor"><div class="towns-feature-copy"><span class="section-number">02</span><p class="towns-eyebrow">NORTH GATEWAY</p><h2>Florence</h2><p class="towns-lead">The easiest all-around choice for first visits and mixed-interest groups.</p><p>Florence combines Old Town dining and shopping with full-size groceries, lodging, fuel, rentals, freshwater lakes, Honeyman State Park, and access to the South Jetty-Siltcoos region.</p><div class="towns-fact-grid"><div><b>Best for</b><span>First visits, families, non-riders, and flexible weekends</span></div><div><b>Dunes access</b><span>South Jetty and Siltcoos staging are south and west of town</span></div><div><b>Weather backup</b><span>Old Town, museums, lakes, dining, and covered shopping</span></div><div><b>Parking note</b><span>Old Town has timed and height-restricted areas; trailers need extra planning</span></div></div><div class="towns-actions"><a href="https://florencechamber.com/" target="_blank" rel="noopener">Explore Florence businesses &nearr;</a><a href="https://www.ci.florence.or.us/918/4740/Old-Town-Parking" target="_blank" rel="noopener">Check Old Town parking &nearr;</a><a href="https://www.google.com/maps/search/?api=1&query=Florence%2C%20Oregon" target="_blank" rel="noopener">Open GPS directions &nearr;</a></div></div></section>
    <section id="town-winchester" class="towns-feature towns-feature-reverse"><img class="towns-feature-photo" src="public/images/place-winchester-bay.webp" data-fallback-src="/images/place-winchester-bay.webp" alt="Winchester Bay harbor and waterfront community"><div class="towns-feature-copy"><span class="section-number">03</span><p class="towns-eyebrow">CENTRAL GATEWAY</p><h2>Winchester Bay & Reedsport</h2><p class="towns-lead">Two neighboring towns make one strong riding base.</p><p>Winchester Bay puts the harbor, camping, staging, and Umpqua Dunes close together. Reedsport, about six miles inland, adds groceries, fuel, pharmacies, restaurants, and repair support.</p><div class="towns-fact-grid"><div><b>Best for</b><span>Riding-first weekends and groups that want a compact base</span></div><div><b>Dunes access</b><span>Umpqua Dunes staging and harbor-area campgrounds</span></div><div><b>Evening option</b><span>Harbor walks and seafood, with more choices in Reedsport</span></div><div><b>Planning note</b><span>Stock up in Reedsport before settling into Winchester Bay</span></div></div><div class="towns-actions"><a href="https://www.discoverwinchesterbay.com/sandguide" target="_blank" rel="noopener">Open the Winchester Bay sand guide &nearr;</a><a href="https://reedsportcc.org/lets-go/" target="_blank" rel="noopener">Explore Reedsport and Winchester Bay &nearr;</a><a href="riding-winchester-bay.html">Open the riding map &rarr;</a></div></div></section>
    <section id="town-lakeside" class="towns-feature"><img class="towns-feature-photo" src="public/images/place-lakeside-tenmile.webp" data-fallback-src="/images/place-lakeside-tenmile.webp" alt="Freshwater lake and wooded shoreline near Lakeside, Oregon"><div class="towns-feature-copy"><span class="section-number">04</span><p class="towns-eyebrow">LAKE COUNTRY</p><h2>Lakeside</h2><p class="towns-lead">A slower base for paddling, fishing, camping, and sand.</p><p>Lakeside sits beside Tenmile Lakes between the central and southern dune areas. It works well when the trip needs freshwater recreation, smaller-town pace, and access to both the dunes and Highway 101 services.</p><div class="towns-fact-grid"><div><b>Best for</b><span>Lake days, fishing, paddling, cabins, and quieter stays</span></div><div><b>Dunes access</b><span>Near Eel Creek, Spinreel, and central-south approaches</span></div><div><b>Town scale</b><span>Useful basics nearby; plan larger supply runs in Reedsport or North Bend</span></div><div><b>Weather backup</b><span>Sheltered lake coves can offer a different day than exposed open sand</span></div></div><div class="towns-actions"><a href="https://www.cityoflakeside.org/administration/page/visitor-information" target="_blank" rel="noopener">Open Lakeside visitor information &nearr;</a><a href="https://traveloregon.com/places-to-go/cities/lakeside/" target="_blank" rel="noopener">Explore Lakeside activities &nearr;</a><a href="https://www.google.com/maps/search/?api=1&query=Lakeside%2C%20Oregon" target="_blank" rel="noopener">Open GPS directions &nearr;</a></div></div></section>
    <section id="town-coos" class="towns-feature towns-feature-reverse"><img class="towns-feature-photo" src="public/images/place-coos-bay.webp" data-fallback-src="/images/place-coos-bay.webp" alt="Aerial view of Coos Bay and its waterfront"><div class="towns-feature-copy"><span class="section-number">05</span><p class="towns-eyebrow">SOUTH GATEWAY</p><h2>Coos Bay & North Bend</h2><p class="towns-lead">The strongest service base for the southern riding network.</p><p>These neighboring cities offer the coast's broadest mix of large groceries, lodging, restaurants, medical care, machine parts, repairs, and rainy-day options. North Bend is closest to Horsfall; Coos Bay expands the choices.</p><div class="towns-fact-grid"><div><b>Best for</b><span>Longer stays, larger groups, repairs, and full-service convenience</span></div><div><b>Dunes access</b><span>Horsfall, Hauser, Riley Ranch, and Spinreel approaches</span></div><div><b>Beyond the sand</b><span>Waterfronts, museums, Charleston, and the Cape Arago corridor</span></div><div><b>Planning note</b><span>Allow extra drive time between lodging, staging, and coastal attractions</span></div></div><div class="towns-actions"><a href="https://www.coosbayor.gov/visit" target="_blank" rel="noopener">Visit Coos Bay &nearr;</a><a href="https://www.oregonsadventurecoast.com/" target="_blank" rel="noopener">Explore Oregon's Adventure Coast &nearr;</a><a href="riding-coos-bay.html">Open the riding map &rarr;</a></div></div></section>
    <section id="town-arrival"><span class="section-number">06</span><p class="towns-eyebrow">BEFORE YOU SETTLE IN</p><h2>Handle the practical stops while it is easy.</h2><p class="towns-lead">A good arrival day protects the rest of the trip. Fuel the tow vehicle and machines, buy forgotten groceries, save directions, and confirm where a trailer can actually fit.</p><div class="towns-arrival-grid"><article><span>01</span><h3>Fuel before staging</h3><p>Top off in the gateway town. Station availability gets thinner near remote access roads.</p><a href="gas.html">Open the gas guide &rarr;</a></article><article><span>02</span><h3>Park the whole rig</h3><p>Check height, length, trailer, and time limits before entering a downtown lot or narrow waterfront street.</p><a href="maps.html">Find staging and towns &rarr;</a></article><article><span>03</span><h3>Save the details</h3><p>Download reservation confirmations, maps, addresses, and contact numbers before service fades.</p><a href="weather.html">Check current weather &rarr;</a></article><article><span>04</span><h3>Let the planner sort it</h3><p>Match lodging, meals, lake time, riding, dogs, and group selections into one shareable trip.</p><a href="planner.html">Build a personal plan &rarr;</a></article></div><p class="towns-source-note"><strong>Verify before you go:</strong> Coastal business hours, parking rules, road access, and seasonal services can change. Use the linked official and local sources for current details.</p></section>
  </div></div>
  <section class="towns-planner-cta"><div class="shell"><div><small>READY TO CHOOSE?</small><h2>Turn the right town into your trip.</h2><p>Select your dates, group, stay, activities, meals, and transportation. The planner keeps only the options that fit.</p></div><a class="button sand" href="planner.html">Open the trip planner &nearr;</a></div></section>`;
}
function renderWildlifeGuide(page){
  const habitats=[
    ["OPEN SAND","Beach & foredune","Nesting shorebirds depend on quiet, open dry sand that can look empty to visitors.","wildlife-snowy-plover.webp","#wildlife-plover"],
    ["FRESH WATER","Lakes & wetlands","Reeds, shallow water, and forested lake edges support waterfowl, herons, amphibians, and fish.","wildlife-wetland-heron.webp","#wildlife-wetlands"],
    ["FOREST EDGE","Shore pine & meadow","The transition from forest to grass and wet meadow creates cover, forage, and travel corridors.","place-dean-creek-elk.webp","#wildlife-elk"],
    ["TIDE MEETS LAND","Estuary & rocky coast","Mudflats, channels, offshore rocks, and headlands concentrate birds and marine mammals.","wildlife-harbor-seals.webp","#wildlife-marine"]
  ];
  const habitatCards=habitats.map(card=>`<a class="wildlife-habitat-card" href="${card[4]}"><img class="wildlife-habitat-photo" src="public/images/${card[3]}" data-fallback-src="/images/${card[3]}" alt="" aria-hidden="true"><span>${card[0]}</span><h3>${card[1]}</h3><p>${card[2]}</p><b>Explore the habitat &darr;</b></a>`).join("");
  return `<section class="guide-hero guide-hero-wildlife"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>Wild country hides in plain sight.</h1><p>Beach, open sand, freshwater lakes, wetlands, shore-pine forest, and estuaries meet along one remarkable stretch of coast. Slow down and the landscape starts moving.</p><div class="wildlife-hero-actions"><a class="button light" href="#wildlife-habitats">Explore the habitats</a><a class="button sand" href="planner.html">Plan a wildlife day</a></div></div></section>
  <section class="wildlife-snapshot shell" aria-label="Wildlife guide highlights"><article><span>01</span><b>Read the habitat</b><small>Know where to look</small></article><article><span>02</span><b>Bring distance</b><small>Binoculars beat footsteps</small></article><article><span>03</span><b>Choose quiet hours</b><small>Morning and calm weather help</small></article><article><span>04</span><b>Respect closures</b><small>Signs protect real nesting areas</small></article></section>
  <div class="guide-layout wildlife-guide-layout shell"><aside class="guide-toc"><p>IN THIS GUIDE</p><a href="#wildlife-habitats"><span>01</span>The habitat mosaic</a><a href="#wildlife-plover"><span>02</span>Western snowy plover</a><a href="#wildlife-elk"><span>03</span>Roosevelt elk</a><a href="#wildlife-wetlands"><span>04</span>Lakes & wetlands</a><a href="#wildlife-marine"><span>05</span>Estuaries & marine life</a><a href="#wildlife-where"><span>06</span>Where to watch</a><a href="#wildlife-fieldcraft"><span>07</span>Wildlife fieldcraft</a></aside>
  <div class="guide-content wildlife-content">
    <section id="wildlife-habitats"><span class="section-number">01</span><p class="wildlife-eyebrow">A LANDSCAPE OF EDGES</p><h2>One coast. Four different worlds.</h2><p class="wildlife-lead">The dunes are more than open sand. The richest viewing often happens where two habitats meet: sand and forest, fresh and salt water, meadow and wetland, ocean and rock.</p><div class="wildlife-habitat-grid">${habitatCards}</div><aside class="wildlife-observation-note"><b>Look for behavior, not a checklist.</b><p>Feeding, resting, calling, migration, and changing tides tell a better story than chasing a guaranteed sighting. Wildlife is never scheduled, and that is part of the experience.</p></aside></section>

    <section id="wildlife-plover" class="wildlife-feature"><img class="wildlife-feature-photo" src="public/images/wildlife-snowy-plover.webp" data-fallback-src="/images/wildlife-snowy-plover.webp" alt="Western snowy plover standing on open coastal sand"><div class="wildlife-feature-copy"><span class="section-number">02</span><p class="wildlife-eyebrow">SMALL BIRD, IMPORTANT SAND</p><h2>Western snowy plover</h2><p class="wildlife-lead">The open beach is habitat, even when it looks bare.</p><p>Western snowy plovers nest and raise chicks on exposed dry sand. Eggs and chicks are exceptionally difficult to see, which is why ropes, signs, seasonal closures, and designated access routes matter.</p><div class="wildlife-fact-grid"><div><b>Where to look</b><span>From legal wet-sand routes, developed overlooks, and outside marked nesting areas</span></div><div><b>What to notice</b><span>A tiny pale shorebird that blends into sand and moves in quick starts and stops</span></div><div><b>Give it room</b><span>If a bird changes direction, calls repeatedly, crouches, or moves away, increase your distance</span></div><div><b>With dogs</b><span>Use only pet-appropriate access and follow the exact restrictions posted at that beach</span></div></div><div class="wildlife-actions"><a href="https://www.fws.gov/office/oregon-fish-and-wildlife" target="_blank" rel="noopener">Check current plover-season guidance &nearr;</a><a href="https://www.fs.usda.gov/r06/siuslaw/alerts" target="_blank" rel="noopener">Open current Siuslaw closures &nearr;</a><a href="rules.html">Review habitat rules &rarr;</a></div></div></section>

    <section id="wildlife-elk" class="wildlife-feature wildlife-feature-reverse"><img class="wildlife-feature-photo" src="public/images/place-dean-creek-elk.webp" data-fallback-src="/images/place-dean-creek-elk.webp" alt="Roosevelt elk beside wetland and coastal dunes"><div class="wildlife-feature-copy"><span class="section-number">03</span><p class="wildlife-eyebrow">FOREST, MEADOW & RIVER</p><h2>Roosevelt elk</h2><p class="wildlife-lead">A reliable viewing stop sits just east of Reedsport.</p><p>Dean Creek Elk Viewing Area protects wet meadow and pasture beside Highway 38. Its developed viewing areas make it possible to watch wild Roosevelt elk without walking into their space.</p><div class="wildlife-fact-grid"><div><b>Best starting point</b><span>Main viewing area and signed pullouts at Dean Creek</span></div><div><b>When to try</b><span>Quiet mornings and evenings often reward patient observers</span></div><div><b>Stay behind barriers</b><span>Elk are powerful wild animals; never feed or approach them</span></div><div><b>Trailer-friendly</b><span>The official site describes pull-through spaces for oversized vehicles</span></div></div><div class="wildlife-actions"><a href="https://www.blm.gov/visit/dean-creek-elk-viewing-area" target="_blank" rel="noopener">Open the official Dean Creek guide &nearr;</a><a href="https://www.blm.gov/documents/oregon-washington/public-room/map/oregon-dean-creek-elk-viewing-area" target="_blank" rel="noopener">Download the georeferenced map &nearr;</a><a href="https://www.google.com/maps/search/?api=1&query=Dean%20Creek%20Elk%20Viewing%20Area" target="_blank" rel="noopener">Open GPS directions &nearr;</a></div></div></section>

    <section id="wildlife-wetlands" class="wildlife-feature"><img class="wildlife-feature-photo" src="public/images/wildlife-wetland-heron.webp" data-fallback-src="/images/wildlife-wetland-heron.webp" alt="Great blue heron at a freshwater wetland near coastal dunes"><div class="wildlife-feature-copy"><span class="section-number">04</span><p class="wildlife-eyebrow">FRESHWATER EDGES</p><h2>Lakes & wetlands</h2><p class="wildlife-lead">Still water makes small movements easier to notice.</p><p>The dune lakes, reed beds, forest ponds, and wet swales support herons, waterfowl, kingfishers, raptors, amphibians, and many quieter species. Watch from established shorelines and launches instead of pushing through vegetation.</p><div class="wildlife-fact-grid"><div><b>Florence region</b><span>Cleawox, Woahink, Sutton, and Siltcoos lake edges</span></div><div><b>Central region</b><span>Tahkenitch, Eel, and Tenmile-area freshwater habitats</span></div><div><b>What to bring</b><span>Binoculars, a warm layer, quiet footwear, and a dry place for optics</span></div><div><b>Best technique</b><span>Stop, scan edges, listen, and let the scene settle before moving again</span></div></div><div class="wildlife-actions"><a href="day-use.html">Compare developed day-use stops &rarr;</a><a href="maps.html">Open the regional map &rarr;</a><a href="planner.html">Add lakes and wildlife to a trip &rarr;</a></div></div></section>

    <section id="wildlife-marine" class="wildlife-feature wildlife-feature-reverse"><img class="wildlife-feature-photo" src="public/images/wildlife-harbor-seals.webp" data-fallback-src="/images/wildlife-harbor-seals.webp" alt="Harbor seals resting on offshore rocks along the Oregon coast"><div class="wildlife-feature-copy"><span class="section-number">05</span><p class="wildlife-eyebrow">ESTUARY TO OPEN OCEAN</p><h2>Marine life from shore</h2><p class="wildlife-lead">The safest view is often the best view.</p><p>Estuary channels, headlands, and offshore rocks offer distant looks at seals, sea lions, whales, and seabirds. Use established overlooks and never approach a marine mammal resting on a beach or haul-out.</p><div class="wildlife-fact-grid"><div><b>South Slough</b><span>Forests, salt marshes, mudflats, channels, trails, and a visitor center</span></div><div><b>Simpson Reef</b><span>Offshore wildlife colonies viewed from developed Cape Arago-area overlooks</span></div><div><b>Whale season</b><span>Headlands can reward patient scanning during migration periods</span></div><div><b>Important closure</b><span>Cape Arago's north cove trail has a seasonal seal-pup protection closure</span></div></div><div class="wildlife-actions"><a href="https://www.oregon.gov/dsl/ss/pages/visiting.aspx" target="_blank" rel="noopener">Visit South Slough Reserve &nearr;</a><a href="https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=66" target="_blank" rel="noopener">Check Cape Arago conditions &nearr;</a><a href="tides.html">Plan around the tide &rarr;</a></div></div></section>

    <section id="wildlife-where"><span class="section-number">06</span><p class="wildlife-eyebrow">NORTH TO SOUTH</p><h2>Three easy wildlife detours.</h2><p class="wildlife-lead">Add one developed viewing stop to the day instead of trying to cover the entire coast.</p><div class="wildlife-region-grid"><article><span>NORTH</span><h3>Florence lakes & estuary</h3><p>Pair a quiet lake edge or developed dune overlook with Old Town and the Siuslaw estuary. Good for a mixed group that wants wildlife without a long detour.</p><div><b>Try:</b> Honeyman lake edges, Sutton area, Siltcoos, or an open developed viewpoint</div><a href="https://www.google.com/maps/search/?api=1&query=wildlife%20viewing%20Florence%20Oregon" target="_blank" rel="noopener">Open Florence-area GPS &nearr;</a></article><article><span>CENTRAL</span><h3>Dean Creek & Umpqua</h3><p>Combine the developed elk viewing area east of Reedsport with the Umpqua estuary or lighthouse country near Winchester Bay.</p><div><b>Try:</b> Dean Creek first, then a harbor or estuary stop if weather stays calm</div><a href="https://www.blm.gov/visit/dean-creek-elk-viewing-area" target="_blank" rel="noopener">Open Dean Creek &nearr;</a></article><article><span>SOUTH</span><h3>South Slough & Cape Arago</h3><p>Forest trails, salt marsh, mudflats, tide-dependent waterways, headland viewpoints, and offshore marine life make this the deepest wildlife day.</p><div><b>Try:</b> South Slough trails, then Shore Acres or Cape Arago overlooks</div><a href="https://www.oregon.gov/dsl/ss" target="_blank" rel="noopener">Open South Slough &nearr;</a></article></div></section>

    <section id="wildlife-fieldcraft"><span class="section-number">07</span><p class="wildlife-eyebrow">WATCH WITHOUT CHANGING THE SCENE</p><h2>Good wildlife fieldcraft is wonderfully simple.</h2><div class="wildlife-field-grid"><article><span>01</span><h3>Start quiet</h3><p>Turn voices and vehicle noise down before reaching the viewpoint. Scan first; move second.</p></article><article><span>02</span><h3>Use optics</h3><p>Binoculars or a long lens create a better view without turning distance into disturbance.</p></article><article><span>03</span><h3>Read behavior</h3><p>If an animal stops feeding, watches you continuously, calls, retreats, or changes direction, back away.</p></article><article><span>04</span><h3>Leave young wildlife</h3><p>Do not touch or move an animal that appears alone. Report genuine concerns to the appropriate wildlife authority.</p></article><article><span>05</span><h3>Protect the edges</h3><p>Stay on established routes and overlooks. Reeds, wrack lines, mudflats, and dry sand can all be active habitat.</p></article><article><span>06</span><h3>Pack every scrap</h3><p>Food waste changes wildlife behavior. Carry out crumbs, fishing line, and every piece of trash.</p></article></div><aside class="wildlife-current"><div><span>BEFORE YOU GO</span><h3>Check closures, weather, and tides together.</h3><p>A beautiful viewing stop can be inaccessible, unsafe, or protected on the day you arrive. The planner can keep a sheltered backup in the same region.</p></div><div><a href="weather.html">Weather &rarr;</a><a href="tides.html">Tides &rarr;</a><a href="planner.html">Trip planner &rarr;</a></div></aside></section>
  </div></div>
  <section class="wildlife-planner-cta"><div class="shell"><div><small>BUILD A QUIETER DAY</small><h2>Let the coast set the pace.</h2><p>Add wildlife, lakes, nearby towns, meals, lodging, and a weatherproof backup to one shareable plan.</p></div><a class="button sand" href="planner.html">Plan a wildlife day &nearr;</a></div></section>`;
}
function renderSafetyGuide(page){
  const safetyCards=[
    ["01","READ THE TERRAIN","Dune reading","Sharp slip faces, deep depressions, and changing sand can hide until the last moment.","riding-05-dune-reading.webp","#safety-terrain"],
    ["02","STAY CONNECTED","Group protocol","A lead, a sweep, generous spacing, and a buddy at every turn keep the group together.","riding-06-group-protocol.webp","#safety-group"],
    ["03","PROTECT THE NEWEST RIDER","Youth & beginners","The least-experienced rider sets the pace, with proper training, fit, gear, and supervision.","hero-safety-v2.webp","#safety-youth"],
    ["04","PLAN FOR THE STOP","Recovery & response","Carry the location, communication, first-aid, and recovery tools needed when the ride stops.","riding-04-checklist.webp","#safety-response"]
  ];
  const cards=safetyCards.map(card=>`<a class="safety-principle-card" href="${card[5]}"><img src="public/images/${card[4]}" data-fallback-src="/images/${card[4]}" alt="" aria-hidden="true"><span>${card[0]} &middot; ${card[1]}</span><h3>${card[2]}</h3><p>${card[3]}</p><b>Open this field note &darr;</b></a>`).join("");
  return `<section class="guide-hero guide-hero-safety"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>Come home with the whole crew.</h1><p>The dunes reward preparation, clear communication, and enough margin to change the plan. Use this fieldbook before the engine starts and whenever the group needs to reset.</p><div class="safety-hero-actions"><a class="button light" href="#safety-system">Open the fieldbook</a><a class="button sand" href="planner.html">Build a safer trip</a></div></div></section>
  <section class="safety-snapshot shell" aria-label="Safety fieldbook highlights"><article><span>01</span><b>Look farther ahead</b><small>Never outride what you can see</small></article><article><span>02</span><b>Assign lead & sweep</b><small>Everyone stays accounted for</small></article><article><span>03</span><b>Carry the location</b><small>Map, landmarks, and coordinates</small></article><article><span>04</span><b>Leave a trip plan</b><small>Tell someone where to look</small></article></section>
  <div class="guide-layout safety-guide-layout shell"><aside class="guide-toc"><p>IN THIS FIELDBOOK</p><a href="#safety-system"><span>01</span>The safety system</a><a href="#safety-terrain"><span>02</span>Read the dune</a><a href="#safety-group"><span>03</span>Keep the group connected</a><a href="#safety-youth"><span>04</span>Youth & new riders</a><a href="#safety-response"><span>05</span>Breakdown or injury</a><a href="#safety-kit"><span>06</span>What to carry</a><a href="#safety-sources"><span>07</span>Official sources</a></aside>
  <div class="guide-content safety-content">
    <section id="safety-system"><span class="section-number">01</span><p class="safety-eyebrow">FOUR THINGS HOLD THE DAY TOGETHER</p><h2>Safety is a system, not a speech.</h2><p class="safety-lead">Good gear matters. So do readable terrain, a connected group, a plan for the newest rider, and a calm response when something changes.</p><div class="safety-principle-grid">${cards}</div><aside class="safety-reset"><b>Use the reset rule.</b><p>If visibility, wind, traffic, fatigue, machine condition, or group confidence changes, stop somewhere visible and safe. Regroup, reassess, and shorten the plan before pressure makes the choice for you.</p></aside></section>

    <section id="safety-terrain" class="safety-feature"><img class="safety-feature-photo" src="public/images/riding-05-dune-reading.webp" data-fallback-src="/images/riding-05-dune-reading.webp" alt="Rider slowing before a sharp Oregon dune crest"><div class="safety-feature-copy"><span class="section-number">02</span><p class="safety-eyebrow">READ BEFORE YOU COMMIT</p><h2>The other side is the part that matters.</h2><p class="safety-lead">Oregon says most ATV incidents in the state happen on dunes&mdash;and most are preventable.</p><div class="safety-hazard-grid"><article><b>Razorback / slip face</b><p>Do not charge straight over a sharp crest. Approach at an angle and slowly enough to scan the drop, traffic, and landing area.</p></article><article><b>Witch&rsquo;s eye</b><p>Deep depressions can hide in a slope. Read shadow and texture, slow early, and alert the riders behind you.</p></article><article><b>Dry-to-wet transition</b><p>Grip and steering can change quickly where sand moisture changes. Keep speed low enough to remain in control.</p></article><article><b>Limited sight distance</b><p>Never ride faster than the distance you can see and stop within. Wind, fog, dust, and crests all shrink that space.</p></article></div><div class="safety-actions"><a href="ohv-riding.html#section-4">Open the full dune-reading lesson &rarr;</a><a href="https://www.oregon.gov/oprd/ATV/Pages/ATV-need-to-know.aspx" target="_blank" rel="noopener">Read Oregon&rsquo;s official dune guidance &nearr;</a></div></div></section>

    <section id="safety-group"><span class="section-number">03</span><p class="safety-eyebrow">MAKE THE GROUP EASY TO FOLLOW</p><h2>Nobody becomes the missing rider.</h2><p class="safety-lead">Agree on the route, roles, signals, and regroup points before moving. Then make every turn understandable to the person behind you.</p><div class="safety-protocol-grid"><article><span>LEAD</span><h3>Set a sustainable pace.</h3><p>Scan ahead, stop where the whole group can gather, and let the least-experienced rider determine the speed.</p></article><article><span>SWEEP</span><h3>Stay last on purpose.</h3><p>Carry useful recovery gear, assist stopped riders, and confirm that nobody has been left behind.</p></article><article><span>SPACE</span><h3>Leave room to react.</h3><p>Use single file near blind terrain and in dust. A three-to-five-second gap is a useful minimum; add more when visibility worsens.</p></article><article><span>TURNS</span><h3>Be the next rider&rsquo;s signpost.</h3><p>At every uncertain turn, wait until the rider behind sees and completes it. If contact breaks, stop at the agreed regroup point.</p></article></div><aside class="safety-group-note"><div><b>A practical group rhythm</b><p>Five to seven riders is manageable for many crews. Split a larger gathering into smaller groups, each with its own lead, sweep, and meeting plan.</p></div><a class="button ink" href="ohv-riding.html#section-5">See the complete group protocol &rarr;</a></aside></section>

    <section id="safety-youth" class="safety-feature safety-feature-reverse"><img class="safety-feature-photo" src="public/images/hero-safety-v2.webp" data-fallback-src="/images/hero-safety-v2.webp" alt="Helmeted family group preparing their off-highway vehicles at the Oregon Dunes"><div class="safety-feature-copy"><span class="section-number">04</span><p class="safety-eyebrow">TRAINING, FIT, SUPERVISION</p><h2>Build confidence without adding pressure.</h2><p class="safety-lead">Young and first-time riders need a machine they can control, a low-consequence place to learn, and an adult close enough to help immediately.</p><div class="safety-youth-list"><p><b>Complete the right training.</b> Oregon requires an ATV Safety Education Card for all Class I and Class III operators. Youth under 16 also need hands-on training after the online course; Class IV operators under 16 need the card as well.</p><p><b>Use rider fit, not age alone.</b> A young rider must be able to reach and operate the controls and manage the machine without stretching or shifting position.</p><p><b>Supervise from where help is possible.</b> Operators under 16 must be supervised by an adult age 18 or older who holds a valid ATV Safety Education Card and can provide immediate direction and assistance.</p><p><b>Create an adult buffer.</b> Let an experienced adult lead, place the young rider next, and use another experienced adult behind whenever possible. Choose quiet conditions and short loops.</p></div><div class="safety-actions"><a href="https://www.oregon.gov/oprd/atv/pages/atv-youth-riders.aspx" target="_blank" rel="noopener">Open Oregon&rsquo;s youth-rider guide &nearr;</a><a href="https://www.rideatvoregon.org/" target="_blank" rel="noopener">Start ATV safety training &nearr;</a></div></div></section>

    <section id="safety-response"><span class="section-number">05</span><p class="safety-eyebrow">WHEN THE RIDE STOPS</p><h2>Slow the scene down before solving it.</h2><div class="safety-response-banner"><div><span>CALL 911</span><h3>Serious injury or immediate danger?</h3><p>Call 911 when service is available. Give the riding region, nearest named staging area or landmark, phone or GPS coordinates if available, what happened, and how many people and vehicles are involved.</p></div><a href="tel:911" aria-label="Call 911 in an emergency">Emergency: call 911</a></div><div class="safety-response-grid"><article><span>01</span><h3>Secure the scene</h3><p>Stop the group somewhere visible and out of the travel line. Prevent another rider from entering the hazard area.</p></article><article><span>02</span><h3>Account for everyone</h3><p>Confirm names, injuries, machines, and the last known location. Do not scatter uncoordinated riders into a search.</p></article><article><span>03</span><h3>Share one clear location</h3><p>Use the official map, a named landmark, staging area, trail marker, and coordinates together. Cell coverage may be limited.</p></article><article><span>04</span><h3>Keep the plan coordinated</h3><p>Stay with an injured person unless leaving is necessary to obtain help. Send help according to one agreed plan and preserve battery power.</p></article></div><aside class="safety-breakdown"><img src="public/images/riding-04-checklist.webp" data-fallback-src="/images/riding-04-checklist.webp" alt="OHV rider checking tools and recovery equipment"><div><span>MECHANICAL BREAKDOWN</span><h3>Recovery should not create a second emergency.</h3><p>Move out of the traffic line if it can be done safely, make the stopped machine visible, and use equipment rated for the job. Do not improvise a high-risk pull on a steep face. If the group cannot recover the machine safely, return with appropriate help.</p></div></aside></section>

    <section id="safety-kit"><span class="section-number">06</span><p class="safety-eyebrow">PACK FOR THE UNPLANNED HOUR</p><h2>The essentials belong with the riders.</h2><p class="safety-lead">A beautifully packed truck at staging cannot help a group that is several dunes away.</p><div class="safety-kit-grid"><article><img src="public/images/hero-safety-v2.webp" data-fallback-src="/images/hero-safety-v2.webp" alt=""><div><span>PEOPLE</span><h3>Protective & first aid</h3><ul><li>DOT-certified helmet, goggles, gloves, long sleeves, long pants, and over-the-ankle boots</li><li>First-aid kit, personal medications, water, snacks, and emergency blanket</li><li>Coastal layers and eye protection suited to current light</li></ul></div></article><article><img src="public/images/riding-04-checklist.webp" data-fallback-src="/images/riding-04-checklist.webp" alt=""><div><span>MACHINE</span><h3>Repair & recovery</h3><ul><li>Basic tools, tire repair, gauge, spare essentials, and an appropriately rated tow strap</li><li>Visible red or orange whip flag, inspected controls, lights, tires, and secure fuel</li><li>Equipment required for the machine, rider, season, and riding area</li></ul></div></article><article><img src="public/images/hero-maps.webp" data-fallback-src="/images/hero-maps.webp" alt=""><div><span>LOCATION</span><h3>Navigation & communication</h3><ul><li>Downloaded official map or paper map plus a compass or GPS-capable device</li><li>Charged phone or radio and a battery bank; coverage may be limited</li><li>Trip plan shared with someone at home, including the region and return time</li></ul></div></article></div><aside class="safety-rule-link"><div><span>LEGAL EQUIPMENT IS COVERED ELSEWHERE</span><h3>Use the Rules page for permits, cards, flags, helmets, lights, sound, and current official requirements.</h3></div><a class="button ink" href="rules.html">Open Rules & Regulations &rarr;</a></aside></section>

    <section id="safety-sources"><span class="section-number">07</span><p class="safety-eyebrow">VERIFY BEFORE THE WHEELS TURN</p><h2>Open the sources that make the call.</h2><p class="safety-lead">This fieldbook organizes the decisions. Oregon and the Forest Service set the requirements, closures, and access conditions.</p><div class="safety-source-grid"><a href="https://www.oregon.gov/oprd/ATV/Pages/ATV-need-to-know.aspx" target="_blank" rel="noopener"><span>OREGON PARKS</span><h3>Need to Know</h3><p>Dune hazards, preparation, protective gear, and safe riding practices.</p><b>Open official guidance &nearr;</b></a><a href="https://www.oregon.gov/oprd/atv/pages/atv-youth-riders.aspx" target="_blank" rel="noopener"><span>OREGON PARKS</span><h3>Youth Riders</h3><p>Training, rider fit, adult supervision, and youth-specific requirements.</p><b>Open youth guidance &nearr;</b></a><a href="https://www.oregon.gov/oprd/ATV/Documents/ATV-Guide-2026_2027_web.pdf" target="_blank" rel="noopener"><span>2026&ndash;2027</span><h3>Oregon ATV Guide</h3><p>The current statewide guide to permits, cards, equipment, and riding areas.</p><b>Open the PDF &nearr;</b></a><a href="https://www.fs.usda.gov/r06/siuslaw/recreation/opportunities/highway-vehicles-ohv" target="_blank" rel="noopener"><span>FOREST SERVICE</span><h3>Siuslaw OHV Hub</h3><p>Oregon Dunes riding areas, staging, permits, and Forest Service requirements.</p><b>Open the OHV hub &nearr;</b></a><a href="https://www.fs.usda.gov/r06/siuslaw/alerts" target="_blank" rel="noopener"><span>BEFORE DEPARTURE</span><h3>Current Alerts</h3><p>Closures, restrictions, access changes, and notices for the Siuslaw National Forest.</p><b>Check current alerts &nearr;</b></a><a href="maps.html"><span>OREGON DUNES GUIDE</span><h3>Maps & Staging</h3><p>Choose a region, find named starting points, and open official riding maps.</p><b>Open the map &rarr;</b></a></div></section>
  </div></div>
  <section class="safety-planner-cta"><div class="shell"><div><small>TURN PREPARATION INTO A PLAN</small><h2>Give the whole crew the same information.</h2><p>Add the region, lodging, activities, meals, and selected stops to one plan that can be printed or shared before departure.</p></div><a class="button sand" href="planner.html">Build the group plan &nearr;</a></div></section>`;
}
function renderConditionsGuide(page){
  const regionCards=[
    ["florence","01","FLORENCE","South Jetty & Siltcoos","place-south-jetty.webp"],
    ["winchester","02","WINCHESTER BAY","Umpqua Dunes","place-umpqua-dunes.webp"],
    ["coos","03","COOS BAY","Spinreel & Horsfall","place-horsfall.webp"]
  ].map(region=>`<article class="conditions-region-card conditions-region-${region[0]}"><img src="public/images/${region[4]}" data-fallback-src="/images/${region[4]}" alt="" aria-hidden="true"><div><span>${region[1]} &middot; ${region[2]}</span><h3>${region[3]}</h3><strong data-condition-temp="${region[0]}">--&deg;</strong><p data-condition-summary="${region[0]}">Loading current weather&hellip;</p><small data-condition-detail="${region[0]}">Wind, gusts, and rain will appear here.</small></div></article>`).join("");
  return `<section class="guide-hero guide-hero-conditions"><div class="shell"><p class="kicker">${page.eyebrow}</p><h1>Check what changed<br><i>before the coast.</i></h1><p>Weather is only one part of a go/no-go decision. Check official access notices, roads, fire restrictions, air quality, beach closures, and your exact recreation site before leaving pavement.</p><div class="conditions-hero-actions"><a class="button light" href="#conditions-board">Open today&rsquo;s board</a><a class="button sand" href="planner.html">Update the trip plan</a></div></div></section>
  <section class="conditions-snapshot shell" aria-label="Current conditions priorities"><article><span>01</span><b>Weather</b><small>Wind, rain, fog, and temperature</small></article><article><span>02</span><b>Access</b><small>Closures, staging, and beach routes</small></article><article><span>03</span><b>Travel</b><small>US 101, approach roads, and smoke</small></article><article><span>04</span><b>Site status</b><small>Campgrounds, day-use areas, and fees</small></article></section>
  <div class="guide-layout conditions-guide-layout shell"><aside class="guide-toc"><p>CHECK IN THIS ORDER</p><a href="#conditions-board"><span>01</span>Regional weather</a><a href="#conditions-official"><span>02</span>Official status board</a><a href="#conditions-decisions"><span>03</span>Change the plan when</a><a href="#conditions-sites"><span>04</span>Camp & staging status</a><a href="#conditions-morning"><span>05</span>Morning-of check</a><a href="#conditions-sources"><span>06</span>Primary sources</a></aside>
  <div class="guide-content conditions-content">
    <section id="conditions-board"><span class="section-number">01</span><p class="conditions-eyebrow">ONE COAST &middot; THREE REFERENCE POINTS</p><h2>Start with the region you will actually use.</h2><p class="conditions-lead">Town readings are planning references. Wind, fog, and visibility can feel very different on exposed sand, at a forest edge, or beside the beach.</p><div class="conditions-region-grid" aria-live="polite">${regionCards}</div><div class="conditions-weather-note"><div><span id="conditionsWeatherStatus">LIVE WEATHER LOADING</span><b id="conditionsWeatherUpdated">Connecting to the coastal forecast&hellip;</b></div><a href="weather.html">Open the full Weather Center &rarr;</a></div></section>

    <section id="conditions-official"><span class="section-number">02</span><p class="conditions-eyebrow">THE SOURCES THAT MAKE THE CALL</p><h2>Open the live status&mdash;not an old screenshot.</h2><p class="conditions-lead">This guide cannot declare a road, beach, trail, campground, or riding area open. These official pages carry the current notices.</p><div class="conditions-status-grid">
      <a class="conditions-status-card status-access" href="https://www.fs.usda.gov/r06/siuslaw/alerts" target="_blank" rel="noopener"><img src="public/images/hero-maps.webp" data-fallback-src="/images/hero-maps.webp" alt="" aria-hidden="true"><div><span>FOREST SERVICE</span><h3>Closures & access</h3><p>Oregon Dunes notices, temporary closures, restrictions, and affected recreation sites.</p><b>Open Siuslaw alerts &nearr;</b></div></a>
      <a class="conditions-status-card status-roads" href="https://tripcheck.com/" target="_blank" rel="noopener"><img src="public/images/place-reedsport-bridge.webp" data-fallback-src="/images/place-reedsport-bridge.webp" alt="" aria-hidden="true"><div><span>OREGON DOT</span><h3>Roads & cameras</h3><p>Incidents, construction, delays, weather warnings, and cameras on US 101 and approach routes.</p><b>Open TripCheck &nearr;</b></div></a>
      <a class="conditions-status-card status-fire" href="https://www.oregon.gov/ODF/Fire/Pages/Restrictions.aspx" target="_blank" rel="noopener"><img src="public/images/hero-rules-v2.webp" data-fallback-src="/images/hero-rules-v2.webp" alt="" aria-hidden="true"><div><span>OREGON FORESTRY</span><h3>Fire restrictions</h3><p>Use the location-aware map, then also check the Forest Service because land managers may differ.</p><b>Open the restrictions map &nearr;</b></div></a>
      <a class="conditions-status-card status-smoke" href="https://fire.airnow.gov/" target="_blank" rel="noopener"><img src="public/images/hero-weather.webp" data-fallback-src="/images/hero-weather.webp" alt="" aria-hidden="true"><div><span>AIRNOW</span><h3>Smoke & air quality</h3><p>Current particle pollution, fire locations, smoke plumes, and health guidance.</p><b>Open Fire & Smoke Map &nearr;</b></div></a>
    </div></section>

    <section id="conditions-decisions"><span class="section-number">03</span><p class="conditions-eyebrow">BUILD IN A SAFE EXIT</p><h2>Change the plan before conditions force it.</h2><div class="conditions-decision-grid"><article><span>WIND OR FOG</span><h3>Shorten the route.</h3><p>Choose sheltered terrain, keep the group closer, and turn around before landmarks disappear. Exposed dune wind can exceed town readings.</p><a href="weather.html">Check wind & visibility &rarr;</a></article><article><span>HIGH TIDE OR SURF</span><h3>Leave the beach out.</h3><p>A legal seasonal opening does not guarantee a passable beach. High water, driftwood, and surf can remove the safe travel corridor.</p><a href="tides.html">Check tide windows &rarr;</a></article><article><span>CLOSURE OR FIRE RULE</span><h3>Follow the current order.</h3><p>Do not route around a sign or rely on a saved map. Move to an officially open site or use a town, lake, or forest backup.</p><a href="rules.html">Review the rules &rarr;</a></article><article><span>ROAD OR SMOKE IMPACT</span><h3>Protect the drive home.</h3><p>Construction, crashes, wildfire smoke, and limited visibility can add hours or make trailering unsafe. Recheck before departure.</p><a href="planner.html">Open your backup plan &rarr;</a></article></div></section>

    <section id="conditions-sites"><span class="section-number">04</span><p class="conditions-eyebrow">YOUR EXACT DESTINATION</p><h2>Check the site page, not just the region.</h2><p class="conditions-lead">A riding area can remain open while one campground, trail, parking lot, or staging entrance is closed, flooded, full, or under repair.</p><div class="conditions-site-grid"><a href="https://www.fs.usda.gov/r06/siuslaw/recreation" target="_blank" rel="noopener"><span>FOREST SERVICE</span><h3>Recreation-site status</h3><p>Search the exact campground, trailhead, day-use area, or OHV destination and review its alerts.</p><b>Find a Siuslaw site &nearr;</b></a><a href="https://stateparks.oregon.gov/" target="_blank" rel="noopener"><span>OREGON STATE PARKS</span><h3>Park advisories</h3><p>Check the exact state park for notices, seasonal information, reservations, and operating details.</p><b>Open Oregon State Parks &nearr;</b></a><a href="https://www.recreation.gov/search?q=Oregon%20Dunes%20National%20Recreation%20Area" target="_blank" rel="noopener"><span>RECREATION.GOV</span><h3>Reservations & availability</h3><p>Review reservable federal campgrounds and save the current reservation information offline.</p><b>Search Oregon Dunes stays &nearr;</b></a></div><aside class="conditions-map-callout"><img src="public/images/hero-maps.webp" data-fallback-src="/images/hero-maps.webp" alt="Aerial view of the Oregon Dunes and coastal access routes"><div><span>NAME THE STARTING POINT</span><h3>Carry the staging area, map, and backup entrance.</h3><p>Do not tell the group only &ldquo;Florence&rdquo; or &ldquo;Coos Bay.&rdquo; Share the named staging area or campground and a second legal option.</p><a class="button ink" href="maps.html">Open maps & staging &rarr;</a></div></aside></section>

    <section id="conditions-morning"><span class="section-number">05</span><p class="conditions-eyebrow">TEN MINUTES BEFORE THE KEYS</p><h2>The morning-of conditions check.</h2><div class="conditions-checklist"><label><input type="checkbox"> Forest Service alerts opened and affected sites read</label><label><input type="checkbox"> Exact campground or staging page checked</label><label><input type="checkbox"> US 101 and the approach route checked on TripCheck</label><label><input type="checkbox"> Wind, gusts, rain, temperature, and visibility reviewed</label><label><input type="checkbox"> Tide and beach access checked if the plan reaches the shore</label><label><input type="checkbox"> Fire restrictions and smoke checked during fire season</label><label><input type="checkbox"> Official map downloaded and backup entrance named</label><label><input type="checkbox"> Group received the updated destination and return time</label></div><p class="conditions-reset"><b>Reset rule:</b> If one of these checks changes the route, update the shared plan before anyone leaves home. The wrong destination in a group text is still the wrong destination.</p></section>

    <section id="conditions-sources"><span class="section-number">06</span><p class="conditions-eyebrow">FRESHNESS MATTERS</p><h2>Know what is live&mdash;and what is guidance.</h2><div class="conditions-freshness"><article><span>LIVE FORECAST DATA</span><h3>Weather cards</h3><p>The three regional cards load current Open-Meteo readings when the page opens. They are useful planning references, not on-dune instruments.</p></article><article><span>LIVE OFFICIAL PAGES</span><h3>Status buttons</h3><p>Forest Service, TripCheck, Oregon Forestry, State Parks, and AirNow open their current systems. Read the update time and affected place.</p></article><article><span>PLANNING GUIDANCE</span><h3>Everything else here</h3><p>Decision notes and checklists help organize the trip. Posted signs, closure orders, and agency instructions always control.</p></article></div><div class="conditions-source-links"><a href="https://www.fs.usda.gov/r06/siuslaw/alerts" target="_blank" rel="noopener">Siuslaw alerts &nearr;</a><a href="https://tripcheck.com/" target="_blank" rel="noopener">TripCheck &nearr;</a><a href="https://www.oregon.gov/ODF/Fire/Pages/Restrictions.aspx" target="_blank" rel="noopener">Fire restrictions &nearr;</a><a href="https://fire.airnow.gov/" target="_blank" rel="noopener">Fire & Smoke Map &nearr;</a></div></section>
  </div></div>
  <section class="conditions-planner-cta"><div class="shell"><div><small>WHEN THE COAST CHANGES</small><h2>Change the plan, not the goal.</h2><p>Keep the lodging, meals, group picks, and safest available activities together in one updated itinerary.</p></div><a class="button sand" href="planner.html">Update the trip plan &nearr;</a></div></section>`;
}
function loadConditionsWeather(){
  const regions={
    florence:{lat:43.9826,lon:-124.0998},
    winchester:{lat:43.6776,lon:-124.1737},
    coos:{lat:43.3665,lon:-124.2179}
  };
  const codeLabel=code=>{
    if(code===0)return"Clear";
    if(code<=3)return"Cloudy";
    if(code===45||code===48)return"Fog";
    if(code<=57)return"Drizzle";
    if(code<=67)return"Rain";
    if(code<=77)return"Wintry";
    if(code<=82)return"Showers";
    return"Storm risk"
  };
  Promise.all(Object.entries(regions).map(async([key,region])=>{
    const url=new URL("https://api.open-meteo.com/v1/forecast");
    url.search=new URLSearchParams({latitude:String(region.lat),longitude:String(region.lon),current:"temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m",temperature_unit:"fahrenheit",wind_speed_unit:"mph",precipitation_unit:"inch",timezone:"America/Los_Angeles"}).toString();
    const response=await fetch(url);
    if(!response.ok)throw new Error("Weather unavailable");
    const data=await response.json(),current=data.current;
    document.querySelector(`[data-condition-temp="${key}"]`).textContent=`${Math.round(current.temperature_2m)}°`;
    document.querySelector(`[data-condition-summary="${key}"]`).textContent=`${codeLabel(Number(current.weather_code))} · feels like ${Math.round(current.apparent_temperature)}°`;
    document.querySelector(`[data-condition-detail="${key}"]`).textContent=`Wind ${Math.round(current.wind_speed_10m)} mph · gusts ${Math.round(current.wind_gusts_10m)} mph · rain ${Number(current.precipitation).toFixed(2)} in`;
    return current.time
  })).then(times=>{
    const updated=document.getElementById("conditionsWeatherUpdated"),status=document.getElementById("conditionsWeatherStatus");
    if(status)status.textContent="LIVE REGIONAL WEATHER";
    if(updated)updated.textContent=`Updated ${new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit"}).format(new Date(times[0]))} · Open-Meteo planning data`;
  }).catch(()=>{
    const status=document.getElementById("conditionsWeatherStatus"),updated=document.getElementById("conditionsWeatherUpdated");
    if(status)status.textContent="WEATHER DATA UNAVAILABLE";
    if(updated)updated.textContent="Open the Weather Center or National Weather Service before departure.";
    document.querySelectorAll("[data-condition-summary]").forEach(node=>node.textContent="Live weather did not load");
  })
}
function renderEnhancedGuide(){
  const key=document.body.dataset.topic||new URLSearchParams(location.search).get("topic")||"camping";
  if(key!=="camping"&&key!=="towns"&&key!=="wildlife"&&key!=="safety"&&key!=="conditions"){renderGuide();return}
  const root=document.getElementById("guideRoot");
  if(!root)return;
  document.title=key==="camping"?"Camping | Oregon Dunes Guide":key==="towns"?"Nearby Towns | Oregon Dunes Guide":key==="wildlife"?"Wildlife & Habitat | Oregon Dunes Guide":key==="conditions"?"Current Conditions | Oregon Dunes Guide":"Oregon Dunes Safety Fieldbook | Oregon Dunes Guide";
  root.innerHTML=key==="camping"?renderCampingGuide(chapters.camping):key==="towns"?renderTownsGuide(chapters.towns):key==="wildlife"?renderWildlifeGuide(chapters.wildlife):key==="conditions"?renderConditionsGuide(chapters.conditions):renderSafetyGuide(chapters.safety);
  if(key==="conditions")loadConditionsWeather();
  if(key==="safety"){
    root.querySelector("#safety-response .safety-response-banner")?.insertAdjacentHTML("afterend",`<aside class="safety-satellite">
      <div class="safety-satellite-visual" aria-hidden="true"><div class="satellite-orbit satellite-orbit-one"></div><div class="satellite-orbit satellite-orbit-two"></div><div class="satellite-phone"><span>SOS</span><b>Emergency via Satellite</b><i>Connecting&hellip;</i></div></div>
      <div class="safety-satellite-copy"><span>PRACTICE BEFORE THE DUNES &middot; IPHONE 14 OR LATER</span><h3>Learn the satellite connection before every minute counts.</h3><p>Do not wait for an injury to discover where the controls are or how the phone directs you toward a satellite. Apple provides a safe practice mode that does not contact emergency services. Run it outdoors before departure and let more than one adult in the group practice.</p>
        <div class="safety-satellite-steps"><article><b>Practice this before departure</b><ol><li>Update the iPhone to the latest iOS.</li><li>Set up Medical ID and emergency contacts in the Health app.</li><li>Go outside with open sky. Swipe down for Control Center, press Cellular, then tap Satellite.</li><li>Tap Try Demo, then Try Emergency SOS, and follow the onscreen direction arrows through the practice connection.</li><li>Charge the phone, pack a battery bank, and show another adult where the phone is carried.</li></ol></article><article><b>During a real emergency</b><ol><li>Try calling 911 first; another available network may connect the call.</li><li>If it fails, tap <strong>Emergency Text via Satellite</strong>, or open Control Center &rsaquo; Cellular &rsaquo; Satellite &rsaquo; Emergency SOS.</li><li>Tap Report Emergency and answer the short questions.</li><li>Stay outside with a clear sky and horizon, hold the phone normally, and follow the onscreen arrows.</li><li>Remain connected and answer any follow-up messages from emergency responders.</li></ol></article></div>
        <p class="safety-satellite-note"><b>Emergency and ordinary satellite messaging are different.</b> Use Emergency SOS via satellite for urgent help. Messages via satellite is meant for friends and family, not emergency response.</p>
        <div class="safety-actions"><a href="https://support.apple.com/en-us/101573" target="_blank" rel="noopener">Read Apple&rsquo;s Emergency SOS instructions &nearr;</a><a href="https://support.apple.com/en-us/120930" target="_blank" rel="noopener">Learn about non-emergency Messages via satellite &nearr;</a></div>
      </div>
    </aside>`);
  }
  root.querySelectorAll("[data-fallback-src]").forEach(img=>img.addEventListener("error",()=>{const fallback=img.dataset.fallbackSrc;if(fallback&&img.getAttribute("src")!==fallback)img.src=fallback},{once:true}))
}
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
        {name:"Jessie M. Honeyman State Park",note:"Large state-park campground south of Florence with RV sites, dunes access nearby, and easy access to town services.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95",dogFriendly:true,petNote:"Dogs are welcome in Oregon State Parks when leashed or otherwise physically controlled; reserve only designated pet-friendly cabins or yurts."},
        {name:"Port of Siuslaw Campground & Marina",note:"Riverfront RV camping within walking distance of Historic Old Town Florence restaurants and shops.",url:"https://www.google.com/maps/search/?api=1&query=Port+of+Siuslaw+Campground+and+Marina+Florence+Oregon"},
        {name:"Florence RV and campground directory",note:"Compare additional private parks and public campgrounds around Florence, Siltcoos, and the dunes.",url:"https://florencechamber.com/lodging/"}
      ],
      lodging:[
        {name:"Driftwood Shores Resort",note:"Oceanfront rooms north of Florence with beach access, kitchens in many rooms, and an indoor pool.",url:"https://www.driftwoodshores.com/stay/",dogFriendly:true,petNote:"A limited number of dog-friendly rooms are available; the property currently lists a per-dog nightly fee."},
        {name:"River House Inn",note:"A riverfront Old Town base within walking distance of Bay Street shopping and dining.",url:"https://www.google.com/maps/search/?api=1&query=River+House+Inn+Florence+Oregon"},
        {name:"Best Western Pier Point Inn",note:"A scenic river-view hotel with breakfast and quick Highway 101 access south of Old Town.",url:"https://www.bestwestern.com/en_US/book/hotels-in-florence/best-western-pier-point-inn/propertyCode.38098.html",dogFriendly:true,petNote:"Limited pet-friendly rooms allow up to two dogs; verify room availability, current size limit, and nightly fee."}
      ],
      camping:[
        {name:"Jessie M. Honeyman State Park",note:"A full-service state-park base near Florence with tent sites and easy access to lakes and dunes.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95",dogFriendly:true,petNote:"Dogs are welcome at campsites when leashed or otherwise physically controlled; cabins and yurts must be specifically designated pet-friendly."},
        {name:"Siltcoos-area Forest Service camping",note:"Compare developed campgrounds around Siltcoos Lake and the central Oregon Dunes corridor.",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/camping-cabins",dogFriendly:true,petNote:"Dogs at developed Forest Service recreation sites must be leashed no longer than six feet or otherwise physically restrained."}
      ]
    },lakeStops:[
      {name:"Cleawox Lake at Honeyman",note:"The easiest Florence paddling choice: a small no-wake lake with a sandy day-use beach, life-jacket loaner station, and seasonal kayak and paddleboard rentals. Confirm rental days and staffing before relying on on-site gear.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95",waterTempUrl:"https://lakemonster.com/lake/Oregon/Cleawox-Lake-14315",travelMinutes:15,visitMinutes:180},
      {name:"Woahink Lake at Honeyman",note:"A larger, more open lake with day-use access, a boat ramp, picnic areas, and room for longer paddles. Bring your own equipment and check wind conditions before launching.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=95",waterTempUrl:"https://lakemonster.com/lake/Oregon/Woahink-Lake-14383",travelMinutes:15,visitMinutes:180}
    ],localStops:{
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
        {name:"Winchester Bay RV Resort",note:"Waterfront full-hookup RV sites at Salmon Harbor with a compact harbor-town base.",url:"https://www.winchesterbayresort.com/rules/",dogFriendly:true,petNote:"Pets are allowed at RV sites when leashed, supervised, contained, and cleaned up after; verify current rules when reserving."},
        {name:"Half Moon Bay Campground",note:"A Douglas County campground near the harbor, Umpqua Dunes, and lighthouse area.",url:"https://www.google.com/maps/search/?api=1&query=Half+Moon+Bay+Campground+Winchester+Bay+Oregon"},
        {name:"Salmon Harbor RV Park",note:"A Highway 101 RV option close to Winchester Bay services and dune access routes.",url:"https://www.google.com/maps/search/?api=1&query=Salmon+Harbor+RV+Park+Winchester+Bay+Oregon"}
      ],
      lodging:[
        {name:"Winchester Bay Inn",note:"A small harbor-community hotel close to bayfront restaurants and Umpqua Dunes access.",url:"https://www.google.com/maps/search/?api=1&query=Winchester+Bay+Inn+Oregon"},
        {name:"Best Western Salbasgeon Inn",note:"A Reedsport hotel with Highway 101 access, useful for groups wanting more town services.",url:"https://www.bestwestern.com/en_US/book/hotels-in-reedsport/best-western-salbasgeon-inn-suites-of-reedsport/propertyCode.38115.html",dogFriendly:true,petNote:"Limited pet-friendly rooms allow up to two dogs; verify room availability, current size limit, and nightly fee."},
        {name:"Umpqua River Inn & Suites",note:"A Reedsport lodging option convenient to groceries, dining, and the Winchester Bay drive.",url:"https://www.google.com/maps/search/?api=1&query=Umpqua+River+Inn+and+Suites+Reedsport+Oregon"}
      ],
      camping:[
        {name:"Half Moon Bay Campground",note:"Harbor-side camping near Winchester Bay, the lighthouse, and Umpqua Dunes.",url:"https://www.google.com/maps/search/?api=1&query=Half+Moon+Bay+Campground+Winchester+Bay+Oregon"},
        {name:"Umpqua Lighthouse State Park",note:"A state-park campground near Lake Marie and the Umpqua River Lighthouse.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=83",dogFriendly:true,petNote:"Pets are welcome when leashed or physically controlled; only designated yurts and cabins are pet-friendly."}
      ]
    },lakeStops:[
      {name:"Lake Marie",note:"A small freshwater lake at Umpqua Lighthouse State Park reserved for non-motorized boating, with paddling, a sandy lakeside beach, picnic space, and a one-mile walking loop.",url:"https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=83",travelMinutes:20,visitMinutes:180},
      {name:"Tahkenitch Lake",note:"A broad coastal lake with Forest Service boat launches near Highway 101. Bring your own equipment and verify the preferred launch, pass requirements, wind, and water conditions before arrival.",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/opportunities/hiking?page=%2C11",travelMinutes:30,visitMinutes:210}
    ],localStops:{
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
        {name:"Oregon Dunes KOA Holiday",note:"Full-hookup RV sites with direct access toward the dunes and family-oriented campground amenities.",url:"https://koa.com/campgrounds/oregon-dunes/general-information/",dogFriendly:true,petNote:"Dogs are welcome at RV and tent sites and must remain leashed; they are not allowed in cabins, rental units, or buildings."},
        {name:"Riley Ranch County Park",note:"RV and camping options with direct OHV access near the southern dunes and Butterfield Lake.",url:"https://www.google.com/maps/search/?api=1&query=Riley+Ranch+County+Park+North+Bend+Oregon"},
        {name:"Ko-Kwel Casino Resort RV Park",note:"Full-hookup waterfront RV sites near North Bend dining, entertainment, and town services.",url:"https://www.themillcasino.com/accommodations/",dogFriendly:true,petNote:"The resort advertises more than 100 pet-friendly RV sites; confirm the current pet rules when reserving."}
      ],
      lodging:[
        {name:"Ko-Kwel Casino Resort Coos Bay",note:"A waterfront North Bend hotel with dining, entertainment, pool, and hot tub amenities.",url:"https://www.google.com/maps/search/?api=1&query=Ko-Kwel+Casino+Resort+Coos+Bay+North+Bend+Oregon"},
        {name:"Best Western Holiday Hotel",note:"A Coos Bay hotel across from the bay and within walking distance of downtown shopping and dining.",url:"https://www.bestwestern.com/en_US/book/hotels-in-coos-bay/best-western-holiday-hotel/propertyCode.38071.html",dogFriendly:true,petNote:"Limited pet-friendly rooms allow up to two dogs; verify room availability, current size limit, and nightly fee."},
        {name:"Edgewater Inn",note:"Rooms and suites on the bay with an observation deck and quick access to Coos Bay services.",url:"https://www.google.com/maps/search/?api=1&query=Edgewater+Inn+Coos+Bay+Oregon"}
      ],
      camping:[
        {name:"Spinreel Campground",note:"A Forest Service campground with direct access to the southern Oregon Dunes riding area.",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/spinreel-campground",dogFriendly:true,petNote:"Dogs must be on a leash no longer than six feet or otherwise under physical restrictive control."},
        {name:"Riley Ranch County Park",note:"Campsites, cabins, showers, lake access, and a direct connection to OHV terrain.",url:"https://www.google.com/maps/search/?api=1&query=Riley+Ranch+County+Park+North+Bend+Oregon"}
      ]
    },lakeStops:[
      {name:"Tenmile Lakes Park",note:"A full-service Lakeside launch with an accessible kayak launch, four boat ramps, docks, parking, restrooms, picnic tables, and a swimming and wading area.",url:"https://co.coos.or.us/tenmile-lakes-park",waterTempUrl:"https://lakemonster.com/lake/Oregon/Tenmile-Lakes-10295",travelMinutes:30,visitMinutes:210},
      {name:"Tenmile Creek at Spinreel",note:"A quieter non-motorized boating option with a small-boat ramp at Spinreel Campground. Check campground access, OHV traffic, current restrictions, and creek conditions before launching.",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/spinreel-campground",travelMinutes:40,visitMinutes:180}
    ],localStops:{
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
  return{arrival:fd.get("arrival"),departure:fd.get("departure"),region:fd.get("region"),vehicle:fd.get("vehicle"),tripType:fd.get("tripType"),rentalType:fd.get("rentalType")||"none",experience:fd.get("experience"),partySize:Number(fd.get("partySize")||1),planningGroup:fd.has("planningGroup"),toys:getChecked(form,"toys"),crew:getChecked(form,"crew"),interests:getChecked(form,"interests")}
}
function buildTrip(data){
  const start=new Date(`${data.arrival}T12:00:00`),end=new Date(`${data.departure}T12:00:00`);
  const days=Math.round((end-start)/86400000)+1,regionKey=chooseRegion(data),region=regionProfile(regionKey);
  const needsRental=data.rentalType&&data.rentalType!=="none";
  const hasMachines=data.toys.some(x=>x!=="none")||needsRental;
  const checklistGroups=[{title:"Trip essentials",items:["Offline maps and any saved reservations","Coastal wind layer, warm layer, and dry footwear","Water, food, first-aid kit, headlamps, and battery bank","Emergency contacts and plan shared with someone at home"]}];
  if(hasMachines){
    const ridingItems=["ATV permits for every machine","Required safety cards for operators","Whip flags, helmets, eye protection, and gloves","Tools, tire gauge, recovery gear, and secure fuel","Working brakes, lights, exhaust, and required spark arrestor"];
    if(data.toys.includes("sxs")||data.rentalType==="sxs")ridingItems.push("Side-by-side restraints, doors or nets, and passenger seating checked");
    if(data.toys.includes("quad")||data.rentalType==="quad")ridingItems.push("ATV controls, tire pressures, and rider fit checked");
    if(data.toys.includes("bike")||data.rentalType==="bike")ridingItems.push("Dirt-bike controls, tire pressures, and protective riding gear checked");
    checklistGroups.push({title:"OHV riding",items:ridingItems})
  }
  if(needsRental)checklistGroups.push({title:"OHV rental",items:["Rental confirmation and pickup time","Operator documents and deposit method","Included safety gear, fuel policy, and after-hours contact"]});
  if(data.vehicle==="4wd")checklistGroups.push({title:"4×4 vehicle",items:["Tow strap, shovel, tire gauge, and recovery points","Full-size spare, jack, and basic tools","Confirm the vehicle is permitted on the planned access route"]});
  if(data.vehicle==="2wd"&&hasMachines)checklistGroups.push({title:"2WD access",items:["Use developed roads, staging areas, and firm designated parking","Confirm the tow vehicle and trailer can turn around before entering an access road","Do not enter soft sand or informal pullouts"]});
  if(data.vehicle==="rv")checklistGroups.push({title:"RV or trailer",items:["Trailer tires, bearings, lights, and hitch lock","Chocks, leveling blocks, and confirmed site length","Turning room and parking plan for campgrounds and planned stops"]});
  const crewItems=[];
  if(data.crew.includes("youth"))crewItems.push(hasMachines?"Youth training records, supervision plan, and correctly sized machine":"Age-appropriate layers, snacks, supervision, and an easy backup activity");
  if(data.crew.includes("dog"))crewItems.push("Leash, water bowl, waste bags, towel, and pet-safe backup activity");
  if(data.crew.includes("campfire"))crewItems.push("Same-day fire restriction check, extinguisher, and a fully cold-out plan");
  if(data.crew.includes("accessibility"))crewItems.push("Accessible parking, restroom, path-surface, and lodging details confirmed directly");
  if(crewItems.length)checklistGroups.push({title:data.planningGroup?"Your group":"Trip details",items:crewItems});
  if(data.interests.includes("wildlife"))checklistGroups.push({title:"Wildlife watching",items:["Binoculars or a long lens","Distance-respecting viewing plan and protected-habitat awareness"]});
  return{...data,days,regionKey,region,checklistGroups,hasMachines}
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
  const target=document.getElementById("plannerWeatherAlert");if(!target)return;
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
    const attire=rainChance>=60||rainTotal>=.1?"Pack a waterproof shell with a hood, water-resistant shoes, and a dry layer for after time outdoors.":rainChance>=30?"Bring a light rain shell and shoes that handle wet sidewalks; keep a dry layer in the vehicle.":"A wind-resistant coastal layer should be enough, but keep a compact rain shell handy.";
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
function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))
}
function formatClock(value){
  if(!value)return"";
  const [hour,minute]=value.split(":").map(Number),period=hour>=12?"PM":"AM",clockHour=hour%12||12;
  return`${clockHour}:${String(minute).padStart(2,"0")} ${period}`
}
function defaultStopTime(groupKey){
  return{breakfast:"09:00",lake:"10:00",lunch:"12:00",shopping:"14:00",dinner:"17:00"}[groupKey]||""
}
function renderLocalStopGroup(label,items,groupKey,selected=[],stopDetails={},planningGroup=false,tripDays=1){
  const multiple=true;
  const simpleDetails=groupKey==="shopping"||groupKey==="lake";
  return`<article class="local-stop-group"><p>${label}</p><div>${items.map((item,index)=>{
    const key=`${groupKey}:${index}`,details=stopDetails[key]||{},fieldId=`${groupKey}-${index}`;
    const reservationFields=simpleDetails?"":`<label for="${fieldId}-reservation">Reservation name<input id="${fieldId}-reservation" class="stop-detail-input" data-stop-key="${key}" data-detail-field="reservation" type="text" maxlength="80" placeholder="Name on reservation" value="${escapeHtml(details.reservation||"")}"></label><label for="${fieldId}-confirmation">Confirmation number<input id="${fieldId}-confirmation" class="stop-detail-input" data-stop-key="${key}" data-detail-field="confirmation" type="text" maxlength="80" placeholder="Optional" value="${escapeHtml(details.confirmation||"")}"></label>`;
    const notePlaceholder=groupKey==="lake"?"Launch, equipment, parking, or anything to remember…":planningGroup?"Where to meet, what to bring…":"Anything you want to remember…";
    const defaultDay=groupKey==="dinner"?1:groupKey==="breakfast"?tripDays:Math.min(2,tripDays);
    const plannedDay=Math.min(tripDays,Math.max(1,Number(details.day)||defaultDay));
    const dayField=tripDays>1?`<label for="${fieldId}-day">Which day?<select id="${fieldId}-day" class="stop-detail-input" data-stop-key="${key}" data-detail-field="day">${Array.from({length:tripDays},(_,dayIndex)=>`<option value="${dayIndex+1}" ${plannedDay===dayIndex+1?"selected":""}>Day ${dayIndex+1}${dayIndex===0?" · Arrival":dayIndex===tripDays-1?" · Departure":""}</option>`).join("")}</select></label>`:"";
    const waterTempLink=item.waterTempUrl?`<a class="lake-temp-link" href="${item.waterTempUrl}" target="_blank" rel="noreferrer"><span aria-hidden="true">💧</span><b>Current water temperature</b><small>Live lake conditions from LakeMonster</small><i>Check now ↗</i></a>`:"";
    return`<article class="local-stop-card"><a class="local-stop-details" href="${item.url}" target="_blank" rel="noreferrer"><b>${item.name}</b><span>${item.note}</span><i>View official access details ↗</i></a>${waterTempLink}<label class="plan-stop-toggle"><input class="plan-stop-checkbox" type="${multiple?"checkbox":"radio"}" ${multiple?"":`name="planned-${groupKey}"`} value="${key}" data-plan-name="${item.name}" data-plan-category="${label}" ${selected.includes(key)?"checked":""}><span>Plan this</span></label><div class="planned-stop-details" data-stop-key="${key}" ${selected.includes(key)?"":"hidden"}><p>${planningGroup?"GROUP":"TRIP"} DETAILS <span>(optional)</span></p><div class="planned-stop-fields">${dayField}<label for="${fieldId}-time">${planningGroup?"Meeting":"Planned"} time<input id="${fieldId}-time" class="stop-detail-input" data-stop-key="${key}" data-detail-field="time" type="time" value="${escapeHtml(details.time||defaultStopTime(groupKey))}"></label>${reservationFields}<label for="${fieldId}-note">${planningGroup?"Organizer":"Trip"} note<input id="${fieldId}-note" class="stop-detail-input" data-stop-key="${key}" data-detail-field="note" type="text" maxlength="140" placeholder="${notePlaceholder}" value="${escapeHtml(details.note||"")}"></label></div><small>Default times are provided for convenience. Change any time to match reservations, driving time, and your preferred pace. Saved on this device. Share-menu privacy choices control what ${planningGroup?"the group receives":"is shared"}.</small><p class="stop-detail-print" data-stop-print="${key}"></p></div></article>`
  }).join("")}</div></article>`
}
function renderLakeSection(plan){
  if(!plan.interests.includes("lakes"))return"";
  const dogNote=plan.crew.includes("dog")?`<aside class="dog-stay-notice"><b>Bringing your dog</b><span>Confirm the current day-use pet rules before arrival, keep your dog under physical control, and bring water, shade, waste bags, and a dry towel. Roped swimming areas may have separate restrictions.</span></aside>`:"";
  return`<section class="plan-section local-guide lake-guide"><p class="section-label">LAKES & PADDLING</p><h2>Choose your lake near ${plan.region.base}</h2><p class="local-guide-intro">These are real regional options for the paddling priority you selected. Check “Plan this,” choose its day, and the day-by-day schedule, printout, and shared plan will use that location by name.</p>${dogNote}<div class="local-stop-grid lake-stop-grid">${renderLocalStopGroup("PADDLING OPTIONS",plan.region.lakeStops,"lake",plan.plannedStops,plan.stopDetails,plan.planningGroup,plan.days)}</div><p class="local-guide-note"><b>Before launching:</b> Confirm current access, parking or pass requirements, rental availability, wind, water temperature, and life-jacket needs. Coastal lake conditions can change quickly.</p></section>`
}
function renderStaySection(plan){
  if(plan.tripType==="day")return`<section class="plan-section stay-guide"><p class="section-label">01 · WHERE YOU’LL STAY</p><h2>No overnight stay selected</h2><p class="stay-guide-intro">This plan is set as a day trip. If ${plan.planningGroup?"the group decides":"you decide"} to stay overnight, change “How will you use the dunes?” to Camping overnight or Town lodging and rebuild the plan.</p></section>`;
  const stayType=plan.tripType==="offsite"?"lodging":plan.vehicle==="rv"?"rv":"camping";
  const heading=stayType==="lodging"?`Town lodging near ${plan.region.base}`:stayType==="rv"?`RV options near ${plan.region.base}`:`Campgrounds near ${plan.region.base}`;
  const intro=stayType==="lodging"?"Compare hotels and inns convenient to town services, dining, and the dunes.":stayType==="rv"?"Compare RV parks and RV-friendly campgrounds, then verify rig length, hookups, vehicle limits, and access before reserving.":"Compare developed campgrounds, then verify current openings, reservation rules, and site details.";
  const allOptions=plan.region.stays[stayType],dogTrip=plan.crew.includes("dog"),selected=plan.plannedStops||[];
  const options=allOptions.map((item,index)=>({item,index})).filter(option=>!dogTrip||option.item.dogFriendly);
  const selectedStayKey=selected.find(key=>key.startsWith("stay:"))||"";
  const selectedStayIndex=Number(selectedStayKey.split(":")[2]);
  const selectedStayName=Number.isInteger(selectedStayIndex)&&allOptions[selectedStayIndex]&&(!dogTrip||allOptions[selectedStayIndex].dogFriendly)?allOptions[selectedStayIndex].name:"";
  return`<section class="plan-section stay-guide"><p class="section-label">01 · WHERE YOU’LL STAY</p><h2>${heading}</h2><p class="stay-guide-intro">${intro} Choose one “Plan this” option to include it in the printed and shared plan.</p>${dogTrip?`<aside class="dog-stay-notice"><b>Dog-friendly filter is on</b><span>Only stays with a verified pet-friendly policy are shown. Pet rooms and designated cabins can be limited, so confirm availability, fees, size limits, and leash rules directly before booking.</span></aside>`:""}<div class="stay-options-grid">${options.map(option=>{const {item,index}=option,key=`stay:${stayType}:${index}`;return`<article class="stay-option-card"><a href="${item.url}" target="_blank" rel="noreferrer">${dogTrip?`<small class="dog-friendly-badge">DOG-FRIENDLY</small>`:""}<b>${item.name}</b><span>${item.note}</span>${dogTrip?`<em>${item.petNote}</em>`:""}<i>View stay details ↗</i></a><label class="plan-stop-toggle"><input class="plan-stop-checkbox" type="radio" name="plannedStay" value="${key}" data-plan-name="${item.name}" data-plan-category="WHERE TO STAY" ${selectedStayKey===key?"checked":""}><span>Plan this</span></label></article>`}).join("")}</div><div class="stay-confirmation-panel" id="stayConfirmationPanel" ${selectedStayName?"":"hidden"}><p id="staySummary">${selectedStayName?`You are staying at “${selectedStayName}”.`:""}</p><label for="stayConfirmation">Confirmation number <span>(optional)</span></label><input id="stayConfirmation" type="text" maxlength="80" autocomplete="off" placeholder="Reservation or confirmation number" value="${escapeHtml(plan.stayConfirmation||"")}"><small class="stay-confirmation-field-note">Saved on this device and shown on your personal printout. You decide whether to include it when sharing.</small><p class="stay-confirmation-print" id="stayConfirmationPrint">${plan.stayConfirmation?`Confirmation number: ${escapeHtml(plan.stayConfirmation)}`:""}</p></div><p class="planned-stay-status" id="plannedStayStatus" aria-live="polite"></p><p class="stay-guide-note">Availability and amenities can change. Confirm dates, rates, cancellation terms, pet rules, trailer parking, and direct dune access with the property before booking.</p></section>`
}
function nonRidingDayProfile(plan,lake){
  if(plan.interests.includes("lakes")&&lake)return{title:`Paddling at ${lake.name}`,description:`Make ${lake.name} the main outing. Allow time for parking, unloading, a weather and water check, and an unhurried paddle. Confirm current access, launch requirements, and life-jacket needs before leaving town.`};
  if(plan.interests.includes("lakes"))return{title:"Lakes and paddling day",description:`Choose one of the lake options in this plan with “Plan this” to add the exact destination here. Keep the day centered on paddling, with enough time for parking, unloading, changing wind, and a relaxed return to ${plan.region.base}.`};
  if(plan.interests.includes("wildlife"))return{title:"Wildlife and dunes day",description:`Begin quietly near a forest edge, estuary, or developed wildlife-viewing area, then visit a permitted dune overlook while keeping well away from signed habitat.`};
  if(plan.interests.includes("hiking"))return{title:"Dunes walk and photography day",description:`Choose a permitted dune trail or developed viewpoint near ${plan.region.ride}, move at an easy pace, and leave extra time for photography and changing coastal light.`};
  if(plan.interests.includes("towns"))return{title:"Shopping and dining day",description:`Spend the day around ${plan.region.base}, using the shopping, lunch, and dinner options selected below to shape a relaxed town itinerary.`};
  return{title:"Scenic dunes day",description:`Explore a developed dune viewpoint or permitted walking route near ${plan.region.ride}, then keep the afternoon flexible for a beach, lighthouse, or other easy coastal stop.`}
}
function selectedPriorityAddOn(plan){
  const additions=[];
  if(plan.interests.includes("lakes"))additions.push("a nearby freshwater lake stop");
  if(plan.interests.includes("wildlife"))additions.push("a quiet wildlife-viewing window away from signed habitat");
  if(plan.interests.includes("hiking"))additions.push("a short permitted walk and time for photography");
  if(plan.interests.includes("towns"))additions.push(`time in ${plan.region.base} for the selected shopping and dining stops`);
  if(!additions.length)return"";
  return` If time and energy allow, also make room for ${additions.join(", ")}.`
}
function itinerarySelectionPrompt(plan){
  const choices=[];
  if(plan.tripType!=="day")choices.push("a stay");
  if(plan.interests.includes("lakes"))choices.push("a lake");
  if(plan.interests.includes("towns"))choices.push("shopping, meal, or breakfast stops");
  if(!choices.length)return"This schedule follows the trip style and priorities selected above.";
  return`Choose ${choices.join(" and ")} with “Plan this” and the schedule will update around those choices.`
}
function legacySelectedItinerary(plan,picks){
  const pick=prefix=>picks.find(item=>item.key.startsWith(`${prefix}:`));
  const stay=pick("stay"),lake=pick("lake"),shopping=pick("shopping"),lunch=pick("lunch"),dinner=pick("dinner"),breakfast=pick("breakfast");
  const detail=item=>item?(plan.stopDetails?.[item.key]||{}):{};
  const atTime=item=>detail(item).time?` at ${formatClock(detail(item).time)}`:"";
  const rentalName={quad:"ATV / quad",sxs:"side-by-side / UTV",bike:"dirt bike",unsure:"OHV"}[plan.rentalType];
  const nonRidingDay=nonRidingDayProfile(plan,lake);
  const experienceStart=plan.experience==="first"?"Begin in a low-consequence practice area and keep the first route short.":plan.experience==="some"?"Use a conservative first loop to read the current ridges and slip faces.":"Use the first loop to confirm current sand, visibility, and route conditions before increasing the pace.";
  const ridingLead=rentalName?`Pick up the reserved ${rentalName}, complete the orientation, and confirm the return time before staging at ${plan.region.ride}. ${experienceStart}`:plan.hasMachines?`Stage at ${plan.region.ride} and inspect every machine. ${experienceStart}`:nonRidingDay.description;
  const ridingCheck=plan.hasMachines?" Confirm same-day closures, designated access, permits, and flag requirements before entering the sand.":"";
  const crewNotes=[];
  if(plan.crew.includes("youth"))crewNotes.push(plan.hasMachines?"keep youth supervision, rider fit, and skill breaks built into the day":"keep supervision, rest breaks, and an age-appropriate backup activity built into the day");
  if(plan.crew.includes("dog"))crewNotes.push("use only pet-appropriate stops and keep the dog leashed away from protected habitat");
  if(plan.crew.includes("accessibility"))crewNotes.push("use the confirmed accessible parking, restroom, and path options");
  const crewLine=crewNotes.length?` For ${plan.planningGroup?"the group":"this trip"}, ${crewNotes.join(" and ")}.`:"";
  const priorityAddOn=plan.hasMachines?selectedPriorityAddOn(plan):"";
  const townParts=[];
  if(shopping)townParts.push(`Browse ${shopping.name}${atTime(shopping)}`);
  if(lunch)townParts.push(`meet for lunch at ${lunch.name}${atTime(lunch)}`);
  if(dinner)townParts.push(`finish with dinner at ${dinner.name}${atTime(dinner)}`);
  const townPlan=townParts.length?`${townParts.join(", ")}.`:`Use the afternoon for the shops and waterfront in ${plan.region.base}; choose lunch and dinner with “Plan this” to place them here.`;
  const days=[];
  if(plan.days===1){
    const meal=lunch?` Stop for lunch at ${lunch.name}${atTime(lunch)}.`:"";
    const town=shopping?` Add ${shopping.name}${atTime(shopping)} before leaving town.`:"";
    const evening=dinner?` Finish with dinner at ${dinner.name}${atTime(dinner)}.`:"";
    days.push([`Your selected day in ${plan.region.base}`,`${ridingLead}${ridingCheck}${priorityAddOn}${meal}${town}${evening}${crewLine}`]);
    return{days,note:picks.length?"Built from the places and activities marked “Plan this.”":itinerarySelectionPrompt(plan)}
  }
  const arrivalDinner=plan.days===2&&dinner?` Meet for dinner at ${dinner.name}${atTime(dinner)}.`:"";
  const arrivalPlan=plan.hasMachines?`Unload only what the riders need, confirm tomorrow’s route to ${plan.region.ride}, and review weather and closures.`:`Settle in, review tomorrow’s ${nonRidingDay.title.toLowerCase()}, and confirm weather, hours, and driving time for the selected stops.`;
  days.push([stay?`Arrive and check in at ${stay.name}`:`Arrive and settle in near ${plan.region.base}`,`${stay?`Check in at ${stay.name} with daylight remaining. ${arrivalPlan}`:`Arrive with daylight and choose your overnight base. Mark a stay with “Plan this” to add its name, check-in, and checkout to this schedule.`}${arrivalDinner}`]);
  const departureTraffic=plan.vehicle==="rv"?"US 101 and trailer traffic":"coastal traffic on US 101";
  if(plan.days===2){
    const breakfastLine=breakfast?`Start with breakfast at ${breakfast.name}${atTime(breakfast)}. `:"";
    const shortTownPlan=[shopping?`browse ${shopping.name}${atTime(shopping)}`:"",lunch?`have lunch at ${lunch.name}${atTime(lunch)}`:""].filter(Boolean).join(" and ");
    const twoDayDeparture=plan.hasMachines?`Finish with enough daylight to clean and secure the machines and riding gear, check out${stay?` of ${stay.name}`:""}, and allow extra time for ${departureTraffic}.`:`Leave time to pack your belongings, check out${stay?` of ${stay.name}`:""}, and enjoy one last short stop that matches your selected priorities before accounting for ${departureTraffic}.`;
    days.push([rentalName?`${rentalName} outing, then head home`:plan.hasMachines?`Ride ${plan.region.ride}, then head home`:nonRidingDay.title,`${breakfastLine}${ridingLead}${ridingCheck}${priorityAddOn}${shortTownPlan?` Then ${shortTownPlan}.`:""} ${twoDayDeparture}${crewLine}`]);
    return{days,note:picks.length?`This two-day schedule uses ${picks.length} selection${picks.length===1?"":"s"} marked “Plan this” and updates as choices change.`:itinerarySelectionPrompt(plan)}
  }
  const shortTripDinner=plan.days===3&&dinner?` Finish with dinner at ${dinner.name}${atTime(dinner)}.`:"";
  const primaryDayTitle=rentalName?`${rentalName} day at ${plan.region.ride}`:plan.hasMachines?`Primary riding day at ${plan.region.ride}`:nonRidingDay.title;
  const primaryDayTitleWithDinner=plan.days===3&&dinner?`${primaryDayTitle}, then dinner at ${dinner.name}`:primaryDayTitle;
  days.push([primaryDayTitleWithDinner,`${ridingLead}${ridingCheck}${priorityAddOn}${shortTripDinner}${crewLine}`]);
  for(let day=3;day<plan.days;day++){
    if(day===3&&plan.interests.includes("towns"))days.push([townParts.length?`Your ${plan.region.base} picks`:`Coast and community day`,`${plan.interests.includes("wildlife")?"Start with quiet wildlife watching while conditions are calm. ":""}${townPlan}`]);
    else if(plan.interests.includes("wildlife")&&day===4)days.push(["Wildlife and slow-coast day","Begin quietly near an estuary, forest edge, or developed viewing area. Keep distance from wildlife and signed habitat, then choose a sheltered, developed backup stop if the weather changes."]);
    else if(plan.hasMachines)days.push([`Flexible riding day`, `Return to ${plan.region.ride} only if the riders and machines are ready. Shorten the route, revisit a favorite section, and keep enough time for cleanup and tomorrow’s departure.`]);
    else days.push(["Flexible coast day","Revisit a favorite stop from the plan, choose another developed viewpoint, or slow the day down if the weather changes."]);
  }
  const breakfastLine=breakfast?`Meet for breakfast at ${breakfast.name}${atTime(breakfast)}. `:"";
  const departureTown=plan.days===3?[shopping?`browse ${shopping.name}${atTime(shopping)}`:"",lunch?`have lunch at ${lunch.name}${atTime(lunch)}`:""].filter(Boolean).join(" and "):"";
  const departureTitle=breakfast?`Breakfast at ${breakfast.name}, then head home`:plan.hasMachines?"Pack up and leave light":"One last coast stop, then head home";
  const departurePrep=plan.hasMachines?`${stay?`Check out of ${stay.name}, then `:""}clean and secure the machines and sandy riding gear`:plan.vehicle==="rv"?`${stay?`Check out of ${stay.name}, then `:""}secure the RV or trailer and complete a final campsite check`:`${stay?`Check out of ${stay.name}, then `:""}pack your belongings and make sure nothing is left behind`;
  const relaxedStop=!plan.hasMachines&&!departureTown?", then enjoy one last short stop that matches your selected priorities":"";
  days.push([departureTitle,`${breakfastLine}${departurePrep}${departureTown?`, then ${departureTown}`:""}${relaxedStop}. Allow extra time for ${departureTraffic}.`]);
  return{days,note:picks.length?`This schedule uses ${picks.length} selection${picks.length===1?"":"s"} marked “Plan this” and updates as choices change.`:itinerarySelectionPrompt(plan)}
}
function selectedItinerary(plan,picks){
  const picksFor=prefix=>picks.filter(item=>item.key.startsWith(`${prefix}:`));
  const stay=picksFor("stay")[0];
  const detail=item=>item?(plan.stopDetails?.[item.key]||{}):{};
  const category=item=>item.key.split(":")[0];
  const timeValue=item=>detail(item).time||defaultStopTime(category(item));
  const atTime=item=>timeValue(item)?` at ${formatClock(timeValue(item))}`:"";
  const defaultDay=item=>{
    if(plan.days===1)return 1;
    if(category(item)==="dinner")return 1;
    if(category(item)==="breakfast")return plan.days;
    return Math.min(2,plan.days)
  };
  const scheduledDay=item=>Math.min(plan.days,Math.max(1,Number(detail(item).day)||defaultDay(item)));
  const dayItems=(day,type)=>picks.filter(item=>category(item)===type&&scheduledDay(item)===day);
  const listNames=items=>{
    const names=items.map(item=>`${item.name}${atTime(item)}`);
    if(names.length<2)return names[0]||"";
    return`${names.slice(0,-1).join(", ")} and ${names.at(-1)}`
  };
  const scheduleLabel={breakfast:"Breakfast",lake:"Paddling",shopping:"Shopping",lunch:"Lunch",dinner:"Dinner"};
  const scheduleForDay=day=>["breakfast","lake","shopping","lunch","dinner"].flatMap(type=>dayItems(day,type).map(item=>({label:scheduleLabel[type],name:item.name,time:timeValue(item)})));
  const stopSentences=day=>{
    const parts=[],breakfast=dayItems(day,"breakfast"),shopping=dayItems(day,"shopping"),lunch=dayItems(day,"lunch"),dinner=dayItems(day,"dinner");
    if(breakfast.length)parts.push(`Start with breakfast at ${listNames(breakfast)}.`);
    if(shopping.length)parts.push(`Shop and explore ${listNames(shopping)}.`);
    if(lunch.length)parts.push(`Stop for lunch at ${listNames(lunch)}.`);
    if(dinner.length)parts.push(`Finish with dinner at ${listNames(dinner)}.`);
    return parts.join(" ")
  };
  const toMinutes=value=>{const [hour,minute]=String(value||"").split(":").map(Number);return Number.isFinite(hour)&&Number.isFinite(minute)?hour*60+minute:null};
  const fromMinutes=value=>`${String(Math.floor(value/60)%24).padStart(2,"0")}:${String(value%60).padStart(2,"0")}`;
  const lakeMeta=item=>{
    const index=Number(item?.key.split(":")[1]);
    return Number.isInteger(index)?plan.region.lakeStops[index]:null
  };
  const timingNoteForDay=day=>{
    const dinner=dayItems(day,"dinner")[0],lakes=dayItems(day,"lake");
    if(!dinner||!lakes.length)return"";
    const dinnerMinutes=toMinutes(timeValue(dinner));
    const latestReturn=lakes.reduce((latest,item)=>{
      const meta=lakeMeta(item)||{},start=toMinutes(timeValue(item));
      if(start===null)return latest;
      return Math.max(latest,start+(meta.visitMinutes||180)+(meta.travelMinutes||30))
    },0);
    if(dinnerMinutes===null||latestReturn+45<=dinnerMinutes)return"";
    const suggested=Math.min(1410,Math.ceil((latestReturn+45)/30)*30);
    return`Timing check: this lake outing may not leave enough time to load up, return to ${plan.region.base}, and reach dinner by ${formatClock(timeValue(dinner))}. Consider moving dinner to about ${formatClock(fromMinutes(suggested))} or shortening the outing.`
  };
  const rentalName={quad:"ATV / quad",sxs:"side-by-side / UTV",bike:"dirt bike",unsure:"OHV"}[plan.rentalType];
  const experienceStart=plan.experience==="first"?"Begin in a low-consequence practice area and keep the first route short.":plan.experience==="some"?"Use a conservative first loop to read the current ridges and slip faces.":"Use the first loop to confirm current sand, visibility, and route conditions before increasing the pace.";
  const ridingLead=rentalName?`Pick up the reserved ${rentalName}, complete the orientation, and confirm the return time before staging at ${plan.region.ride}. ${experienceStart}`:plan.hasMachines?`Stage at ${plan.region.ride} and inspect every machine. ${experienceStart}`:"";
  const ridingCheck=plan.hasMachines?" Confirm same-day closures, designated access, permits, and flag requirements before entering the sand.":"";
  const crewNotes=[];
  if(plan.crew.includes("youth"))crewNotes.push(plan.hasMachines?"keep youth supervision, rider fit, and skill breaks built into the day":"keep supervision, rest breaks, and an age-appropriate backup activity built into the day");
  if(plan.crew.includes("dog"))crewNotes.push("use only pet-appropriate stops and keep the dog leashed away from protected habitat");
  if(plan.crew.includes("accessibility"))crewNotes.push("use the confirmed accessible parking, restroom, and path options");
  const crewLine=crewNotes.length?` For ${plan.planningGroup?"the group":"this trip"}, ${crewNotes.join(" and ")}.`:"";
  const departureTraffic=plan.vehicle==="rv"?"US 101 and trailer traffic":"coastal traffic on US 101";
  const days=[];
  for(let day=1;day<=plan.days;day++){
    const lake=dayItems(day,"lake")[0],breakfast=dayItems(day,"breakfast"),dinner=dayItems(day,"dinner"),schedule=scheduleForDay(day);
    if(plan.days>1&&day===1){
      const dinnerTitle=dinner.length?`, then dinner at ${dinner[0].name}`:"";
      const title=stay?`Arrive and check in at ${stay.name}${dinnerTitle}`:`Arrive and settle in near ${plan.region.base}${dinnerTitle}`;
      const tomorrowLake=picksFor("lake").find(item=>scheduledDay(item)===2),tomorrowProfile=nonRidingDayProfile(plan,tomorrowLake);
      const arrivalPlan=plan.hasMachines?`Unload only what the riders need, confirm tomorrow’s route to ${plan.region.ride}, and review weather and closures.`:`Settle in, review tomorrow’s ${tomorrowProfile.title.toLowerCase()}, and confirm weather, hours, and driving time for the selected stops.`;
      const stayText=stay?`Check in at ${stay.name} with daylight remaining. ${arrivalPlan}`:`Arrive with daylight and choose your overnight base. Mark a stay with “Plan this” to add it to this schedule.`;
      days.push([title,`${stayText} ${stopSentences(day)}`.trim(),stay?[{label:"Check in",name:stay.name},...schedule]:schedule,timingNoteForDay(day)]);
      continue
    }
    if(plan.days>1&&day===plan.days){
      const title=breakfast.length?`Breakfast at ${breakfast[0].name}, then head home`:plan.hasMachines?"Pack up and head home":"One last coast stop, then head home";
      const prep=plan.hasMachines?`${stay?`Check out of ${stay.name}, then `:""}clean and secure the machines and sandy riding gear`:plan.vehicle==="rv"?`${stay?`Check out of ${stay.name}, then `:""}secure the RV or trailer and complete a final campsite check`:`${stay?`Check out of ${stay.name}, then `:""}pack your belongings and make sure nothing is left behind`;
      days.push([title,`${stopSentences(day)} ${prep}. Allow extra time for ${departureTraffic}.`.trim(),schedule,timingNoteForDay(day)]);
      continue
    }
    const profile=nonRidingDayProfile(plan,lake),isPrimary=day===(plan.days===1?1:2);
    let title=lake?profile.title:plan.hasMachines&&isPrimary?(rentalName?`${rentalName} day at ${plan.region.ride}`:`Primary riding day at ${plan.region.ride}`):profile.title;
    if(breakfast.length)title=`Breakfast at ${breakfast[0].name}, then ${title.charAt(0).toLowerCase()}${title.slice(1)}`;
    if(dinner.length)title+=`, then dinner at ${dinner[0].name}`;
    let activity;
    if(lake)activity=profile.description;
    else if(plan.hasMachines&&isPrimary)activity=`${ridingLead}${ridingCheck}${selectedPriorityAddOn(plan)}`;
    else if(plan.hasMachines)activity=`Return to ${plan.region.ride} only if the riders and machines are ready. Shorten the route and keep enough time for the day’s selected stops.`;
    else activity=profile.description;
    days.push([title,`${stopSentences(day)} ${activity}${crewLine}`.trim(),schedule,timingNoteForDay(day)])
  }
  return{days,note:picks.length?`This schedule organizes ${picks.length} selection${picks.length===1?"":"s"} by the day chosen in each “Plan this” card.`:itinerarySelectionPrompt(plan)}
}
function renderPlanSources(plan){
  const sources=[];
  if(plan.hasMachines){
    sources.push({name:"Forest Service OHV",note:"Current motorized maps, alerts, and access",url:"https://www.fs.usda.gov/r06/siuslaw/recreation/opportunities/highway-vehicles-ohv",external:true});
    sources.push({name:"Oregon ATV Program",note:"Permits, education, and equipment rules",url:"https://www.oregon.gov/oprd/atv/pages/atv-overview.aspx",external:true})
  }
  if(plan.tripType==="camping")sources.push({name:"Camping Guide",note:"Campgrounds, access, reservations, and backups",url:"camping.html"});
  if(plan.interests.includes("towns"))sources.push({name:"Nearby Towns Guide",note:"Services and gateway-town planning",url:"nearby-towns.html"});
  if(plan.interests.includes("wildlife"))sources.push({name:"Wildlife & Habitat",note:"Seasonal habitat and low-impact viewing",url:"wildlife.html"});
  if(plan.hasMachines&&(plan.crew.includes("youth")||plan.experience==="first"))sources.push({name:"Safety Fieldbook",note:"New-rider and youth safety",url:"safety.html"});
  if(plan.tripType==="day")sources.push({name:"Day Use Guide",note:plan.hasMachines?"Staging, parking, and day-trip details":"Parking, viewpoints, and day-trip details",url:"day-use.html"});
  sources.push({name:"Oregon Dunes Guide Map",note:plan.hasMachines?"Your selected region, staging, and nearby stops":"Your selected region, viewpoints, and nearby stops",url:"maps.html"});
  return`<section class="plan-section"><p class="section-label">FOR THIS PLAN</p><h2>Links matched to your selections</h2><div class="plan-sources">${sources.map(source=>`<a href="${source.url}" ${source.external?'target="_blank" rel="noreferrer"':""}><b>${source.name}</b><span>${source.note} ${source.external?"↗":"→"}</span></a>`).join("")}</div></section>`
}
function selectionSummaryItems(plan,picks){
  const items=[];
  const stay=picks.find(item=>item.key.startsWith("stay:"));
  const lake=picks.find(item=>item.key.startsWith("lake:"));
  const vehicle={["4wd"]:"4×4 truck or SUV",["2wd"]:"2WD vehicle",rv:"RV or trailer"}[plan.vehicle]||plan.vehicle;
  const tripType={camping:"Camping overnight",offsite:"Town lodging",day:"Day trip"}[plan.tripType]||plan.tripType;
  const toyLabels={quad:"ATVs / quads",sxs:"Side-by-side / UTV",bike:"Dirt bikes"};
  const rentalLabels={quad:"Renting an ATV / quad",sxs:"Renting a side-by-side / UTV",bike:"Renting a dirt bike",unsure:"Needs rental guidance"};
  const experienceLabels={first:"First dune trip",some:"Some dune experience",experienced:"Experienced riders"};
  const crewLabels={youth:"Riders under 16",dog:"Bringing a dog",campfire:"Campfire requested",accessibility:"Easy-access options"};
  const interestLabels={lakes:"Lakes & paddling",wildlife:"Wildlife watching",towns:"Shopping, meals & towns",hiking:"Hiking & photography"};
  items.push(["Vehicle",vehicle],["Trip style",tripType]);
  if(plan.planningGroup)items.push(["Planning","Group trip"]);
  if(stay)items.push(["Staying at",stay.name]);
  if(lake)items.push(["Paddling at",lake.name]);
  const toys=plan.toys.filter(item=>item!=="none").map(item=>toyLabels[item]).filter(Boolean);
  if(toys.length)items.push(["Bringing",toys.join(", ")]);
  if(plan.rentalType!=="none")items.push(["Rental",rentalLabels[plan.rentalType]||plan.rentalType]);
  if(plan.hasMachines)items.push(["Experience",experienceLabels[plan.experience]||plan.experience]);
  plan.crew.forEach(item=>{if(crewLabels[item])items.push([plan.planningGroup?"Group":"Trip detail",crewLabels[item]])});
  plan.interests.forEach(item=>{if(interestLabels[item])items.push(["Priority",interestLabels[item]])});
  return items
}
function personalizedPlanLead(plan){
  if(plan.hasMachines)return`A practical base for access to ${plan.region.ride}, supplies, fuel, and rider services.`;
  if(plan.interests.includes("lakes"))return`A flexible base for freshwater lakes, developed dune viewpoints, and an easy-paced coast trip.`;
  if(plan.interests.includes("wildlife"))return`A useful base for quiet wildlife viewing, developed dune viewpoints, and habitat-aware exploring.`;
  if(plan.interests.includes("hiking"))return`A scenic base for dune walks, photography, and flexible coastal outings.`;
  if(plan.interests.includes("towns"))return`A convenient base for the shopping, dining, parking, and town stops selected in this plan.`;
  return`A flexible base for developed dune viewpoints, beaches, and an easy-paced Oregon Coast visit.`
}
function renderTrip(plan){
  const result=document.getElementById("tripPlan");if(!result)return;
  const tripLabel=plan.tripType==="camping"?"Camping":plan.tripType==="offsite"?"Town lodging":"Day trip";
  const sharePrefs={dates:plan.sharePrefs?.dates!==false,stay:plan.sharePrefs?.stay!==false,itinerary:plan.sharePrefs?.itinerary!==false,picks:plan.sharePrefs?.picks!==false,details:plan.sharePrefs?.details===true,confirmation:plan.sharePrefs?.confirmation===true};
  result.hidden=false;
  result.innerHTML=`<div class="plan-top"><div><p class="kicker">YOUR PERSONALIZED PLAN</p><h2>${plan.region.name}</h2><p>${personalizedPlanLead(plan)}</p></div><div class="plan-actions"><button type="button" id="printPlan">Print / Save PDF</button><button type="button" id="sharePlan" aria-expanded="false" aria-controls="planShareMenu">Share plan</button><button type="button" id="editPlan">Edit answers</button>
    <div class="plan-share-menu" id="planShareMenu" role="dialog" aria-label="Share this trip plan" hidden>
      <div class="plan-share-heading"><div><span>SHARE THIS PLAN</span><b>Choose where to send it.</b></div><button type="button" id="closePlanShare" aria-label="Close share options">×</button></div>
      <fieldset class="share-privacy-options"><legend>INCLUDE IN THIS SHARE</legend><label><input class="share-pref" type="checkbox" data-share-pref="dates" ${sharePrefs.dates?"checked":""}><span>Exact trip dates</span></label><label><input class="share-pref" id="shareStayPref" type="checkbox" data-share-pref="stay" ${sharePrefs.stay?"checked":""}><span>Selected stay</span></label><label><input class="share-pref" type="checkbox" data-share-pref="itinerary" ${sharePrefs.itinerary?"checked":""}><span>Day-by-day schedule</span></label><label><input class="share-pref" type="checkbox" data-share-pref="picks" ${sharePrefs.picks?"checked":""}><span>Meal, shopping & ${plan.planningGroup?"group":"trip"} picks</span></label><label><input class="share-pref" id="shareDetailsPref" type="checkbox" data-share-pref="details" ${sharePrefs.details?"checked":""}><span>Reservation names & notes</span></label><label><input class="share-pref" id="shareConfirmationPref" type="checkbox" data-share-pref="confirmation" ${sharePrefs.confirmation?"checked":""}><span>Confirmation numbers</span></label><small>Private reservation details and confirmation numbers are off by default. Print keeps the complete personal copy.</small></fieldset>
      <a class="plan-share-option" id="shareMessenger" href="https://www.facebook.com/messages/" target="_blank" rel="noreferrer"><span>M</span><div><b>Messenger</b><small>Open the Messenger app or Facebook Messages</small></div><i>→</i></a>
      <a class="plan-share-option" id="shareEmail"><span>@</span><div><b>Email</b><small>Open a ready-to-send message</small></div><i>→</i></a>
      <a class="plan-share-option" id="shareText"><span>TXT</span><div><b>Text</b><small>Send by SMS or iMessage</small></div><i>→</i></a>
      <p class="plan-share-feedback" id="planShareFeedback" aria-live="polite"></p>
    </div>
  </div></div>
  <div class="plan-stats"><div><span>Dates</span><b>${formatDate(plan.arrival)}–${formatDate(plan.departure)}</b></div><div><span>Length</span><b>${plan.days} day${plan.days===1?"":"s"}</b></div><div><span>Stay</span><b>${tripLabel}</b></div><div><span>${plan.planningGroup?"Group":"Travelers"}</span><b>${plan.partySize} traveler${plan.partySize===1?"":"s"}</b></div></div>
  <section class="answer-summary"><div class="answer-summary-intro"><p>HERE IS YOUR PERSONALIZED TRIP</p><h2>Planned the way you want.</h2><span>Now let’s take a look at some of your options.</span></div><div class="answer-summary-chips" id="answerSummaryChips"></div><button type="button" id="editAnswersSummary">Edit answers</button></section>
  ${renderStaySection(plan)}
  ${renderLakeSection(plan)}
  ${plan.interests.includes("towns")?`<section class="plan-section local-guide"><p class="section-label">SHOP, EAT & EXPLORE</p><h2>Local picks near ${plan.region.base}</h2><p class="local-guide-intro">Build each day around these nearby visitor-friendly stops. Select as many meals or shopping stops as you need, then use “Which day?” to place every choice on the arrival day, a full trip day, or the departure day. Shopping choices keep only a time and trip note. Meal choices can also keep optional reservation details.</p><aside class="local-parking"><div><span>TOWN PARKING</span><b>Parking for these stops</b></div><div class="local-parking-links">${plan.region.parking.map(item=>`<a href="${item.url}" target="_blank" rel="noreferrer"><b>${item.name}</b><small>${item.note}</small></a>`).join("")}</div></aside><div class="local-stop-grid">${renderLocalStopGroup("TOURIST SHOPPING",plan.region.localStops.shopping,"shopping",plan.plannedStops,plan.stopDetails,plan.planningGroup,plan.days)}${renderLocalStopGroup("LUNCH",plan.region.localStops.lunch,"lunch",plan.plannedStops,plan.stopDetails,plan.planningGroup,plan.days)}${renderLocalStopGroup("DINNER",plan.region.localStops.dinner,"dinner",plan.plannedStops,plan.stopDetails,plan.planningGroup,plan.days)}${renderLocalStopGroup("BREAKFAST",plan.region.localStops.breakfast,"breakfast",plan.plannedStops,plan.stopDetails,plan.planningGroup,plan.days)}</div><p class="planned-stops-status" id="plannedStopsStatus" aria-live="polite"></p><p class="local-guide-note"><b>Before you go:</b> Coastal business hours can change seasonally. Open each listing to confirm today’s hours, reservations, and accessibility.</p></section>`:""}
  <section class="plan-section"><p class="section-label">DAY BY DAY</p><h2>Your selections, organized by day</h2><p class="itinerary-selection-note" id="itinerarySelectionNote"></p><aside class="itinerary-weather"><div><span>WEATHER & ROADS</span><b>${plan.region.base} during your trip</b></div><p id="plannerWeatherAlert" class="weather-outlook" aria-live="polite">Checking the forecast and road-weather outlook…</p></aside><div class="itinerary" id="tripItinerary"></div></section>
  <section class="plan-section"><p class="section-label">PACK & PREP</p><h2>Only what your selections require</h2><div class="checklist-groups">${plan.checklistGroups.map(group=>`<article class="checklist-group"><h3>${group.title}</h3>${group.items.map(item=>`<div class="checklist-item">${item}</div>`).join("")}</article>`).join("")}</div></section>
  ${renderPlanSources(plan)}`;
  document.getElementById("printPlan").addEventListener("click",()=>{window.odgTrack("planner_print");window.print()});
  const shareButton=document.getElementById("sharePlan");
  const shareMenu=document.getElementById("planShareMenu");
  const closeShareButton=document.getElementById("closePlanShare");
  const shareFeedback=document.getElementById("planShareFeedback");
  const plannerUrl=new URL("planner.html",window.location.href).href;
  const shareTitle=plan.planningGroup?"Our Oregon Dunes trip plan":"My Oregon Dunes trip plan";
  const selectedPlanStops=()=>[...result.querySelectorAll(".plan-stop-checkbox:checked")].map(input=>({key:input.value,category:input.dataset.planCategory,name:input.dataset.planName}));
  const readStopDetails=()=>{
    const details={};
    result.querySelectorAll(".stop-detail-input").forEach(input=>{const key=input.dataset.stopKey;if(!details[key])details[key]={};details[key][input.dataset.detailField]=input.value.trim()});
    return details
  };
  const buildShareMessage=()=>{
    const picks=selectedPlanStops(),stay=picks.find(item=>item.key.startsWith("stay:")),otherPicks=picks.filter(item=>!item.key.startsWith("stay:")),stopDetails=readStopDetails();
    const confirmation=(document.getElementById("stayConfirmation")?.value||"").trim(),dates=sharePrefs.dates?`, ${formatDate(plan.arrival)} to ${formatDate(plan.departure)}`:"";
    const shareSummary=`${plan.planningGroup?"Our":"My"} Oregon Dunes trip: ${plan.region.name}${dates}, ${plan.days} days. Base: ${plan.region.base}.${plan.hasMachines?` Primary riding area: ${plan.region.ride}.`:""}`;
    const stayLine=sharePrefs.stay&&stay?`\n\nYou are staying at "${stay.name}".${sharePrefs.confirmation&&confirmation?` Confirmation number: ${confirmation}.`:""}`:"";
    const groupPicks=sharePrefs.picks&&otherPicks.length?`\n\n${plan.planningGroup?"Group":"Trip"} picks:\n${otherPicks.map(item=>{const detail=stopDetails[item.key]||{},extras=[];if(detail.day)extras.push(`Day ${detail.day}`);if(detail.time)extras.push(`${plan.planningGroup?"meet at":"planned for"} ${formatClock(detail.time)}`);if(sharePrefs.details&&detail.reservation)extras.push(`reservation: ${detail.reservation}`);if(sharePrefs.details&&detail.note)extras.push(`note: ${detail.note}`);if(sharePrefs.confirmation&&detail.confirmation)extras.push(`confirmation: ${detail.confirmation}`);return`- ${item.category}: ${item.name}${extras.length?` (${extras.join("; ")})`:""}`}).join("\n")}`:"";
    const itineraryPicks=picks.filter(item=>item.key.startsWith("stay:")?sharePrefs.stay:sharePrefs.picks);
    const itinerary=sharePrefs.itinerary?selectedItinerary({...plan,stopDetails},itineraryPicks).days:"";
    const itineraryText=itinerary?`\n\nDay-by-day:\n${itinerary.map((day,index)=>`Day ${index+1}: ${day[0]} — ${day[1]}${day[2]?.length?` Selected schedule: ${day[2].map(item=>`${item.label}: ${item.name}${item.time?` at ${formatClock(item.time)}`:""}`).join("; ")}.`:""}${day[3]?` ${day[3]}`:""}`).join("\n")}`:"";
    return`${shareSummary}${stayLine}${groupPicks}${itineraryText}\n\nBuild your own Oregon Dunes plan: ${plannerUrl}`
  };
  const closeShare=()=>{shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false");shareButton.focus()};
  closeShareButton.addEventListener("click",closeShare);
  shareMenu.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();closeShare()}});
  const emailLink=document.getElementById("shareEmail");
  const textLink=document.getElementById("shareText");
  const refreshShareLinks=()=>{const shareMessage=buildShareMessage();emailLink.href=`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`;textLink.href=`sms:?&body=${encodeURIComponent(shareMessage)}`};
  const refreshItinerary=()=>{
    const itinerary=selectedItinerary(plan,selectedPlanStops()),itineraryElement=document.getElementById("tripItinerary"),itineraryNote=document.getElementById("itinerarySelectionNote");
    if(itineraryElement)itineraryElement.innerHTML=itinerary.days.map((day,index)=>`<article class="day-card"><div class="day-number"><span>DAY</span><b>${index+1}</b></div><div class="day-copy"><h3>${day[0]}</h3><p>${day[1]}</p>${day[2]?.length?`<div class="day-schedule">${day[2].map(item=>`<div><span>${escapeHtml(item.label)}</span><b>${escapeHtml(item.name)}</b>${item.time?`<small>${formatClock(item.time)}</small>`:""}</div>`).join("")}</div>`:""}${day[3]?`<p class="timing-warning"><b>Timing suggestion</b>${escapeHtml(day[3].replace(/^Timing check:\s*/,""))}</p>`:""}</div></article>`).join("");
    if(itineraryNote)itineraryNote.textContent=itinerary.note
  };
  const refreshSelectionSummary=()=>{
    const summary=document.getElementById("answerSummaryChips");if(!summary)return;
    summary.innerHTML=selectionSummaryItems(plan,selectedPlanStops()).map(item=>`<span><small>${item[0]}</small><b>${item[1]}</b></span>`).join("")
  };
  const refreshStopDetailPrints=()=>{
    const details=readStopDetails();
    result.querySelectorAll("[data-stop-print]").forEach(output=>{const detail=details[output.dataset.stopPrint]||{},parts=[];if(detail.day)parts.push(`Day ${detail.day}`);if(detail.time)parts.push(`${plan.planningGroup?"Meeting":"Planned"} time: ${formatClock(detail.time)}`);if(detail.reservation)parts.push(`Reservation: ${detail.reservation}`);if(detail.confirmation)parts.push(`Confirmation: ${detail.confirmation}`);if(detail.note)parts.push(`Note: ${detail.note}`);output.textContent=parts.join(" · ")})
  };
  const confirmationInput=document.getElementById("stayConfirmation");
  const sharePrefInputs=[...result.querySelectorAll(".share-pref")];
  const shareStayPref=document.getElementById("shareStayPref"),shareDetailsPref=document.getElementById("shareDetailsPref"),shareConfirmationPref=document.getElementById("shareConfirmationPref");
  const syncSharePrefAvailability=()=>{
    const details=readStopDetails(),values=Object.values(details);
    const hasPrivateDetails=values.some(detail=>detail.reservation||detail.note);
    const hasConfirmation=Boolean(shareStayPref?.checked&&confirmationInput?.value.trim())||values.some(detail=>detail.confirmation);
    if(shareDetailsPref)shareDetailsPref.disabled=!hasPrivateDetails;
    if(shareConfirmationPref)shareConfirmationPref.disabled=!hasConfirmation
  };
  const updateSharePrefs=()=>{
    sharePrefInputs.forEach(input=>sharePrefs[input.dataset.sharePref]=input.checked);
    plan.sharePrefs={...sharePrefs};
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.sharePrefs=plan.sharePrefs;saveTrip(savedData)}catch{}}
    syncSharePrefAvailability();
    refreshShareLinks()
  };
  const updateStopDetails=()=>{
    plan.stopDetails=readStopDetails();
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.stopDetails=plan.stopDetails;saveTrip(savedData)}catch{}}
    refreshStopDetailPrints();
    syncSharePrefAvailability();
    refreshItinerary();
    refreshShareLinks()
  };
  const updateStayConfirmation=()=>{
    if(!confirmationInput)return;
    plan.stayConfirmation=confirmationInput.value.trim();
    const confirmationPrint=document.getElementById("stayConfirmationPrint");
    if(confirmationPrint)confirmationPrint.textContent=plan.stayConfirmation?`Confirmation number: ${plan.stayConfirmation}`:"";
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.stayConfirmation=plan.stayConfirmation;saveTrip(savedData)}catch{}}
    syncSharePrefAvailability();
    refreshShareLinks()
  };
  const updatePlannedStops=()=>{
    const picks=selectedPlanStops(),status=document.getElementById("plannedStopsStatus");
    const stayPick=picks.find(item=>item.key.startsWith("stay:")),otherPicks=picks.filter(item=>!item.key.startsWith("stay:")),stayStatus=document.getElementById("plannedStayStatus");
    const stayPanel=document.getElementById("stayConfirmationPanel"),staySummary=document.getElementById("staySummary");
    plan.plannedStops=picks.map(item=>item.key);
    if(status)status.textContent=otherPicks.length?`${otherPicks.length} ${plan.planningGroup?"group":"trip"} pick${otherPicks.length===1?"":"s"} will be included when this plan is shared.`:`No ${plan.planningGroup?"group":"trip"} picks selected yet.`;
    if(stayStatus)stayStatus.textContent=stayPick?"Your selected stay will be included when this plan is printed or shared.":"No stay option selected yet.";
    if(stayPanel)stayPanel.hidden=!stayPick;
    if(staySummary)staySummary.textContent=stayPick?`You are staying at "${stayPick.name}".`:"";
    result.querySelectorAll(".planned-stop-details").forEach(panel=>panel.hidden=!plan.plannedStops.includes(panel.dataset.stopKey));
    const saved=readSavedTrip();
    if(saved){try{const savedData=JSON.parse(saved);savedData.plannedStops=plan.plannedStops;saveTrip(savedData)}catch{}}
    syncSharePrefAvailability();
    refreshSelectionSummary();
    refreshItinerary();
    refreshShareLinks()
  };
  result.querySelectorAll(".plan-stop-checkbox").forEach(input=>input.addEventListener("change",updatePlannedStops));
  result.querySelectorAll(".stop-detail-input").forEach(input=>input.addEventListener("input",updateStopDetails));
  result.querySelectorAll("select.stop-detail-input").forEach(input=>input.addEventListener("change",updateStopDetails));
  sharePrefInputs.forEach(input=>input.addEventListener("change",updateSharePrefs));
  if(confirmationInput)confirmationInput.addEventListener("input",updateStayConfirmation);
  updateSharePrefs();
  updateStopDetails();
  updateStayConfirmation();
  updatePlannedStops();
  shareButton.addEventListener("click",()=>{const opening=shareMenu.hidden;refreshShareLinks();shareMenu.hidden=!opening;shareButton.setAttribute("aria-expanded",String(opening));shareFeedback.textContent="";if(opening){window.odgTrack("planner_share_open");closeShareButton.focus()}});
  emailLink.addEventListener("click",()=>{window.odgTrack("planner_share_email");shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false")});
  textLink.addEventListener("click",()=>{window.odgTrack("planner_share_text");shareMenu.hidden=true;shareButton.setAttribute("aria-expanded","false")});
  document.getElementById("shareMessenger").addEventListener("click",async event=>{
    event.preventDefault();
    window.odgTrack("planner_share_messenger");
    const message=buildShareMessage();
    if(navigator.share){
      try{
        await navigator.share({title:shareTitle,text:message});
        shareFeedback.textContent="Shared through your device.";
        shareMenu.hidden=true;
        shareButton.setAttribute("aria-expanded","false");
        return
      }catch(error){if(error?.name==="AbortError"){shareFeedback.textContent="Share canceled.";return}}
    }
    let copied=false;
    try{await navigator.clipboard.writeText(message);copied=true}catch{}
    const messengerWindow=window.open("https://www.facebook.com/messages/","_blank","noopener,noreferrer");
    shareFeedback.textContent=messengerWindow?(copied?"Your trip was copied. Choose a Facebook Messages conversation and paste it.":"Facebook Messages opened, but this browser blocked copying. Email and Text remain available here."):"Your browser blocked Facebook Messages. Allow pop-ups or use Email or Text."
  });
  document.getElementById("editPlan").addEventListener("click",()=>{document.getElementById("tripPlannerForm").scrollIntoView({behavior:"smooth"})});
  document.getElementById("editAnswersSummary").addEventListener("click",()=>{document.getElementById("tripPlannerForm").scrollIntoView({behavior:"smooth"})});
  loadPlannerWeather(plan);
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
function restoreTrip(form,data){
  Object.entries(data||{}).forEach(([key,value])=>{if(["toys","crew","interests"].includes(key)){form.querySelectorAll(`input[name="${key}"]`).forEach(x=>x.checked=value.includes(x.value))}else if(key==="planningGroup"){const field=form.elements[key];if(field)field.checked=Boolean(value)}else{const radio=form.querySelector(`input[type="radio"][name="${key}"][value="${value}"]`);if(radio){radio.checked=true;return}const field=form.elements[key];if(field&&typeof field.value!=="undefined")field.value=value}});
}
function readSavedTrip(){try{return window.localStorage.getItem("odfg-trip")}catch{return null}}
function saveTrip(data){try{window.localStorage.setItem("odfg-trip",JSON.stringify(data));return true}catch{return false}}
function clearSavedTrip(){try{window.localStorage.removeItem("odfg-trip")}catch{}}
function setupPlanner(){
  const form=document.getElementById("tripPlannerForm");if(!form)return;
  const error=document.getElementById("plannerError"),saved=readSavedTrip();
  const toyInputs=[...form.querySelectorAll('input[name="toys"]')],noMachines=toyInputs.find(input=>input.value==="none");
  toyInputs.forEach(input=>input.addEventListener("change",()=>{
    if(input===noMachines&&input.checked)toyInputs.forEach(other=>{if(other!==noMachines)other.checked=false});
    else if(input!==noMachines&&input.checked&&noMachines)noMachines.checked=false
  }));
  if(saved){try{const data=JSON.parse(saved);restoreTrip(form,data);renderTrip(buildTrip(data))}catch{}}
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=collectTrip(form);error.textContent="";
    if(!data.arrival||!data.departure){error.textContent="Please choose arrival and departure dates.";return}
    if(new Date(data.departure)<new Date(data.arrival)){error.textContent="Departure cannot be before arrival.";return}
    if(data.toys.includes("none")&&data.toys.length>1){error.textContent='Choose "No machines" or select the machines you are bringing, not both.';return}
    if(!data.toys.length)data.toys=["none"];
    const previousSaved=readSavedTrip();
    if(previousSaved){try{
      const previous=JSON.parse(previousSaved),previousPlan=buildTrip(previous),nextPlan=buildTrip(data);
      data.sharePrefs=previous.sharePrefs;
      if(previousPlan.regionKey===nextPlan.regionKey&&previous.tripType===data.tripType&&previous.vehicle===data.vehicle){
        data.plannedStops=previous.plannedStops;
        data.stopDetails=previous.stopDetails;
        data.stayConfirmation=previous.stayConfirmation
      }
    }catch{}}
    const builtPlan=buildTrip(data);
    window.odgTrack("planner_build",{trip_days:builtPlan.days,planning_group:data.planningGroup?"yes":"no"});
    [
      `planner_region_${builtPlan.regionKey}`,
      `planner_stay_${data.tripType}`,
      `planner_vehicle_${data.vehicle}`,
      `planner_dog_${data.crew?.includes("dog")?"yes":"no"}`,
      `planner_rental_${data.rentalType||"none"}`,
      ...(data.interests||[]).map(value=>`planner_interest_${value}`)
    ].forEach(name=>window.odgTrack(name.toLowerCase().replace(/[^a-z0-9_]/g,"_").slice(0,40)));
    saveTrip(data);renderTrip(builtPlan)
  });
  form.addEventListener("change",()=>{
    try{
      if(!sessionStorage.getItem("odg-planner-started")){
        sessionStorage.setItem("odg-planner-started","1");
        window.odgTrack("planner_start")
      }
    }catch{}
  },{once:true});
  document.getElementById("clearTrip").addEventListener("click",()=>{window.odgTrack("planner_clear");clearSavedTrip();form.reset();document.getElementById("tripPlan").hidden=true;error.textContent=""});
}
function normalizeLegacyGuideUrl(){
  if(document.body.dataset.page!=="guide"||document.body.dataset.topic)return;
  const topic=new URLSearchParams(location.search).get("topic")||"camping";
  const destinations={camping:"camping.html",riding:"ohv-riding.html",safety:"safety.html",permits:"permits.html",towns:"nearby-towns.html",wildlife:"wildlife.html",conditions:"current-conditions.html",planner:"planner.html"};
  if(!destinations[topic])return;
  document.body.dataset.topic=topic;
  history.replaceState(history.state,"",destinations[topic]);
}
function setupAnalyticsEvents(){
  const pageCategory=document.body.dataset.page||document.body.dataset.topic||location.pathname.split("/").pop()?.replace(".html","")||"home";
  window.odgTrack("page_category_view",{page_category:pageCategory});
  document.addEventListener("click",event=>{
    const link=event.target.closest("a[href]");
    const button=event.target.closest("button");
    if(link){
      let url;
      try{url=new URL(link.href,location.href)}catch{return}
      const text=(link.textContent||link.getAttribute("aria-label")||"").trim().replace(/\s+/g," ").slice(0,100);
      if(url.protocol==="tel:")window.odgTrack("phone_click",{link_text:text});
      else if(url.protocol==="mailto:")window.odgTrack("email_click",{link_text:text});
      else if(/google\.com\/maps|maps\.apple\.com/i.test(url.href))window.odgTrack("directions_click",{link_domain:url.hostname,link_text:text});
      else if(/^https?:$/.test(url.protocol)&&url.origin!==location.origin)window.odgTrack("outbound_click",{link_domain:url.hostname,link_path:url.pathname.slice(0,100),link_text:text})
    }
    const filter=event.target.closest("[data-filter]");
    const basemap=event.target.closest("[data-basemap]");
    if(filter)window.odgTrack("map_filter",{map_filter:filter.dataset.filter});
    if(basemap)window.odgTrack("map_layer",{map_layer:basemap.dataset.basemap});
    if(button?.matches("[data-share], .share-button, #sharePage"))window.odgTrack("page_share_open",{page_category:pageCategory})
  });
  const thresholds=[25,50,75,90],seen=new Set();
  let ticking=false;
  addEventListener("scroll",()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      const available=document.documentElement.scrollHeight-innerHeight;
      const depth=available>0?Math.round(scrollY/available*100):100;
      thresholds.forEach(value=>{if(depth>=value&&!seen.has(value)){seen.add(value);window.odgTrack("scroll_depth",{percent_scrolled:value})}});
      ticking=false
    })
  },{passive:true})
}
function setupPlannerFeedback(){
  const form=document.getElementById("plannerFeedbackForm");
  const status=document.getElementById("plannerFeedbackStatus");
  if(!form||!status)return;
  const params=new URLSearchParams(location.search);
  if(params.get("feedback")==="thanks"){
    status.textContent="Thank you—your feedback was sent.";
    status.classList.add("success")
  }
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const button=form.querySelector("button[type=submit]");
    const formData=new FormData(form);
    button.disabled=true;
    status.classList.remove("success","error");
    status.textContent="Sending your feedback…";
    try{
      const submission=await fetch("/",{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams(formData).toString()
      });
      if(!submission.ok)throw new Error("Submission failed");
      window.odgTrack("feedback_submit",{feedback_type:String(formData.get("feedback-type")||"").slice(0,40),feedback_rating:String(formData.get("rating")||"").slice(0,20)});
      form.reset();
      status.textContent="Thank you—your feedback was sent. Your opinion really does matter to us.";
      status.classList.add("success")
    }catch{
      status.textContent="Your feedback could not be sent just now. Please try again in a moment.";
      status.classList.add("error")
    }finally{button.disabled=false}
  })
}
function setupHomeFeedback(){
  const dialog=document.getElementById("homeFeedbackDialog");
  const openButton=document.getElementById("openHomeFeedback");
  const closeButton=document.getElementById("closeHomeFeedback");
  const form=document.getElementById("homeFeedbackForm");
  const status=document.getElementById("homeFeedbackStatus");
  if(!dialog||!openButton||!closeButton||!form||!status)return;
  const openDialog=()=>{
    if(typeof dialog.showModal==="function")dialog.showModal();
    else dialog.setAttribute("open","");
    document.body.classList.add("site-feedback-open");
    window.odgTrack("site_feedback_open",{page_category:"home"});
    setTimeout(()=>form.querySelector("select")?.focus(),30)
  };
  const closeDialog=()=>{
    if(typeof dialog.close==="function")dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("site-feedback-open");
    openButton.focus()
  };
  openButton.addEventListener("click",openDialog);
  closeButton.addEventListener("click",closeDialog);
  dialog.addEventListener("close",()=>document.body.classList.remove("site-feedback-open"));
  dialog.addEventListener("click",event=>{if(event.target===dialog)closeDialog()});
  const params=new URLSearchParams(location.search);
  if(params.get("feedback")==="thanks"){
    openDialog();
    status.textContent="Thank you - your thoughts were sent.";
    status.classList.add("success")
  }
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const button=form.querySelector("button[type=submit]");
    const formData=new FormData(form);
    button.disabled=true;
    status.classList.remove("success","error");
    status.textContent="Sending your thoughts...";
    try{
      const submission=await fetch("/",{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams(formData).toString()
      });
      if(!submission.ok)throw new Error("Submission failed");
      window.odgTrack("site_feedback_submit",{feedback_type:String(formData.get("feedback-type")||"").slice(0,40)});
      form.reset();
      status.textContent="Thank you - your thoughts were sent. We appreciate you helping us improve the guide.";
      status.classList.add("success")
    }catch{
      status.textContent="Your message could not be sent just now. Please try again in a moment.";
      status.classList.add("error")
    }finally{button.disabled=false}
  })
}
document.addEventListener("DOMContentLoaded",()=>{normalizeLegacyGuideUrl();setupPlanner();setupMenu();setupShareControls();renderEnhancedGuide();renderMap();setupAnalyticsEvents();setupPlannerFeedback();setupHomeFeedback()});
