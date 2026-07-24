"use client";

import { useMemo, useState } from "react";

type Place = {
  id: string; name: string; region: "Florence" | "Winchester Bay" | "Coos Bay";
  type: "town" | "staging" | "campground" | "riding"; top: number; side: number;
  summary: string; access: string; bestFor: string; maps: string;
};

const places: Place[] = [
  { id:"florence", name:"Florence", region:"Florence", type:"town", top:7, side:42, summary:"The north gateway: groceries, fuel, rentals, lodging, and easy access to dunes and lakes.", access:"US 101 · north zone services", bestFor:"First-time bases and mixed-interest groups", maps:"https://www.google.com/maps/search/?api=1&query=Florence%2C%20Oregon" },
  { id:"south-jetty", name:"South Jetty", region:"Florence", type:"staging", top:14, side:27, summary:"A principal Florence-area day-use access point for the northern riding zone.", access:"South Jetty Road", bestFor:"Day rides and broad north-zone access", maps:"https://www.google.com/maps/search/?api=1&query=South%20Jetty%20OHV%20Staging%20Area%20Oregon" },
  { id:"honeyman", name:"Honeyman State Park", region:"Florence", type:"campground", top:20, side:65, summary:"Large state-park campground between freshwater lakes and dunes, close to Florence.", access:"US 101 south of Florence", bestFor:"Families, lake time, and developed camping", maps:"https://www.google.com/maps/search/?api=1&query=Jessie%20M.%20Honeyman%20Memorial%20State%20Park" },
  { id:"siltcoos", name:"Siltcoos", region:"Florence", type:"riding", top:27, side:33, summary:"A varied northern riding area with sand access, forest edges, and designated routes.", access:"Siltcoos access roads", bestFor:"Riders who want varied terrain", maps:"https://www.google.com/maps/search/?api=1&query=Siltcoos%20OHV%20Oregon" },
  { id:"eel-creek", name:"Eel Creek Campground", region:"Winchester Bay", type:"campground", top:40, side:64, summary:"Forested Forest Service campground with a trail leading toward open dunes.", access:"Off US 101 near Lakeside", bestFor:"Walk-in dune access and a quieter base", maps:"https://www.google.com/maps/search/?api=1&query=Eel%20Creek%20Campground%20Oregon" },
  { id:"umpqua", name:"Umpqua Dunes", region:"Winchester Bay", type:"riding", top:49, side:29, summary:"The dramatic central zone, known for large open dunes and a riding-focused atmosphere.", access:"Winchester Bay approaches", bestFor:"Experienced riders and big-sand scenery", maps:"https://www.google.com/maps/search/?api=1&query=Umpqua%20Dunes%20Oregon" },
  { id:"winchester", name:"Winchester Bay", region:"Winchester Bay", type:"town", top:55, side:58, summary:"A compact harbor community near the central dunes, with fuel, food, lodging, and marina services.", access:"US 101 · central gateway", bestFor:"Riding weekends and harbor evenings", maps:"https://www.google.com/maps/search/?api=1&query=Winchester%20Bay%2C%20Oregon" },
  { id:"spinreel", name:"Spinreel", region:"Coos Bay", type:"campground", top:67, side:31, summary:"OHV-oriented Forest Service campground and staging access near the southern riding network.", access:"Spinreel Road", bestFor:"Ride-from-camp trips", maps:"https://www.google.com/maps/search/?api=1&query=Spinreel%20Campground%20Oregon" },
  { id:"horsfall", name:"Horsfall", region:"Coos Bay", type:"staging", top:76, side:64, summary:"Major access area near North Bend with campgrounds, day use, and routes into the southern dunes.", access:"Horsfall Beach Road", bestFor:"Flexible staging and group meetups", maps:"https://www.google.com/maps/search/?api=1&query=Horsfall%20OHV%20Staging%20Area" },
  { id:"coos", name:"Coos Bay / North Bend", region:"Coos Bay", type:"town", top:87, side:40, summary:"The south coast service hub, with the broadest selection of food, supplies, repairs, and lodging.", access:"US 101 · southern gateway", bestFor:"Full services and longer stays", maps:"https://www.google.com/maps/search/?api=1&query=Coos%20Bay%2C%20Oregon" },
  { id:"riley", name:"Riley Ranch", region:"Coos Bay", type:"campground", top:94, side:67, summary:"County campground and OHV staging base south of the main Horsfall approaches.", access:"South of Coos Bay", bestFor:"Groups, trailers, and southern-zone access", maps:"https://www.google.com/maps/search/?api=1&query=Riley%20Ranch%20County%20Park%20Oregon" },
];

const types = [["all","All places"],["staging","Staging"],["campground","Camping"],["riding","Riding zones"],["town","Towns"]] as const;

export function MapExplorer() {
  const [filter, setFilter] = useState<(typeof types)[number][0]>("all");
  const [activeId, setActiveId] = useState("south-jetty");
  const visible = useMemo(() => places.filter(p => filter === "all" || p.type === filter), [filter]);
  const active = places.find(p => p.id === activeId) ?? visible[0] ?? places[0];
  return <section className="map-explorer" aria-label="Interactive Oregon Dunes planning overview">
    <div className="map-toolbar">
      <div><small>FILTER THE OVERVIEW</small><div className="map-filters">{types.map(([value,label]) => <button className={filter === value ? "active" : ""} key={value} onClick={() => { setFilter(value); const first = places.find(p => value === "all" || p.type === value); if (first) setActiveId(first.id); }}>{label}</button>)}</div></div>
      <p>Planning overview only—not a navigation map. Use current official Forest Service maps in the field.</p>
    </div>
    <div className="map-grid">
      <div className="map-canvas">
        <div className="ocean-label">PACIFIC<br />OCEAN</div><div className="coast-line" /><div className="forest-band" />
        <div className="map-region region-north"><span>FLORENCE</span></div><div className="map-region region-central"><span>WINCHESTER BAY</span></div><div className="map-region region-south"><span>COOS BAY</span></div>
        <div className="highway">US 101</div>
        {visible.map(place => <button key={place.id} className={`map-marker marker-${place.type} ${active.id === place.id ? "active" : ""}`} style={{ top:`${place.top}%`, left:`${place.side}%` }} onClick={() => setActiveId(place.id)} aria-label={`${place.name}, ${place.type}`}><i /><span>{place.name}</span></button>)}
      </div>
      <aside className="map-detail">
        <div className={`place-type type-${active.type}`}>{active.type}</div><p className="map-region-name">{active.region} region</p><h2>{active.name}</h2><p>{active.summary}</p>
        <dl><div><dt>Access</dt><dd>{active.access}</dd></div><div><dt>Best for</dt><dd>{active.bestFor}</dd></div></dl>
        <a className="button ink" href={active.maps} target="_blank" rel="noreferrer">Open directions ↗</a>
      </aside>
    </div>
  </section>;
}
