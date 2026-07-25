import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const origin = "https://oregondunesguide.com";
const pages = [
  ["index.html", "/", "home"],
  ["camping.html", "/camping.html", "camping"],
  ["ohv-riding.html", "/ohv-riding.html", "ohv-riding"],
  ["maps.html", "/maps.html", "maps"],
  ["weather.html", "/weather.html", "weather"],
  ["tides.html", "/tides.html", "tides"],
  ["day-use.html", "/day-use.html", "day-use"],
  ["gas.html", "/gas.html", "gas-prices"],
  ["history.html", "/history.html", "history"],
  ["rules.html", "/rules.html", "rules"],
  ["safety.html", "/safety.html", "safety"],
  ["nearby-towns.html", "/nearby-towns.html", "nearby-towns"],
  ["wildlife.html", "/wildlife.html", "wildlife"],
  ["permits.html", "/permits.html", "permits"],
  ["current-conditions.html", "/current-conditions.html", "current-conditions"],
  ["planner.html", "/planner.html", "trip-planner"],
  ["riding-florence.html", "/riding-florence.html", "riding-florence"],
  ["riding-winchester-bay.html", "/riding-winchester-bay.html", "riding-winchester-bay"],
  ["riding-coos-bay.html", "/riding-coos-bay.html", "riding-coos-bay"],
];

const match = (html, pattern, label) => {
  const result = html.match(pattern);
  assert.ok(result, `missing ${label}`);
  return result[1];
};

test("every canonical page has complete, unique search and social metadata", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [file, path, slug] of pages) {
    const html = await readFile(join(root, file), "utf8");
    const title = match(html, /<title>(.*?)<\/title>/s, `${file} title`);
    const description = match(html, /<meta name="description" content="([^"]+)">/, `${file} description`);
    const canonical = match(html, /<link rel="canonical" href="([^"]+)">/, `${file} canonical`);
    const ogImage = match(html, /<meta property="og:image" content="([^"]+)">/, `${file} og:image`);
    assert.ok(title.length <= 65, `${file} title is too long`);
    assert.ok(description.length >= 100 && description.length <= 180, `${file} description length is ${description.length}`);
    assert.equal(canonical, `${origin}${path}`);
    assert.equal(ogImage, `${origin}/og/${slug}.jpg`);
    assert.match(html, /<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.match(html, /<script type="application\/ld\+json">/);
    assert.ok(!titles.has(title), `duplicate title: ${title}`);
    assert.ok(!descriptions.has(description), `duplicate description: ${description}`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("all social images exist and are reasonably sized", async () => {
  for (const [, , slug] of pages) {
    const details = await stat(join(root, "public", "og", `${slug}.jpg`));
    assert.ok(details.size > 25_000, `${slug}.jpg is unexpectedly small`);
    assert.ok(details.size < 1_000_000, `${slug}.jpg is too large for a share card`);
  }
});

test("crawler files list canonical URLs only", async () => {
  const robots = await readFile(join(root, "public", "robots.txt"), "utf8");
  const sitemap = await readFile(join(root, "public", "sitemap.xml"), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, new RegExp(`Sitemap: ${origin.replaceAll(".", "\\.")}/sitemap\\.xml`));
  for (const [, path] of pages) assert.match(sitemap, new RegExp(`<loc>${origin.replaceAll(".", "\\.")}${path.replaceAll(".", "\\.")}</loc>`));
  assert.doesNotMatch(sitemap, /guide\.html\?topic=/);
});

test("canonical pages expose a primary heading and valid internal HTML links", async () => {
  for (const [file] of pages) {
    const html = await readFile(join(root, file), "utf8");
    assert.match(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i, `${file} needs a crawlable h1`);
    const links = [...html.matchAll(/href="([^"]+\.html)(?:[?#][^"]*)?"/g)]
      .map(match => match[1])
      .filter(link => !/^https?:\/\//.test(link));
    for (const link of links) {
      const target = link.startsWith("/") ? link.slice(1) : link;
      await assert.doesNotReject(access(join(root, target)), `${file} links to missing ${target}`);
    }
  }
});
