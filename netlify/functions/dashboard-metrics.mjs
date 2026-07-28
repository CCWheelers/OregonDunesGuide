// Oregon Dunes Guide owner dashboard.
// Required Netlify environment variables:
// GA4_PROPERTY_ID, GSA_EMAIL, GSA_KEY, DASHBOARD_PASSWORD
// Optional: SEARCH_CONSOLE_SITE_URL (for example sc-domain:oregondunesguide.com)
import crypto from "node:crypto";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
const response = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: jsonHeaders });
const b64url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
const digest = (value) =>
  crypto.createHash("sha256").update(String(value || "")).digest();
const sameSecret = (left, right) =>
  crypto.timingSafeEqual(digest(left), digest(right));
const number = (value) => Number(value || 0);
const reportRows = (report) =>
  (report?.rows || []).map((row) => ({
    dims: (row.dimensionValues || []).map((item) => item.value),
    vals: (row.metricValues || []).map((item) => number(item.value)),
  }));
const percentageChange = (current, previous) => {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
};
const formatDate = (date) => date.toISOString().slice(0, 10);

async function accessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: email,
      scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/webmasters.readonly",
      ].join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(`${header}.${claim}`)
    .sign(privateKey);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${header}.${claim}.${b64url(signature)}`,
  });
  if (!tokenResponse.ok) {
    throw new Error(`Google authentication returned ${tokenResponse.status}.`);
  }
  return (await tokenResponse.json()).access_token;
}

async function runReport(token, property, body) {
  const reportResponse = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!reportResponse.ok) {
    throw new Error(
      `Analytics report returned ${reportResponse.status}: ${(
        await reportResponse.text()
      ).slice(0, 240)}`,
    );
  }
  return reportResponse.json();
}

async function runRealtimeReport(token, property) {
  const reportResponse = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runRealtimeReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dimensions: [{ name: "city" }, { name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 10,
      }),
    },
  );
  if (!reportResponse.ok) return { rows: [] };
  return reportResponse.json();
}

async function safeReport(token, property, body) {
  try {
    return await runReport(token, property, body);
  } catch (error) {
    return { rows: [], warning: String(error) };
  }
}

async function searchConsoleReport(token, siteUrl, days) {
  if (!siteUrl) return { connected: false, reason: "Not connected yet" };
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const query = async (dimensions, rowLimit = 10) => {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: formatDate(start),
        endDate: formatDate(end),
        dimensions,
        rowLimit,
        dataState: "final",
      }),
    });
    if (!result.ok) {
      throw new Error(`Search Console returned ${result.status}.`);
    }
    return result.json();
  };
  try {
    const [queries, pages, totals] = await Promise.all([
      query(["query"], 15),
      query(["page"], 12),
      query([], 1),
    ]);
    const mapRows = (payload, keyName) =>
      (payload.rows || []).map((row) => ({
        [keyName]: row.keys?.[0] || "",
        clicks: number(row.clicks),
        impressions: number(row.impressions),
        ctr: number(row.ctr),
        position: number(row.position),
      }));
    const total = totals.rows?.[0] || {};
    return {
      connected: true,
      delayedThrough: formatDate(end),
      totals: {
        clicks: number(total.clicks),
        impressions: number(total.impressions),
        ctr: number(total.ctr),
        position: number(total.position),
      },
      queries: mapRows(queries, "query"),
      pages: mapRows(pages, "page"),
    };
  } catch (error) {
    return { connected: false, reason: String(error) };
  }
}

export default async (request) => {
  const configuredPassword = process.env.DASHBOARD_PASSWORD || "";
  const providedPassword = request.headers.get("x-dashboard-password") || "";
  if (!configuredPassword) {
    return response(
      {
        error: "Dashboard access has not been configured in Netlify yet.",
        code: "DASHBOARD_NOT_CONFIGURED",
      },
      503,
    );
  }
  if (!providedPassword || !sameSecret(providedPassword, configuredPassword)) {
    return response(
      { error: "That dashboard password was not accepted.", code: "UNAUTHORIZED" },
      401,
    );
  }

  const property = process.env.GA4_PROPERTY_ID || "";
  const email = process.env.GSA_EMAIL || "";
  const privateKey = (process.env.GSA_KEY || "").replace(/\\n/g, "\n");
  const missing = [
    !property && "GA4_PROPERTY_ID",
    !email && "GSA_EMAIL",
    !privateKey && "GSA_KEY",
  ].filter(Boolean);
  if (missing.length) {
    return response(
      {
        error: "The dashboard is built, but its Google reporting connection is incomplete.",
        code: "GOOGLE_NOT_CONFIGURED",
        missing,
      },
      503,
    );
  }

  try {
    const url = new URL(request.url);
    const requestedDays = number(url.searchParams.get("days"));
    const days = [7, 30, 90, 365].includes(requestedDays)
      ? requestedDays
      : 30;
    const token = await accessToken(email, privateKey);
    const currentRange = { startDate: `${days}daysAgo`, endDate: "today" };
    const previousRange = {
      startDate: `${days * 2 + 1}daysAgo`,
      endDate: `${days + 1}daysAgo`,
    };
    const report = (body) => safeReport(token, property, body);
    const metricOrder = (metricName) => [
      { metric: { metricName }, desc: true },
    ];
    const eventFilter = {
      filter: {
        fieldName: "eventName",
        stringFilter: { matchType: "BEGINS_WITH", value: "planner_" },
      },
    };

    const [
      totalsCurrent,
      totalsPrevious,
      trend,
      events,
      plannerEvents,
      pages,
      landingPages,
      sources,
      sourceMedium,
      cities,
      regions,
      devices,
      browsers,
      visitorTypes,
      dayHours,
      outboundLinks,
      partnerAds,
      realtime,
      searchConsole,
    ] = await Promise.all([
      runReport(token, property, {
        dateRanges: [currentRange],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "newUsers" },
          { name: "engagedSessions" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
          { name: "screenPageViewsPerSession" },
        ],
      }),
      runReport(token, property, {
        dateRanges: [previousRange],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "newUsers" },
          { name: "engagedSessions" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
          { name: "screenPageViewsPerSession" },
        ],
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
        limit: 400,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
        orderBys: metricOrder("eventCount"),
        limit: 150,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
        dimensionFilter: eventFilter,
        orderBys: metricOrder("eventCount"),
        limit: 150,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "totalUsers" },
          { name: "userEngagementDuration" },
          { name: "exits" },
        ],
        orderBys: metricOrder("screenPageViews"),
        limit: 20,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "landingPagePlusQueryString" }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
        ],
        orderBys: metricOrder("sessions"),
        limit: 15,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        orderBys: metricOrder("sessions"),
        limit: 12,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        orderBys: metricOrder("sessions"),
        limit: 15,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [
          { name: "city" },
          { name: "region" },
          { name: "country" },
        ],
        metrics: [{ name: "totalUsers" }],
        orderBys: metricOrder("totalUsers"),
        limit: 20,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "region" }, { name: "country" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: metricOrder("totalUsers"),
        limit: 20,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "totalUsers" }, { name: "sessions" }],
        orderBys: metricOrder("totalUsers"),
        limit: 6,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "browser" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: metricOrder("totalUsers"),
        limit: 10,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "newVsReturning" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: metricOrder("totalUsers"),
        limit: 4,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "dayOfWeekName" }, { name: "hour" }],
        metrics: [{ name: "sessions" }],
        orderBys: metricOrder("sessions"),
        limit: 20,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [{ name: "linkUrl" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: {
              values: [
                "click",
                "outbound_click",
                "partner_click",
                "house_ad_click",
              ],
            },
          },
        },
        orderBys: metricOrder("eventCount"),
        limit: 20,
      }),
      report({
        dateRanges: [currentRange],
        dimensions: [
          { name: "eventName" },
          { name: "linkUrl" },
          { name: "pagePath" },
        ],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: { values: ["partner_click", "house_ad_click"] },
          },
        },
        orderBys: metricOrder("eventCount"),
        limit: 100,
      }),
      runRealtimeReport(token, property),
      searchConsoleReport(
        token,
        process.env.SEARCH_CONSOLE_SITE_URL || "",
        days,
      ),
    ]);

    const current = reportRows(totalsCurrent)[0]?.vals || [];
    const previous = reportRows(totalsPrevious)[0]?.vals || [];
    const totalNames = [
      "visitors",
      "sessions",
      "pageViews",
      "newUsers",
      "engagedSessions",
      "engagementRate",
      "averageSessionDuration",
      "viewsPerSession",
    ];
    const totals = Object.fromEntries(
      totalNames.map((name, index) => [
        name,
        {
          current: current[index] || 0,
          previous: previous[index] || 0,
          change: percentageChange(current[index] || 0, previous[index] || 0),
        },
      ]),
    );
    const eventRows = reportRows(events);
    const eventMap = Object.fromEntries(
      eventRows.map((row) => [row.dims[0], row.vals[0]]),
    );
    totals.plannerBuilds = {
      current: eventMap.planner_build || 0,
      previous: 0,
      change: 0,
    };
    totals.outboundClicks = {
      current:
        (eventMap.outbound_click || 0) +
        (eventMap.partner_click || 0) +
        (eventMap.house_ad_click || 0),
      previous: 0,
      change: 0,
    };
    totals.shares = {
      current:
        (eventMap.planner_share_email || 0) +
        (eventMap.planner_share_text || 0) +
        (eventMap.planner_share_messenger || 0),
      previous: 0,
      change: 0,
    };
    totals.directions = {
      current: eventMap.directions_click || 0,
      previous: 0,
      change: 0,
    };

    return response({
      connected: true,
      period: `Last ${days} days`,
      days,
      updated: new Date().toISOString(),
      totals,
      realtime: {
        activeUsers: reportRows(realtime).reduce(
          (sum, row) => sum + row.vals[0],
          0,
        ),
        locations: reportRows(realtime).map((row) => ({
          city: row.dims[0],
          country: row.dims[1],
          users: row.vals[0],
        })),
      },
      trend: reportRows(trend).map((row) => ({
        date: row.dims[0],
        visitors: row.vals[0],
        sessions: row.vals[1],
        views: row.vals[2],
      })),
      events: eventRows.map((row) => ({
        name: row.dims[0],
        count: row.vals[0],
        users: row.vals[1],
      })),
      planner: reportRows(plannerEvents).map((row) => ({
        name: row.dims[0],
        count: row.vals[0],
        users: row.vals[1],
      })),
      topPages: reportRows(pages).map((row) => ({
        path: row.dims[0],
        title: row.dims[1],
        views: row.vals[0],
        users: row.vals[1],
        seconds: row.vals[0] ? Math.round(row.vals[2] / row.vals[0]) : 0,
        exits: row.vals[3],
      })),
      landingPages: reportRows(landingPages).map((row) => ({
        path: row.dims[0],
        sessions: row.vals[0],
        users: row.vals[1],
        engagementRate: row.vals[2],
        seconds: Math.round(row.vals[3]),
      })),
      channels: reportRows(sources).map((row) => ({
        name: row.dims[0],
        sessions: row.vals[0],
        users: row.vals[1],
      })),
      sources: reportRows(sourceMedium).map((row) => ({
        name: row.dims[0],
        sessions: row.vals[0],
        users: row.vals[1],
      })),
      cities: reportRows(cities)
        .filter((row) => row.dims[0] && row.dims[0] !== "(not set)")
        .map((row) => ({
          city: row.dims[0],
          region: row.dims[1],
          country: row.dims[2],
          users: row.vals[0],
        })),
      regions: reportRows(regions)
        .filter((row) => row.dims[0] && row.dims[0] !== "(not set)")
        .map((row) => ({
          region: row.dims[0],
          country: row.dims[1],
          users: row.vals[0],
        })),
      devices: reportRows(devices).map((row) => ({
        name: row.dims[0],
        users: row.vals[0],
        sessions: row.vals[1],
      })),
      browsers: reportRows(browsers).map((row) => ({
        name: row.dims[0],
        users: row.vals[0],
      })),
      visitorTypes: reportRows(visitorTypes).map((row) => ({
        name: row.dims[0],
        users: row.vals[0],
      })),
      busiestTimes: reportRows(dayHours).map((row) => ({
        day: row.dims[0],
        hour: number(row.dims[1]),
        sessions: row.vals[0],
      })),
      outboundLinks: reportRows(outboundLinks)
        .filter((row) => row.dims[0] && row.dims[0] !== "(not set)")
        .map((row) => ({ url: row.dims[0], clicks: row.vals[0] })),
      partnerAds: reportRows(partnerAds)
        .filter((row) => row.dims[1] && row.dims[1] !== "(not set)")
        .map((row) => ({
          kind: row.dims[0] === "house_ad_click" ? "house" : "partner",
          url: row.dims[1],
          page: row.dims[2] || "/",
          clicks: row.vals[0],
        })),
      searchConsole,
    });
  } catch (error) {
    return response(
      {
        error: "Google reporting could not be reached.",
        code: "REPORTING_ERROR",
        detail: String(error),
      },
      502,
    );
  }
};

export const config = { path: "/api/dashboard-metrics" };
