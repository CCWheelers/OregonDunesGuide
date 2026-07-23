import { notFound } from "next/navigation";
import Link from "next/link";
import { pages } from "../data";
import { SiteHeader } from "../site-header";

export function generateStaticParams() {
  return Object.keys(pages).map(slug => ({ slug }));
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
    <section className="next-step"><div className="page-shell"><div><small>KEEP PLANNING</small><h2>Ready for the next detail?</h2></div><Link href={slug === "trip-planner" ? "/current-conditions" : "/trip-planner"} className="button ink">Continue your plan ↗</Link></div></section>
    <footer><div className="page-shell"><Link href="/" className="back-link">← Back home</Link><p>Independent planning guide · Verify current details with official sources.</p><span>Oregon Dunes Field Guide</span></div></footer>
  </main>;
}
