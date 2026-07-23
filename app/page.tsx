import Link from "next/link";
import { SiteHeader } from "./site-header";

const planCards = [
  { href: "/camping", icon: "△", eyebrow: "Stay awhile", title: "Camp among the pines", text: "Find developed campgrounds, quiet forest sites, and spots with direct dune access." },
  { href: "/ohv-riding", icon: "⌁", eyebrow: "Ride responsibly", title: "Choose your riding zone", text: "Match your skill level to open sand, forest trails, and designated routes." },
  { href: "/trail-maps", icon: "⌖", eyebrow: "Know the terrain", title: "Map the day", text: "Orient around Florence, Winchester Bay, and Coos Bay before wheels hit sand." },
];

const updates = [
  ["WEATHER", "Marine layer early, clearing inland", "Typical coastal conditions can shift quickly. Carry a wind layer and check the official forecast before leaving."],
  ["TRAIL NOTE", "Seasonal closures protect habitat", "Respect signed closures and restoration areas. They can change throughout the year."],
  ["RIDER READY", "Flag, permit, and spark arrestor", "Use the pre-ride checklist to confirm your vehicle and gear are ready for Oregon’s dunes."],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-content">
          <p className="kicker">OREGON’S WILD COAST · 40+ MILES OF DUNES</p>
          <h1>Where the forest<br />meets the <em>sand.</em></h1>
          <p className="hero-copy">A practical field guide to camping, riding, and wandering the Oregon Dunes—made for unhurried weekends and well-planned adventures.</p>
          <div className="hero-actions">
            <Link className="button light" href="/trip-planner">Plan your trip ↗</Link>
            <Link className="text-link" href="/current-conditions">View current conditions <span>→</span></Link>
          </div>
        </div>
        <div className="hero-facts">
          <div><span>01</span><b>Florence</b><small>North dunes & lakes</small></div>
          <div><span>02</span><b>Winchester Bay</b><small>Tall dunes & riding</small></div>
          <div><span>03</span><b>Coos Bay</b><small>Forest trails & coast</small></div>
        </div>
      </section>

      <section className="intro page-shell">
        <p className="section-label">START HERE</p>
        <div className="intro-grid">
          <h2>Big landscapes.<br /><i>Small details.</i></h2>
          <div>
            <p className="lead">The largest expanse of coastal sand dunes in North America is full of contrasts: wind-shaped ridges, quiet lakes, old forests, and open riding areas.</p>
            <p>We’ve gathered the essentials in one calm, useful place—so you can spend less time sorting tabs and more time outside.</p>
          </div>
        </div>
      </section>

      <section className="plan-grid page-shell">
        {planCards.map(({ href, icon, eyebrow, title, text }, i) => (
          <Link href={href} className={`plan-card card-${i + 1}`} key={href}>
            <div className="card-top"><b>{icon}</b><span>0{i + 1}</span></div>
            <div className="card-copy"><small>{eyebrow}</small><h3>{title}</h3><p>{text}</p><b>Explore guide →</b></div>
          </Link>
        ))}
      </section>

      <section className="conditions">
        <div className="page-shell conditions-grid">
          <div>
            <p className="section-label pale">BEFORE YOU GO</p>
            <h2>Coast-ready,<br /><i>not caught out.</i></h2>
            <p>Conditions on the dunes are dynamic. Check primary sources on the morning of your trip and keep a flexible plan.</p>
            <Link href="/current-conditions" className="button sand">Check conditions ☼</Link>
          </div>
          <div className="update-list">
            {updates.map(([tag, title, text]) => <article key={tag}><span>{tag}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="story page-shell">
        <div className="story-photo"><div className="stamp">OREGON<br /><b>DUNES</b><br />FIELD NOTES</div></div>
        <div className="story-copy">
          <p className="section-label">LOCAL FEATURE</p>
          <h2>Good trips have<br /><i>local roots.</i></h2>
          <blockquote>“Take care of the dunes, and they’ll keep surprising you.”</blockquote>
          <p>Meet South Coast Outfitters, our fictional local-business spotlight: a small Florence shop built around trail knowledge, respectful riding, and gear that earns its place in the truck.</p>
          <Link className="text-link dark" href="/local-business">Read the feature <span>→</span></Link>
        </div>
      </section>

      <section className="trip-strip">
        <div className="page-shell">
          <b className="large-symbol">◫</b>
          <div><small>BUILD A BETTER WEEKEND</small><h2>Your dune trip, in one simple plan.</h2></div>
          <Link className="button ink" href="/trip-planner">Open trip planner ↗</Link>
        </div>
      </section>

      <section className="final-cta">
        <b className="large-symbol">◇</b>
        <p className="section-label pale">LEAVE IT BETTER</p>
        <h2>Ride light. Camp kindly.<br /><i>Stay curious.</i></h2>
        <p>Pack out what you bring, protect signed habitat, and give every visitor room to find their own horizon.</p>
        <Link href="/safety" className="button light">Read safety essentials</Link>
      </section>
      <footer><div className="page-shell"><b>OREGON DUNES<br /><em>FIELD GUIDE</em></b><p>An independent planning guide. Always verify conditions, closures, and regulations with the U.S. Forest Service and Oregon authorities.</p><span>Made for the long way home.</span></div></footer>
    </main>
  );
}
