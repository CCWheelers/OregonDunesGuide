import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the complete Oregon Dunes Guide homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/index.html");
  const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Oregon Dunes Guide<\/title>/i);
  assert.match(html, /Where the forest/);
  assert.match(html, /Explore the full guide/i);
  assert.match(html, /href="maps\.html"/);
  assert.match(html, /href="nearby-towns\.html"/);
  assert.match(html, /href="wildlife\.html"/);
  assert.match(html, /id="openHomeFeedback"/);
  assert.match(html, /name="site-feedback"/);
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /Help us build the best Oregon Dunes guide/i);
  assert.doesNotMatch(html, /Made for the long way home/i);
  const siteSource = await readFile(new URL("../static/site.js", import.meta.url), "utf8");
  assert.match(siteSource, /function setupHomeFeedback/);
  assert.match(siteSource, /site_feedback_submit/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the dedicated maps page and interactive explorer", async () => {
  const response = await render("/trail-maps");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Read the coast/);
  assert.match(html, /South Jetty/);
  assert.match(html, /Winchester Bay/);
  assert.match(html, /Horsfall/);
  assert.match(html, /Forest Service OHV hub/);
  assert.match(html, /FILTER THE OVERVIEW/);
});

test("declares every main navigation destination", async () => {
  const [header, data, mapPage] = await Promise.all([
    readFile(new URL("../app/site-header.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/trail-maps/page.tsx", import.meta.url), "utf8"),
  ]);
  for (const route of ["/camping","/ohv-riding","/trail-maps","/nearby-towns","/wildlife","/trip-planner"]) {
    assert.ok(header.includes(route) || mapPage.includes(route), `${route} is linked`);
  }
  assert.ok(!header.includes('["Safety", "/safety"]'), "Safety stays out of the crowded main navigation");
  for (const slug of ["camping","ohv-riding","safety","nearby-towns","wildlife","trip-planner"]) {
    assert.ok(data.includes(slug), `${slug} has guide content`);
  }
});

test("renders the expanded nearby towns guide with four distinct visitor bases", async () => {
  const source = await readFile(new URL("../static/site.js", import.meta.url), "utf8");
  for (const expected of [
    "function renderTownsGuide",
    "Florence",
    "Winchester Bay & Reedsport",
    "Lakeside",
    "Coos Bay & North Bend",
    "Arrival-day essentials",
    "Old-Town-Parking",
    "discoverwinchesterbay.com/sandguide",
    "towns-gateway-photo",
  ]) {
    assert.ok(source.includes(expected), `town guide includes ${expected}`);
  }
  assert.match(source, /key!==["']camping["']&&key!==["']towns["']/);
  assert.match(source, /camp-region-florence\.webp/);
  assert.match(source, /map-lakeside\.webp/);
});

test("renders the expanded wildlife guide with dedicated imagery and official viewing resources", async () => {
  const source = await readFile(new URL("../static/site.js", import.meta.url), "utf8");
  for (const expected of [
    "function renderWildlifeGuide",
    "Western snowy plover",
    "Roosevelt elk",
    "Lakes & wetlands",
    "Marine life from shore",
    "Dean Creek Elk Viewing Area",
    "South Slough",
    "wildlife-snowy-plover.webp",
    "wildlife-harbor-seals.webp",
  ]) {
    assert.ok(source.includes(expected), `wildlife guide includes ${expected}`);
  }
  assert.match(source, /key!==["']wildlife["']/);
});

test("renders a focused safety fieldbook without adding Safety to the main navigation", async () => {
  const [source, html] = await Promise.all([
    readFile(new URL("../static/site.js", import.meta.url), "utf8"),
    readFile(new URL("../safety.html", import.meta.url), "utf8"),
  ]);
  for (const expected of [
    "function renderSafetyGuide",
    "Come home with the whole crew",
    "Safety is a system, not a speech",
    "Razorback / slip face",
    "Nobody becomes the missing rider",
    "Serious injury or immediate danger",
    "Emergency SOS via satellite",
    "support.apple.com/en-us/101573",
    "Oregon ATV Guide",
    "hero-safety-v2.webp",
  ]) {
    assert.ok(source.includes(expected), `safety fieldbook includes ${expected}`);
  }
  assert.match(source, /key!==["']safety["']/);
  assert.match(html, /Oregon Dunes Safety Fieldbook \| Oregon Dunes Guide/);
  assert.doesNotMatch(html, /<nav[^>]*>[\s\S]*?href="safety\.html"/i);
});

test("renders the current conditions command center with live weather and official status sources", async () => {
  const [source, html] = await Promise.all([
    readFile(new URL("../static/site.js", import.meta.url), "utf8"),
    readFile(new URL("../current-conditions.html", import.meta.url), "utf8"),
  ]);
  for (const expected of [
    "function renderConditionsGuide",
    "function loadConditionsWeather",
    "Check what changed",
    "LIVE REGIONAL WEATHER",
    "Open Siuslaw alerts",
    "Open TripCheck",
    "Fire & Smoke Map",
    "The morning-of conditions check",
    "api.open-meteo.com",
  ]) {
    assert.ok(source.includes(expected), `current conditions guide includes ${expected}`);
  }
  assert.match(source, /key!==["']conditions["']/);
  assert.match(html, /Current Conditions \| Oregon Dunes Guide/);
});
