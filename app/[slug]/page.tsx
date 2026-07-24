import { notFound } from "next/navigation";
import Link from "next/link";
import { pages } from "../data";
import { SiteHeader } from "../site-header";
import type { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(pages).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.eyebrow, description: page.intro } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <main className="guide-page">
    <SiteHeader />
    <section className={`guide-hero guide-${slug}`}>
      <div className="page-shell">
        <p className="kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>
    </section>
    <div className="guide-layout page-shell">
      <aside><p>IN THIS GUIDE</p>{page.sections.map((s, i) => <a href={`#section-${i}`} key={s.title}><span>0{i + 1}</span>{s.title}</a>)}</aside>
      <div className="guide-content">
        {page.sections.map((section, i) => <section id={`section-${i}`} key={section.title}>
          <span className="section-number">0{i + 1}</span>
          <h2>{section.title}</h2><p>{section.text}</p>
          {section.items && <ul>{section.items.map(item => <li key={item}><b>✓</b>{item}</li>)}</ul>}
        </section>)}
      </div>
    </div>
    <section className="chapter-links page-shell">
      <p className="section-label">KEEP EXPLORING</p>
      <div>
        <Link href="/trail-maps"><span>MAPS</span><b>Open the interactive coast overview</b></Link>
        <Link href="/camping"><span>STAY</span><b>Compare camp styles and regions</b></Link>
        <Link href="/nearby-towns"><span>LOCAL</span><b>Choose the right gateway town</b></Link>
        <Link href="/wildlife"><span>HABITAT</span><b>Travel with more awareness</b></Link>
      </div>
    </section>
    <section className="next-step"><div className="page-shell"><div><small>KEEP PLANNING</small><h2>Ready for the next detail?</h2></div><Link href={slug === "trip-planner" ? "/current-conditions" : "/trip-planner"} className="button ink">Continue your plan ↗</Link></div></section>
    <footer><div className="page-shell"><Link href="/" className="back-link">← Back home</Link><p>Independent planning guide · Verify current details with official sources.</p><Link className="footer-brand" href="/" aria-label="Oregon Dunes Guide home"><img src="/images/oregon-dunes-guide-logo-transparent.png" alt="Oregon Dunes Guide" width={2075} height={758} /></Link></div></footer>
  </main>;
}
