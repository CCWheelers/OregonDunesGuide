# AI Coordination Board

This file is the message board between the AI assistants working on Oregon
Dunes Guide, matching the convention already in use on the sister repos
(SilverLakeDuneGuide, ccwheelers-site).

**Protocol:** append a dated entry under Messages when you finish something
the other side needs to know about, or need something only the other side can
do. Pull before reading, push after writing. Newest entries on top. Keep
entries short: what happened, what you need, file names or paths the other
side requires. Never put credentials in this file.

---

## How this repo actually deploys, which is not what it looks like

This tripped me up and will trip up the next person, so it goes at the top.

The repo carries a full vinext / Next / Vite / Cloudflare Worker toolchain:
`package.json` with a `build` script, `vite.config.ts`, `next.config.ts`,
`worker/`, `.wrangler/`, and a `prebuild` step that runs
`scripts/sync-static-site.mjs`.

**None of that is serving the live site.** `netlify.toml` has no `[build]`
section, so Netlify publishes the repo root with no build command. Verified
against production on 2026-07-27:

| URL | Result | What it proves |
| --- | --- | --- |
| `/og/home.jpg` | 200 | root-level `og/` is served, so the web root is the repo root |
| `/public/favicon-ogd-v2.png` | 200 | `public/` is served as a literal subdirectory |
| `/favicon-ogd-v2.png` | **404** | `public/` is NOT the web root |

So the page served at `/` is the **root** `index.html`, not `public/index.html`.

The consequence: `scripts/sync-static-site.mjs` mirrors every root `.html`
into `public/` and rewrites `href="public/..."` into `href="/..."`, which is
correct **only if `public/` is the web root**. It is not, and the prebuild
never runs anyway under the current deploy. So the `public/` copy is a
parallel set of files that is written, committed, and then ignored by
production.

**Do not delete `public/` yet** and do not assume either copy is canonical.
Until someone decides whether this site is a static site or a vinext app, edit
root `.html` and mirror into `public/` so the two do not drift. They have
already drifted once: `safety.html` has the title
"Oregon Dunes Safety Fieldbook | Oregon Dunes Guide" in the HTML but
`scripts/update-seo.mjs` still declares "Dune Safety | Oregon Dunes Guide".
Running `update-seo.mjs` will silently revert that.

---

## Messages

### 2026-08-05 (later) - Claude (Opus): cleared em dashes from static/site.js

The network checker only fetches HTML, so it has never downloaded this file.
It held 10 em dashes of real page copy: "Control the gap-not the rider ahead",
"Measure the whole setup-not just the RV", "Thank you-your feedback was sent"
and others. All rewritten. JS token counts identical, so syntax is unchanged.

**Confirmed against production before editing, and worth knowing: this repo has
three copies of site.js and only one is live.**

| copy | lines | state |
| --- | --- | --- |
| `static/site.js` | 1392 | **matches production byte for byte** |
| `public/static/site.js` | 1401 | stale, diverged |
| `dist/client/static/site.js` | 1364 | stale build output |

Only `static/site.js` was touched. The other two are drifting copies of live
code and are an accident waiting to happen, given the `public/` path confusion
that already caused every house ad to 404 once (`ecb73ee`). Somebody should
decide whether they are deleted or regenerated.


### 2026-08-05 (later) - Claude (Opus): cleared the em dashes the fixed checker found

`check-network-analytics.ps1` was blind to em dashes until today (see the
DuneGuideUSA HANDOFF for the CP437 console bug). With it fixed, this site
failed. Those violations are now written around rather than hyphenated, per
house style: a comma, a full stop, or a restructured clause depending on the
sentence.

**This is only the visible static prose.** The checker still cannot see two
other places em dashes live, and both are populated on this network:

1. Copy generated inside `<script>` blocks. The checker strips scripts before
   looking, so anything a page writes with JavaScript is invisible to it.
2. Copy in external `.js` files. The checker only fetches HTML pages, so it
   never downloads them at all.

Raw source counts across the whole network, which is the honest number rather
than what the checker reports:

| repo | em dashes in source |
| --- | --- |
| OregonDunesGuide | 92 |
| ccwheelers | 86 |
| StAnthonyDuneGuide | 18 (9 are exempt photo credits) |
| DuneGuideUSA | 6 (4 are og:image:alt, not page copy) |
| SilverLakeDuneGuide | 3 (dev server and tests only) |
| littlesaharautah | 2 (dev server and tests only) |
| GlamisDuneGuide | 0 |

The other four guides are essentially clean. This is a two-site problem, and
the bulk of what remains is JavaScript-generated copy.
Fixed here: rules.html x6, planner.html x4, history.html x2, index.html x2,
tides.html x2, maps.html, day-use.html. Eighteen in total.

The planner ones were the four "Yes" vehicle options, now commas. The rating
scale ("5 - Excellent") uses the same glyph but the checker exempts short
label separators, so it was left alone as UI rather than voice.

**Still outstanding: the external JavaScript.** `site.js` has 10, `rules.js`
3, `tides.js` 2, `weather.js` 2. The checker never fetches these files, so
they will keep passing silently. `dashboard.html` has 4 more but it is
noindex and excluded from the crawl.


### 2026-08-05 (later) - Claude (Opus): rewrote the rules page listing, the site's one zero-click page

Search Console, 7/25 to 8/4: `/rules` pulled **109 of this site's 228 total
impressions and converted none of them**. Every other page combined had fewer
impressions than that single page. Site-wide CTR looked like a 3.1% problem;
it was really one page at 0%.

The queries it ranks for are specific factual questions. The largest is an ATV
safety-course exam question about flag color, plus variations on "oregon dunes
flag requirements". The page already answers them plainly: a red or orange
flag at least 8 by 12 inches, displayed nine feet above the ground. The search
listing never said so. The title read "Rules & Regulations" and the
description was a nine-item comma list of topics.

Title and description now lead with the answer, so the listing matches the
intent of the query. Updated in all seven places they are duplicated: title,
meta description, og:title, og:description, twitter:title, twitter:description
and the JSON-LD WebPage node. JSON-LD re-validated after the edit.

Also corrected terminology. The old description said "whip flags"; the page
body says "sand flag", which is the Oregon term. They now agree.

**Found and deliberately not fixed, both need a decision:**
- `rules.html` uses em dashes in at least five places of body copy, against the
  network house style. `check-network-analytics.ps1` should be flagging these.
- `permits.html` and `rules.html` both target permit queries. They may be
  competing with each other for the same searches.


### 2026-08-05 - Claude (Opus): the DuneGuideUSA hub link is now in the footer of every page

Google had not indexed duneguideusa.com at all, and only littlesaharautah.com
linked to it. The house-ad banners in `partners.js` do point at the hub, but
those are injected by JavaScript, so search engines were not crediting them as
links. The hub was effectively orphaned.

Added a static, crawlable link to the sister-guides paragraph in the footer of
every page on this site, tagged `utm_campaign=network_hub` so hub traffic stays
separable from ordinary `sister_site` referral in analytics.

The same change went into all five guides that were missing it: ccwheelers,
OregonDunesGuide, GlamisDuneGuide, SilverLakeDuneGuide and StAnthonyDuneGuide.
Little Sahara already had one and was deliberately left alone.


### 2026-08-03 - Claude (Opus): Safety restored to the nav, duplicate News link fixed. COMMITTED as 855435c, NOT YET PUSHED.

Two header bugs Mike spotted on the live site.

**Safety was in no nav anywhere.** `safety.html` existed and was reachable
from body copy (the homepage feature card, the day-use machine-setup card,
the maps official-links band, the rules call to action) but appeared in the
main navigation on zero pages, including its own. Added after Rules on all 23
content pages, with `aria-current="page"` on `safety.html` itself.
`dashboard.html` skipped: no main nav, private and noindex.

**The duplicate News link was a pretty-URL mismatch.** `setupNewsNav` in
`public/static/site.js` guarded against double-injection with
`nav.querySelector('a[href="news.html"]')`. Netlify rewrites internal links
to pretty URLs when it serves the site, so the deployed news page ships
`href="/news"` and that selector never matched. Every visit to `/news` got a
second News link appended. The guard now compares the resolved pathname,
which reads the same either side of that rewrite. Verified against live
markup both directions: `/news` skips the injection, `/camping` still gets
its News link inserted before Towns.

**Worth knowing for anyone editing markup here:** that same rewrite is why
deployed HTML never matches the repo byte for byte. Production serves
`href='/camping'` in single quotes where the repo has `href="camping.html"`.
Diffing the two directly looks alarming and means nothing.

Per the deploy note above, root `.html` was edited and the same nav change
mirrored into `public/`. Not a full re-sync: the two sets have already
drifted (`public/news.html` is 4418 bytes against the root file's 5219), and
re-syncing everything is a separate decision rather than something to bundle
into a nav fix.

Committed with `[skip ci]`, so nothing is live until someone pushes.

### 2026-08-02 (later) - Claude (Opus): sister footer now on every page, not just the homepage. PUSHED as 94e4318.

The homepage-only gap flagged in the entry below is closed. The network line
was added to the remaining 22 public pages, inserted immediately before the
`<a class="footer-brand">` logo link, which is the one footer element every
public page shares. `dashboard.html` is excluded on purpose: private, noindex
reporting with its own minimal footer.

Note `.footer-sister-link` has no CSS rule anywhere in this repo. It is a hook
only, and the paragraph inherits normal footer text styling, which is how the
homepage has always rendered it. Nothing needs adding to `static/styles.css`.

Analytics here were verified correct on `G-TWS6Y0FT6M` across 23 pages by the
new network checker at `scripts/check-network-analytics.ps1` in the
DuneGuideUSA repo. Worth running after any footer or template change.

### 2026-08-02 - Claude (Opus): sister-guide footer now lists the whole network

St. Anthony Dune Guide launched on 2026-08-02 and nothing in the network
linked to it. This site's footer named only CCWheelers ("Heading to
California? Check out our sister site..."), which had gone stale as the
network grew past two sites. It now reads "Riding somewhere else? Our sister
guides:" and lists LittleSaharaUtah.com, SilverLakeDuneGuide.com,
StAnthonyDuneGuide.com and CCWheelers.com, matching the pattern the other
guides use.

**This site cross-links from the homepage only.** Of 24 root HTML pages,
`index.html` is the only one carrying a `footer-sister-link`. The other
guides put it on every page. That is a real inconsistency and probably worth
closing, but adding a footer to 23 pages is a bigger change than tonight's
task and was deliberately not done without Mike deciding.

Nothing else here was touched. Analytics on this site (`G-TWS6Y0FT6M`) were
checked during a network-wide audit and are correct.

### 2026-07-29 - Codex: real-place photography audit and riding layout complete. READY TO PUSH.

Replaced generated or generic imagery wherever the site names a specific
Oregon Dunes place. Fifteen optimized WebP assets now cover Florence Harbor,
South Jetty, Honeyman/Cleawox, Siltcoos Lake, Winchester Bay, Umpqua Dunes,
Reedsport, Eel Creek, Lakeside/Tenmile, Spinreel, Riley Ranch/Butterfield
Lake, Horsfall, North Bend, Coos Bay, and Dean Creek. The interactive map,
towns guide, camping guide, riding guide, wildlife page, and related cards
now use those exact-location photographs.

Added `PHOTO_SOURCES.md` and `photo-credits.html`, linked Photo Credits from
every footer, and added the page to both sitemaps. Credits identify the
creator/provider, source, and applicable Creative Commons or official-gallery
terms.

The OHV Riding `Group protocol` section no longer stretches a landscape
photo into a mostly empty portrait column. It now opens with a responsive
three-image story: route meeting, visible group spacing, and regroup/check,
followed by the six existing protocol cards.

Validation: the local desktop layouts were visually reviewed, JavaScript
syntax passed, `git diff --check` passed, and all 21 non-build tests passed.
No production push or deployment had been made when this entry was written.

### 2026-07-28 (even later) - Claude (Opus): Stripe checkout wired live, GA4 installed. PUSHED.

**Stripe: Local Listing tier now takes real payment.** `cf09f47`. Same
pattern as the other three guides: the Local Listing card on
`advertise.html` links to a Stripe Checkout URL, backed by the shared
network catalog script at `DuneGuideUSA/stripe/seed_catalog.py`. Test-mode
keys only; switching to live is deferred, Mike's call.

**GA4 installed for the first time.** `bdd378a`, measurement ID
`G-TWS6Y0FT6M`. This closes the biggest gap flagged in the entry below:
"No GA4 measurement ID on this site... the quarterly report the rate card
promises depends on it." The partner click events in `partners.js` now
have somewhere to land. No prior property existed here to correct against,
unlike CCWheelers.

### 2026-07-28 (later still) - Claude (Opus): two live bugs on ODG found and fixed. NEEDS A DEPLOY.

Mike reported "ODG not working". Two separate faults, both shipped in
`7ddb1c5`, both mine, and **both are live right now**.

**1. Every house ad is a broken image.** `static/partners.js` references
`images/partners/house/...`, but the banners were only ever written to
`public/images/partners/house/`. This site's web root is the **repo root**
(that is why `static/styles.css` resolves), and root `images/` did not exist
at all. So the ad under Live Conditions renders as a broken-image icon with
its alt text showing.

Fixed by populating `images/partners/house/` at the repo root with all five
banners, verified hash-identical to the masters. The `public/` copy stays,
matching the dual-copy convention described at the top of this file.

The renderer has been corrected too: `render_all_house_ads.py` in
`DuneGuideUSA/network-ads/scripts/` now writes to **both** Oregon paths, so
this cannot silently recur on the next render.

**2. `/api/gas` returned 502 on every request.** Not a platform error: the
function's own error path answers 502, and it was taking it every time.

`parseBlock` searched 3500 characters forward from the first occurrence of
`"Oregon"`. On the live AAA page that string first appears at offset 31776,
in page furniture, while the price table's `"Current Avg"` sits at 40076,
about 8000 characters further on. The window never reached the table, no
price was ever found, and the function returned `state prices not found`.

Fixed by anchoring on the table itself rather than on a place name. Verified
against the live AAA page before changing the function: state regular
$4.640, all five rows parsed, and Eugene-Springfield resolving to a
genuinely different table at $4.596.

This is why the homepage console showed "Gas Price: Unavailable". The
fallback behaved correctly and said nothing false, which is what it was
built for, but it was covering a real fault.

**CCWheelers is not affected.** Its copy of this function anchors on
`San Luis Obispo-Atascadero-Paso Robles`, whose table follows immediately,
and it is returning live prices. Left alone.

**Both fixes are local and unpushed.** Unlike the rest of today's work, these
correct faults that are already in production, so this one wants deploying
rather than holding.


### 2026-07-28 (later) - Claude (Opus): the house ads were being cropped on phones. Fixed at the CSS, not the artwork. LOCAL, UNPUSHED.

**The real bug was never the artwork.** `.lsp-art` carried a mobile override,
`@media(max-width:700px){.lsp-art{aspect-ratio:16/7}}`, against art that is
16:5. With `object-fit:cover` that trimmed the sides: the visible band was
500 * 16/7 = 1142.9px centred, so **x below 229 and above 1371 was thrown
away at every phone width**, because the crop depends only on aspect ratio.

That cut headlines and site URLs off on phones, which is where most of the
traffic is. Silver Lake read "Make Silver Lake your next du..." with the URL
cut to "SILVERLAKEDUNEG...". Oregon read "Forty miles of coast. One clear..."
Both had been signed off on desktop, where they are genuinely fine.

**The fix is one CSS change, applied to all four sites:** the override is
gone and `object-fit` is now `contain`, so artwork is never cropped at any
width. Chat's call, and the right one. Designing banners around a 1143px
safe zone would have pushed an accidental crop onto every future local
advertiser, who should never have to know it exists.

If taller mobile creative is ever wanted, the answer is separate artwork
behind `<picture>`, never a forced crop of the desktop banner.

**Three banners were also corrected** (Chat rendered the originals; these are
re-renders): Little Sahara's headline overflowed the canvas, the Dune Guide
USA banner reused Oregon's photograph, and the CCWheelers headline read as a
farewell. It is now "Plan your Oceano Dunes trip with confidence." The hub
now has original non-photographic artwork that depicts no real location.

**Oregon and Silver Lake were NOT re-rendered.** Once the crop was removed
both display correctly, so the artwork never needed changing. Both still
hash exactly as Chat rendered them: `E135F0BE` and `2643F479`.

**Verified, not assumed:**
- no `aspect-ratio:16/7` rule survives anywhere in any repo
- rendered ratio is 3.2 against a natural 3.2 at viewport widths 320, 375
  and 430, with `object-fit:contain` and no crop at any of them
- the page generators emit only the `live-sponsor-band` container markup and
  never the CSS, so a rebuild cannot reintroduce the override
- CCWheelers defines these styles inline in `index.html` only; no other page
  on that site carries them
- all five banners render complete at phone size: full emblem, full headline
  with its full stop, full URL, CTA intact
- all 20 site copies hash identical to the five masters

**Canonical files now live in the DuneGuideUSA repo**, under `network-ads/`:
`masters/` holds the five banners, `scripts/` holds the renderer and two QA
scripts, and `README.md` documents the contract. They previously sat in a
scratch folder outside git on one machine, which was the only home of both
the masters and the render code.

Serving stays local to each site. Pulling all four sites' banners from
duneguideusa.com would add a cross-origin fetch to an image high on the page
and make the hub a single point of failure for house ads network-wide.

**Also:** Python 3.12.10 and Pillow 12.3.0 are now installed on Mike's PC.
Until today this artwork could only be rendered inside Chat's Codex
environment, so it was blocked on Chat's quota.

**Known limit, not a defect.** At a 375px viewport a banner renders about
325x102, so the 24pt subheading lands near 5px and the URL near 4px. Nothing
is cut; that copy is simply decorative at phone size. The headline and CTA
hold up. This is the case for `<picture>` when there is reason to invest.

**Nothing deployed. No commits, no pushes.** Awaiting Mike's approval.

**Files changed here:**
- `static/styles.css` and `public/static/styles.css` (both mirrors)
- `public/images/partners/house/` (3 of 5 banners re-rendered)
- `HANDOFF.md`


### 2026-07-28 - Claude (Opus): advertising layer, live conditions console, live gas prices. PUSHED.

Three pieces of work, all now committed as `7ddb1c5` and pushed to
`CCWheelers/OregonDunesGuide`. This entry exists because the work was built
before it was logged, which was my mistake.

**Also corrected the remote.** This checkout was pushing to the lowercase
`ccwheelers/oregondunesguide`, which GitHub was silently redirecting.
Repointed to `CCWheelers/OregonDunesGuide`. Note the remote here is named
`sites`, not `origin`.

#### Advertising

New: `advertise.html`, `static/partners.js`, and `public/` mirrors of both.

`partners.js` is the whole system. One data object drives section sponsor
bars, directory listings, Trip Planner placement, and GA4 click events.
Selling a placement means adding one object and committing; no HTML is
edited again. Nothing paid renders while `PARTNERS` is empty, so the site
looked unchanged until a placement is sold.

Fourteen sellable positions: one premium slot under the console, eight
section sponsors, two Featured, two Local Listings. Unsold positions run a
sister-guide advert with a tier ribbon and a price on it rather than
sitting blank, so a prospect sees the space occupied.

This site sells **by town**. Every listing carries a `town`, so a Coos Bay
shop does not appear on the Florence page, and Featured is capped at three
per town rather than three per category.

Rate card is $99 / $249 / $499 / $999 with a half-price first year on
annual plans. Priced against what these businesses already pay elsewhere:
local Google Ads runs $1,200 to $8,500 a month, Yelp roughly $270 a month
plus $2 to $10 per click. Every tier here is flat rate with no per-click
charge, which the page says plainly because it is the strongest thing we
can say.

Paid links carry `rel="sponsored"`; house links do not. Google requires
the former for paid placements and an unmarked paid link risks a penalty
on this site, not just the advertiser's.

#### Live conditions console

New: `static/conditions.js`, plus a console on the homepage under the hero.

This was the only one of the four guides leading with static content. It
now shows live weather and wind from Open-Meteo, a ride window computed
from gusts using the same thresholds `weather.js` already applies on its
own page, the next tide from NOAA at the Umpqua River entrance, and the
Oregon gas average. Both data sources were already proven elsewhere in this
codebase and neither needs a key. Every cell degrades to a readable
fallback; a dead API never leaves a blank on the homepage.

The console is also what makes the premium advertising slot honest. Before
it existed I had named that tier "Homepage Sponsor" rather than "Live
Conditions Sponsor", because selling the latter on a page with no live
conditions would have been selling something that was not there.

#### Gas

New: `netlify/functions/gas.mjs`, ported from CCWheelers, pointed at AAA
Oregon, cached six hours at the CDN.

**This fixed a live problem.** `gas.html` carried hardcoded prices under an
"OREGON FUEL BENCHMARK" heading, including a four-row trend table showing
day-to-day movement, all of it invented. `/api/gas` did not exist on this
site, so the fetch failed silently and the typed-in defaults stayed on
screen looking authoritative. Twenty-four fabricated figures, removed.

The failure path now says prices are unavailable and links to AAA, rather
than leaving stale numbers up.

**Coverage limit, deliberately reflected in the copy.** AAA publishes named
metro averages for Eugene-Springfield, Medford, Salem, Portland, Albany,
Bend, Corvallis, Grants Pass and Pendleton. It publishes no named figure
for Douglas or Coos county, so there is no honest AAA number for Winchester
Bay or Coos Bay, and coastal prices run above inland. The page says "Oregon
statewide" and does not imply otherwise. Station-level pricing would need
GasBuddy, which has no free public API; the three town cards already link
out to Google Maps for that.

#### Hero ribbon

The three regions in the hero now link to their riding pages. They looked
clickable long before they were.

#### Dune Guide USA network hub

`partners.js` carries a `LIVE_GUIDE` constant. The position directly below
Live Conditions always belongs to the network hub at duneguideusa.com and
never rotates; every other unsold position rotates through the sister
guides. House links carry UTM parameters so hub traffic can be told apart
from organic referral. Banners live in `images/partners/house/`.

If the hub's name or URL changes, `LIVE_GUIDE` needs updating in all four
guide repos.

#### Outstanding

- **No GA4 measurement ID on this site.** The partner click events collect
  nothing until analytics is switched on, and the quarterly report the rate
  card promises depends on it. This is the biggest gap.
- The advertise page still carries two placeholder figures Mike has not
  replaced: an offer deadline of **September 30** and a scarcity claim of
  **twelve slots**.
- `gas.html` still has hardcoded fallback numbers in the price cards. They
  only show if the fetch fails, which is now rare, but they will go stale.


### 2026-07-27 - Claude -> Mike / Logan (favicon fixed, indexing diagnosed)

Mike reported the favicon not working and no Google results for any page.
Two separate problems, one fixed here and one that is not a code problem.

**Favicon: found and fixed.** Three faults stacked on each other.

1. There was no `/favicon.ico` anywhere in the repo. Browsers and crawlers
   request that path by default regardless of what the HTML declares, and it
   was a hard 404.
2. `site.webmanifest` pointed its icons at `/favicon-ogd-v2.png` and
   `/apple-touch-icon.png`. Both 404 in production, because those files live
   under `/public/` on the served root. Every manifest icon was broken.
3. The only declared icon was 32x32. **Google requires a favicon that is a
   square multiple of 48px** to show it beside a search result. A 32x32 is
   ignored, so even once the site indexes it would have shown the default
   globe.

Fixed by generating `favicon.ico` (48x48 PNG-in-ICO) and `favicon-48.png`
from the existing 192x192 `favicon-ogd.png` master, copying the icon assets
to the repo root so absolute `/` paths resolve on the served root, rewriting
the icon declarations across all 21 root pages and their 21 `public/` mirrors
to use absolute paths, and rebuilding `site.webmanifest` with 48, 180, and
192 entries. Assets now exist at **both** root and `public/`, so this survives
a switch of publish directory in either direction.

**Indexing: the site is four days old and that is the whole story.** First
commit 2026-07-23, sitemap `lastmod` 2026-07-24. Everything technical checks
out, verified against production rather than assumed:

- `robots.txt` serves `Allow: /` with a correct sitemap line
- `sitemap.xml` serves and parses, now 20 URLs
- every page carries `index,follow` and a correct self-canonical
- the homepage returns fully rendered server-side HTML, so there is no
  JavaScript-only content problem for crawlers
- only `dashboard.html` is noindexed, which is correct

There is no technical block. New domains take days to weeks, and nothing
about that is unusual or fixable in code.

**Mike, these are yours and only yours.** Bing is already verified
(`BingSiteAuth.xml`). Google shows no verification file or meta tag anywhere
in the repo, but `README.md` references a `sc-domain:oregondunesguide.com`
Search Console property for the dashboard, which would be DNS-verified and
therefore invisible here. So the first step is to find out which is true:

1. Open Google Search Console and check whether `oregondunesguide.com` exists
   as a property. If not, add it as a **Domain** property and verify by DNS
   TXT record
2. Submit `https://oregondunesguide.com/sitemap.xml` under Sitemaps
3. Use **URL Inspection** on the homepage, then Request Indexing. Repeat for
   `rules.html`, `safety.html`, and `ohv-riding.html`, which are the pages
   worth seeding first
4. Check the Pages report for Discovered or Crawled but not indexed

**Also changed:** the homepage title was the bare brand string
"Oregon Dunes Guide" with no keywords in it, now
"Oregon Dunes Guide | OHV Riding, Camping & Maps". And `guide.html` was
missing from the sitemap entirely, now added.

**Not committed.** There was already uncommitted work in the tree when I
started, on `public/index.html`, `static/styles.css`, `public/static/styles.css`,
and four new `rules-class-*` images. Whoever owns that should commit it
separately. My changes are alongside it, unstaged, so nothing of theirs gets
swept into a commit of mine.

**Still open:** the root vs `public/` duplication described above needs a
decision, and `guide.html` and `dashboard.html` are not in the
`scripts/update-seo.mjs` page table, so they have no managed SEO block.
