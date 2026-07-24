import Link from "next/link";
import { SiteHeader } from "../site-header";
import { MapExplorer } from "./map-explorer";

const regionCards = [
  { title:"Florence & Siltcoos", tag:"NORTH", text:"A good introduction to the dunes: lakes, forest campgrounds, South Jetty staging, and varied riding around Siltcoos.", links:["South Jetty access","Honeyman State Park","Siltcoos riding zone"] },
  { title:"Winchester Bay", tag:"CENTRAL", text:"The tallest-feeling open sand and a compact harbor base. Study the Umpqua riding map before entering the big bowls.", links:["Umpqua Dunes","Eel Creek trail access","Umpqua Lighthouse area"] },
  { title:"Coos Bay & Horsfall", tag:"SOUTH", text:"The broadest service base plus a complex riding network of open sand, forest edges, campgrounds, and staging areas.", links:["Spinreel","Horsfall","Riley Ranch"] },
];

export default function TrailMapsPage() {
  return <main className="maps-page"><SiteHeader />
    <section className="guide-hero map-page-hero"><div className="page-shell"><p className="kicker">MAPS & ORIENTATION</p><h1>Read the coast<br />north to south.</h1><p>Explore the three dune regions, compare staging areas and campgrounds, then pair this overview with current official motor-vehicle and closure maps.</p></div></section>
    <div className="page-shell map-wrap"><MapExplorer /></div>
    <section className="region-guide page-shell"><p className="section-label">THREE DISTINCT BASES</p><h2>One coastline.<br /><i>Three trip styles.</i></h2><div className="region-card-grid">{regionCards.map((region, i) => <article key={region.title}><span>0{i+1} · {region.tag}</span><h3>{region.title}</h3><p>{region.text}</p><ul>{region.links.map(x => <li key={x}>{x}</li>)}</ul></article>)}</div></section>
    <section className="map-downloads"><div className="page-shell"><div><p className="section-label pale">TAKE THE RIGHT MAP</p><h2>Overview here.<br /><i>Official map in hand.</i></h2></div><div className="download-list">
      <a href="https://www.fs.usda.gov/r06/siuslaw/recreation/opportunities/highway-vehicles-ohv" target="_blank" rel="noreferrer"><b>Forest Service OHV hub</b><span>Riding areas, notices, and map resources ↗</span></a>
      <a href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5259370.pdf" target="_blank" rel="noreferrer"><b>Oregon Dunes OHV map</b><span>Official riding-area overview PDF ↗</span></a>
      <a href="https://www.oregon.gov/oprd/atv/pages/atv-places-to-ride.aspx" target="_blank" rel="noreferrer"><b>Oregon places to ride</b><span>State riding guidance and resources ↗</span></a>
    </div></div></section>
    <section className="next-step"><div className="page-shell"><div><small>NEXT STEP</small><h2>Match the map to a weekend.</h2></div><Link href="/trip-planner" className="button ink">Build your itinerary ↗</Link></div></section>
    <footer><div className="page-shell"><Link href="/" className="back-link">← Back home</Link><p>Interactive planning overview · Not for backcountry navigation.</p><span>Oregon Dunes Field Guide</span></div></footer>
  </main>;
}
