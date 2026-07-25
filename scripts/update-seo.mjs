import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const origin = "https://oregondunesguide.com";

const pages = [
  { file: "index.html", path: "/", slug: "home", title: "Oregon Dunes Guide", heading: "Oregon Dunes Guide", description: "Plan an Oregon Dunes trip with interactive maps, camping, OHV riding zones, weather, tides, safety guidance, nearby towns, and a personalized trip planner." },
  { file: "camping.html", path: "/camping.html", slug: "camping", title: "Camping | Oregon Dunes Guide", heading: "Oregon Dunes Camping Guide", description: "Compare Oregon Dunes camping by region, camp style, reservations, RV and trailer fit, dog-friendly stays, and legal ride-from-camp access." },
  { file: "ohv-riding.html", path: "/ohv-riding.html", slug: "ohv-riding", title: "OHV Riding | Oregon Dunes Guide", heading: "Oregon Dunes OHV Riding Guide", description: "Compare the Florence, Winchester Bay, and Coos Bay OHV riding zones with staging information, maps, dune-reading tips, equipment, and group protocol." },
  { file: "maps.html", path: "/maps.html", slug: "maps", title: "Maps | Oregon Dunes Guide", heading: "Oregon Dunes Maps", description: "Explore an interactive Oregon Dunes map with riding zones, staging areas, campgrounds, nearby towns, parts stores, terrain views, and GPS directions." },
  { file: "weather.html", path: "/weather.html", slug: "weather", title: "Weather | Oregon Dunes Guide", heading: "Oregon Dunes Weather", description: "Check live weather, wind, rain, fog, and seven-day forecasts for Florence, Winchester Bay, and Coos Bay before visiting the Oregon Dunes." },
  { file: "tides.html", path: "/tides.html", slug: "tides", title: "Tides | Oregon Dunes Guide", heading: "Oregon Dunes Tides", description: "View NOAA tide predictions for Florence, Winchester Bay, and Coos Bay, plus practical guidance for beach access, low-tide riding, and coastal safety." },
  { file: "day-use.html", path: "/day-use.html", slug: "day-use", title: "Day Use | Oregon Dunes Guide", heading: "Oregon Dunes Day-Use Guide", description: "Plan an Oregon Dunes day trip with OHV staging, non-motorized dune walks, lake access, passes, facilities, quiet stops, and beach safety." },
  { file: "gas.html", path: "/gas.html", slug: "gas-prices", title: "Gas Prices | Oregon Dunes Guide", heading: "Gas Prices Near the Oregon Dunes", description: "Find current gas-price resources near Florence, Winchester Bay, Reedsport, and Coos Bay, and estimate fuel needs for an Oregon Dunes trip." },
  { file: "history.html", path: "/history.html", slug: "history", title: "History | Oregon Dunes Guide", heading: "History of the Oregon Dunes", description: "Explore Oregon Dunes history, including Indigenous homelands, dune formation, coastal settlement, Frank Herbert, recreation, conservation, and the national recreation area." },
  { file: "rules.html", path: "/rules.html", slug: "rules", title: "Rules & Regulations | Oregon Dunes Guide", heading: "Oregon Dunes Rules and Regulations", description: "Review Oregon Dunes OHV permits, safety cards, whip flags, helmets, sound limits, required equipment, youth rules, seasonal closures, and official sources." },
  { file: "safety.html", path: "/safety.html", slug: "safety", title: "Dune Safety | Oregon Dunes Guide", heading: "Oregon Dunes Safety Guide", description: "Prepare for Oregon Dunes riding with dune-reading techniques, recovery planning, protective gear, group protocol, youth-rider guidance, and emergency basics." },
  { file: "nearby-towns.html", path: "/nearby-towns.html", slug: "nearby-towns", title: "Nearby Towns | Oregon Dunes Guide", heading: "Towns Near the Oregon Dunes", description: "Compare Florence, Winchester Bay, Reedsport, Coos Bay, North Bend, and Lakeside for lodging, meals, fuel, supplies, repairs, and dune access." },
  { file: "wildlife.html", path: "/wildlife.html", slug: "wildlife", title: "Wildlife & Habitat | Oregon Dunes Guide", heading: "Oregon Dunes Wildlife and Habitat", description: "Learn about Oregon Dunes shorebirds, wetlands, lakes, forest edges, estuaries, seasonal habitat protections, and low-impact wildlife viewing." },
  { file: "permits.html", path: "/permits.html", slug: "permits", title: "Permits & Regulations | Oregon Dunes Guide", heading: "Oregon Dunes Permits", description: "Start with the Oregon ATV permits, safety cards, operator requirements, and official sources that may apply before riding the Oregon Dunes." },
  { file: "current-conditions.html", path: "/current-conditions.html", slug: "current-conditions", title: "Current Conditions | Oregon Dunes Guide", heading: "Oregon Dunes Current Conditions", description: "Check the weather, fire restrictions, campground status, road conditions, beach access, habitat closures, and official alerts before visiting the Oregon Dunes." },
  { file: "planner.html", path: "/planner.html", slug: "trip-planner", title: "Trip Planner | Oregon Dunes Guide", heading: "Oregon Dunes Trip Planner", description: "Build a personalized Oregon Dunes trip with lodging options, riding or town activities, meals, rentals, weather guidance, a checklist, and group sharing." },
  { file: "riding-florence.html", path: "/riding-florence.html", slug: "riding-florence", title: "Florence Riding Map | Oregon Dunes Guide", heading: "Florence Oregon Dunes Riding Map", description: "Plan Florence-area OHV riding from South Jetty to Siltcoos with staging areas, trail starting points, campgrounds, local services, and GPS directions." },
  { file: "riding-winchester-bay.html", path: "/riding-winchester-bay.html", slug: "riding-winchester-bay", title: "Winchester Bay Riding Map | Oregon Dunes Guide", heading: "Winchester Bay and Umpqua Dunes Riding Map", description: "Plan Umpqua Dunes OHV riding near Winchester Bay with staging areas, trail starting points, sand camps, harbor services, and GPS directions." },
  { file: "riding-coos-bay.html", path: "/riding-coos-bay.html", slug: "riding-coos-bay", title: "Coos Bay Riding Map | Oregon Dunes Guide", heading: "Coos Bay Oregon Dunes Riding Map", description: "Plan Coos Bay OHV riding from Spinreel to Horsfall with staging areas, trail starting points, camping, local services, and GPS directions." },
];

const topicPages = new Map([
  ["camping.html", "camping"],
  ["ohv-riding.html", "riding"],
  ["safety.html", "safety"],
  ["nearby-towns.html", "towns"],
  ["wildlife.html", "wildlife"],
  ["permits.html", "permits"],
  ["current-conditions.html", "conditions"],
]);
const pageByFile = new Map(pages.map(page => [page.file, page]));

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function seoBlock(page) {
  const url = `${origin}${page.path}`;
  const image = `${origin}/og/${page.slug}.jpg`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${origin}/#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: page.path === "/" ? [
        { "@type": "ListItem", position: 1, name: "Oregon Dunes Guide", item: `${origin}/` },
      ] : [
        { "@type": "ListItem", position: 1, name: "Oregon Dunes Guide", item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: page.heading, item: url },
      ],
    },
  ];
  if (page.path === "/") {
    graph.unshift(
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Oregon Dunes Guide",
        url: `${origin}/`,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/images/oregon-dunes-guide-logo-transparent.png`,
          width: 656,
          height: 240,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "Oregon Dunes Guide",
        description: page.description,
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: "en-US",
      },
    );
  }
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
  return `  <!-- SEO:START -->
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${url}">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Oregon Dunes Guide">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:secure_url" content="${image}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(page.heading)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="${escapeHtml(page.heading)}">
  <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-ogd-v2.png">
  <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png">
  <link rel="manifest" href="public/site.webmanifest">
  <meta name="theme-color" content="#f5f0e6">
  <script type="application/ld+json">${jsonLd}</script>
  <!-- SEO:END -->`;
}

function removeOldMetadata(source) {
  return source
    .replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "\n")
    .replace(/\s*<title>[\s\S]*?<\/title>\s*/gi, "\n")
    .replace(/\s*<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel="canonical"[^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel="manifest"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+name="theme-color"[^>]*>\s*/gi, "\n")
    .replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "\n");
}

const guideTemplate = await readFile(join(root, "guide.html"), "utf8");
for (const [file, topic] of topicPages) {
  const page = pageByFile.get(file);
  const fallback = `<main id="guideRoot"><section class="guide-hero guide-hero-${topic}"><div class="shell"><p class="kicker">OREGON DUNES GUIDE</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p><p><a class="button light" href="maps.html">Open maps</a> <a class="button sand" href="planner.html">Plan a trip</a></p></div></section></main>`;
  const dedicated = guideTemplate
    .replace('<body data-page="guide">', `<body data-page="guide" data-topic="${topic}">`)
    .replace('<main id="guideRoot"></main>', fallback);
  await writeFile(join(root, file), dedicated, "utf8");
}

for (const page of pages) {
  const filePath = join(root, page.file);
  let source = removeOldMetadata(await readFile(filePath, "utf8"));
  source = source.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1\n${seoBlock(page)}`,
  );
  await writeFile(filePath, source, "utf8");
}

// The legacy query-driven shell remains usable but should not compete with dedicated canonical pages.
{
  const filePath = join(root, "guide.html");
  let source = removeOldMetadata(await readFile(filePath, "utf8"));
  source = source.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1
  <!-- SEO:START -->
  <title>Visitor Guide | Oregon Dunes Guide</title>
  <meta name="description" content="Oregon Dunes visitor guides for camping, OHV riding, safety, permits, nearby towns, wildlife, and current conditions.">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${origin}/camping.html">
  <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-ogd-v2.png">
  <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png">
  <link rel="manifest" href="public/site.webmanifest">
  <meta name="theme-color" content="#f5f0e6">
  <!-- SEO:END -->`,
  );
  await writeFile(filePath, source, "utf8");
}

console.log(`Updated SEO metadata for ${pages.length} canonical pages and the legacy guide shell.`);
