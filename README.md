# Oregon Dunes Guide

## Static site

Open `index.html` directly for a simple static preview. The production site is
deployed from this repository through Netlify.
The static version uses `index.html` for the homepage, `maps.html` for the
interactive map, `planner.html` for the personalized trip planner, `guide.html`
for detailed chapters, `static/` for styling and interactions, and `public/`
for images.

The original Next.js/Vinext source remains in `app/` for reference.

## Publish directory: the repo ROOT

Netlify serves this site from the **repository root**, not from `public/`.
That means:

- The live pages are the `.html` files at the root. Edit those.
- `public/` holds assets only (`public/images/`, `public/static/`, favicons,
  og images). Pages reference them as `public/images/...`, which is why a
  root-relative `/images/...` path returns 404 in production.
- `robots.txt` and `sitemap.xml` must exist at the root to be reachable.

On 2026-07-28 a full duplicate set of 22 `.html` files was found sitting in
`public/`, left over from the Next.js layout. They were never served, nothing
linked to them, and their image paths were broken, but they were an easy trap
to edit by mistake. They have been removed. Do not recreate them.

## Framework source

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Private traffic dashboard

The owner dashboard lives at `/dashboard.html`. It is deliberately absent from
the public navigation, includes `noindex` directives, and does not display data
until the visitor supplies the password stored in Netlify.

The dashboard combines:

- Google Analytics 4 traffic, engagement, audience, content, and realtime data
- anonymous trip-planner starts, completions, selections, prints, and shares
- outbound links, directions, map controls, phone/email taps, and scroll depth
- optional Google Search Console queries, impressions, clicks, and rankings

Planner names, trip notes, reservation names, confirmation numbers, exact trip
dates, and other personal trip contents are never sent to analytics.

Configure these environment variables in Netlify:

| Variable | Purpose |
| --- | --- |
| `GA4_MEASUREMENT_ID` | Public web-stream ID such as `G-XXXXXXXXXX` |
| `GA4_PROPERTY_ID` | Numeric GA4 property ID used by the reporting API |
| `GSA_EMAIL` | Google service-account email with Viewer access to GA4 |
| `GSA_KEY` | Service-account private key, stored only in Netlify |
| `DASHBOARD_PASSWORD` | Password required by `/api/dashboard-metrics` |
| `SEARCH_CONSOLE_SITE_URL` | Optional property, normally `sc-domain:oregondunesguide.com` |

Enable the Google Analytics Data API for the service account's Cloud project.
For Search Console reporting, add the same service-account email as a user of
the Oregon Dunes Guide Search Console property. Never commit these values to
the repository; `.env*` and private key files are ignored.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
