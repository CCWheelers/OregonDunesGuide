import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("private dashboard is crawl-blocked and explains its data boundaries", async () => {
  const html = await readFile(new URL("dashboard.html", root), "utf8");
  assert.match(html, /<meta name="robots" content="noindex,nofollow,noarchive">/);
  assert.match(html, /Dashboard password/i);
  assert.match(html, /No visitor names, trip details, confirmation numbers/i);
  assert.match(html, /static\/dashboard\.css/);
  assert.match(html, /static\/dashboard\.js/);
  assert.doesNotMatch(html, /sample data|860|2400/);
});

test("site analytics records useful anonymous events without planner secrets", async () => {
  const source = await readFile(new URL("static/site.js", root), "utf8");
  for (const eventName of [
    "planner_start",
    "planner_build",
    "planner_print",
    "planner_share_email",
    "planner_share_text",
    "planner_share_messenger",
    "directions_click",
    "outbound_click",
    "scroll_depth",
  ]) {
    assert.match(source, new RegExp(`odgTrack\\("${eventName}"`));
  }
  const trackingCalls = [...source.matchAll(/odgTrack\(([\s\S]{0,240}?)\)/g)]
    .map((match) => match[0])
    .join("\n");
  assert.doesNotMatch(trackingCalls, /confirmation|reservation|stayConfirmation|stopDetails/i);
});

test("dashboard API protects aggregate traffic data before contacting Google", async () => {
  const savedPassword = process.env.DASHBOARD_PASSWORD;
  const savedProperty = process.env.GA4_PROPERTY_ID;
  const savedEmail = process.env.GSA_EMAIL;
  const savedKey = process.env.GSA_KEY;
  process.env.DASHBOARD_PASSWORD = "test-password";
  delete process.env.GA4_PROPERTY_ID;
  delete process.env.GSA_EMAIL;
  delete process.env.GSA_KEY;
  try {
    const moduleUrl = new URL("netlify/functions/dashboard-metrics.mjs", root);
    moduleUrl.searchParams.set("test", `${Date.now()}`);
    const { default: handler } = await import(moduleUrl.href);
    const denied = await handler(new Request("https://example.test/api/dashboard-metrics"));
    assert.equal(denied.status, 401);
    const authorized = await handler(
      new Request("https://example.test/api/dashboard-metrics", {
        headers: { "x-dashboard-password": "test-password" },
      }),
    );
    assert.equal(authorized.status, 503);
    const payload = await authorized.json();
    assert.equal(payload.code, "GOOGLE_NOT_CONFIGURED");
  } finally {
    if (savedPassword === undefined) delete process.env.DASHBOARD_PASSWORD;
    else process.env.DASHBOARD_PASSWORD = savedPassword;
    if (savedProperty === undefined) delete process.env.GA4_PROPERTY_ID;
    else process.env.GA4_PROPERTY_ID = savedProperty;
    if (savedEmail === undefined) delete process.env.GSA_EMAIL;
    else process.env.GSA_EMAIL = savedEmail;
    if (savedKey === undefined) delete process.env.GSA_KEY;
    else process.env.GSA_KEY = savedKey;
  }
});

test("analytics configuration never exposes a service credential", async () => {
  const savedMeasurement = process.env.GA4_MEASUREMENT_ID;
  process.env.GA4_MEASUREMENT_ID = "G-TEST123456";
  try {
    const moduleUrl = new URL("netlify/functions/analytics-config.mjs", root);
    moduleUrl.searchParams.set("test", `${Date.now()}`);
    const { default: handler } = await import(moduleUrl.href);
    const configured = await handler();
    const script = await configured.text();
    assert.match(script, /G-TEST123456/);
    assert.doesNotMatch(script, /GSA_KEY|privateKey|DASHBOARD_PASSWORD/);
  } finally {
    if (savedMeasurement === undefined) delete process.env.GA4_MEASUREMENT_ID;
    else process.env.GA4_MEASUREMENT_ID = savedMeasurement;
  }
});

test("planner feedback is a Netlify form and never submits saved trip details", async () => {
  const html = await readFile(new URL("planner.html", root), "utf8");
  const source = await readFile(new URL("static/site.js", root), "utf8");
  assert.match(html, /name="planner-feedback"/);
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /data-netlify-honeypot="bot-field"/);
  assert.match(html, /We want to be the best,[\s\S]*so your opinions matter/i);
  assert.match(source, /odgTrack\("feedback_submit"/);
  const feedbackHandler = source.match(/function setupPlannerFeedback\(\)\{[\s\S]*?\n\}/)?.[0] || "";
  assert.doesNotMatch(feedbackHandler, /odfg-trip|confirmation|reservation|stopDetails/i);
});
