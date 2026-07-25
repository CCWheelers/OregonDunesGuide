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
