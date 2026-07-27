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
