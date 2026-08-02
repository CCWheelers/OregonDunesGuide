/* ------------------------------------------------------------------
   PARTNERS: the single source of truth for every paid placement.

   Ported from the CCWheelers template. Everything a partner is sold
   gets driven from the PARTNERS object below:

     - Live Conditions sponsor   (Premium)
     - Section sponsor bars      (Tier Three)
     - Directory listings        (Tier One and Tier Two)
     - Trip Planner placement    (Tier Two and above)
     - Click reporting into GA4  (all tiers, for the quarterly report)

   NOTHING PAID RENDERS WHILE THE DATA IS EMPTY. Selling a placement
   means adding one entry here. No HTML is ever edited again.

   Two differences from the CCWheelers copy, both deliberate:

     1. Oregon sells by town. Every listing carries a `town`, and a
        partner who buys Florence does not appear on the Coos Bay page.
     2. The premium slot sits under the live conditions console on the
        homepage, the same as CCWheelers. static/conditions.js drives
        that console from Open-Meteo and NOAA.

   NOTE: this site has no GA4 measurement ID wired up yet, so the click
   events below collect nothing until analytics is switched on. The
   quarterly partner report depends on that being done first.
------------------------------------------------------------------ */

const PARTNERS = {

  /* ---- Premium: the homepage, under the live conditions console ----
     hero: {
       name: "Dune Sweet Dune RV Resort", tagline: "Full hookups, ride straight out",
       url: "https://example.com", initials: "DS", until: "2027-04-01"
     } */
  hero: null,

  /* ---- Tier Three: one sponsor per section, exclusive ----
     camping: {
       name: "Dune Sweet Dune RV Resort",
       tagline: "Full hookups, hot showers, and neighbors who go to bed early",
       url: "https://example.com", initials: "DS",
       logo: "public/images/partners/ds.png",  // optional
       until: "2027-04-01"                     // optional, self-expires
     } */
  sponsors: {},

  /* ---- Tier One and Tier Two: directory listings ----
     {
       name: "Send It Rentals", tier: "featured",   // or "listing"
       category: "rentals",                          // rentals | camping | lodging | service | dining | fuel
       town: "winchester-bay",                       // florence | winchester-bay | coos-bay | all
       blurb: "Quads, side by sides, and sand rails staged at the harbor lot.",
       phone: "(541) 555-0119", url: "https://example.com", initials: "SI",
       photo: "public/images/partners/si.jpg",       // featured tier only
       planner: true, until: "2027-04-01"
     } */
  listings: []
};

/* ---- House ads ----
   Any slot with no paying partner falls back to one of our own guides
   rather than sitting empty. An empty slot tells a prospect nobody is
   buying; a filled one shows them exactly what they would be getting,
   and it sends real traffic between the sites.

   Labelled "Our sister guide", not "Partner", because these are not
   sold placements and advertise.html promises honest labelling. */
const HOUSE = [
  {
    name: "CCWheelers",
    banner: "images/partners/house/ccwheelers-banner-1600x500.webp",
    blurb: "Oceano Dunes on the California Central Coast. Camping, creek status, tides, and the rules, from a crew who have ridden it for twenty years.",
    url: "https://ccwheelers.com/?utm_source=oregondunesguide&utm_medium=house_ad&utm_campaign=sister_site",
    initials: "CC"
  },
  {
    name: "Silver Lake Dune Guide",
    banner: "images/partners/house/silver-lake-guide-banner-1600x500.webp",
    blurb: "Mears, Michigan. The only place east of the Mississippi you can legally ride open dunes, and the permits you need to do it.",
    url: "https://silverlakeduneguide.com/?utm_source=oregondunesguide&utm_medium=house_ad&utm_campaign=sister_site",
    initials: "SL"
  },
  {
    name: "Little Sahara Utah",
    banner: "images/partners/house/little-sahara-guide-banner-1600x500.webp",
    blurb: "Juab County, Utah. Sand Mountain, White Sands, and Black Mountain, with fees, camping, and conditions in one place.",
    url: "https://littlesaharautah.com/?utm_source=oregondunesguide&utm_medium=house_ad&utm_campaign=sister_site",
    initials: "LS"
  }
];

/* The network hub always owns the position directly below Live Conditions.
   All other unsold positions continue to feature the individual dune guides. */
const LIVE_GUIDE = {
  name: "Dune Guide USA",
  banner: "images/partners/house/dune-guide-usa-banner-1600x500.webp",
  blurb: "Choose your next dune destination, then open the local guide built for that sand.",
  tagline: "Choose your next dune destination, then open the local guide built for that sand.",
  url: "https://duneguideusa.com/?utm_source=oregondunesguide&utm_medium=house_ad&utm_campaign=network_hub",
  initials: "DG",
  house: true
};


(function () {
  "use strict";

  var TIER_RANK = { featured: 0, listing: 1 };

  /* Sections worth selling. Anything not listed never shows a sponsor
     bar or a house ad, which keeps adverts off Safety and Wildlife
     where they would be in poor taste. */
  var SPONSOR_SECTIONS = ["camping", "rules", "weather", "tides", "maps", "gas", "day-use", "ohv-riding"];

  /* Keep in step with the rate card on advertise.html.
     `sale` is the effective monthly cost on a half-price annual plan,
     not half the monthly rate, because the offer is on the annual:
       Live Conditions  $9,990/yr -> $4,995 first year = $416/mo
       Section Sponsor  $4,990/yr -> $2,495 first year = $208/mo
       Featured Partner $2,490/yr -> $1,245 first year = $104/mo
       Local Listing      $990/yr ->   $495 first year =  $41/mo
     Every sign says "on an annual plan" so nobody reads the lower
     figure as the month-to-month price. */
  var SALE_ENDS = "September 30";
  var TIERS = {
    listing:  { label: "Tier One",   name: "Local Listing",     price: "$99",  sale: "$41",  note: "Open inventory" },
    featured: { label: "Tier Two",   name: "Featured Partner",  price: "$249", sale: "$104", note: "Only three per town" },
    sponsor:  { label: "Tier Three", name: "Section Sponsor",   price: "$499", sale: "$208", note: "Exclusive. One per section." },
    hero:     { label: "Premium",    name: "Live Conditions Sponsor", price: "$999", sale: "$416", note: "One only. The whole console." }
  };

  function priceHtml(t) {
    if (!t.sale) return "<b>" + t.price + "<small>/mo</small></b>";
    return '<b class="pt-price"><s>' + t.price + "</s> " + t.sale + "<small>/mo</small></b>";
  }
  function saleLine(t) {
    if (!t.sale) return "";
    return '<span class="pt-sale-note">Half price on an annual plan, signed before ' + SALE_ENDS + "</span>";
  }

  function live(entry) {
    if (!entry || !entry.until) return true;
    var end = new Date(entry.until + "T23:59:59");
    return isNaN(end) ? true : Date.now() <= end.getTime();
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function sectionKey() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file.replace(/\.html?$/, "") || "index";
  }

  function mark(entry, cls) {
    if (entry.logo) {
      return '<img class="pt-logo" src="' + esc(entry.logo) + '" alt="' + esc(entry.name) + '" loading="lazy" decoding="async">';
    }
    return '<span class="pt-mark ' + cls + '">' + esc(entry.initials || entry.name.slice(0, 2)).toUpperCase() + "</span>";
  }

  var GUIDE_SOURCE = "oregondunesguide.com";

  function attributedUrl(raw, placement) {
    if (!raw) return "";
    try {
      var url = new URL(raw, location.href);
      if (url.protocol !== "http:" && url.protocol !== "https:") return raw;
      if (!url.searchParams.has("utm_source")) url.searchParams.set("utm_source", GUIDE_SOURCE);
      if (!url.searchParams.has("utm_medium")) url.searchParams.set("utm_medium", "referral");
      if (!url.searchParams.has("utm_campaign")) url.searchParams.set("utm_campaign", "dune_guide_partner");
      url.searchParams.set("utm_content", placement.replace(/[^a-z0-9]+/gi, "_").toLowerCase());
      return url.href;
    } catch (e) {
      return raw;
    }
  }

  /* Paid clicks and house clicks report separately so house traffic
     never inflates the numbers shown to a paying partner. */
  function track(el, entry, placement) {
    el.addEventListener("click", function () {
      if (typeof window.gtag !== "function") return;
      var destination = attributedUrl(entry.url, placement);
      var destinationHost = "";
      try { destinationHost = new URL(destination, location.href).hostname; } catch (e) {}
      window.gtag("event", entry.house ? "house_ad_click" : "partner_click", {
        partner_name: entry.name,
        partner_tier: entry.house ? "house" : (entry.tier || "sponsor"),
        placement: placement,
        page_path: location.pathname,
        guide_source: GUIDE_SOURCE,
        destination_host: destinationHost,
        destination_url: destination,
        link_domain: destinationHost,
        link_url: destination,
        outbound: true
      });
    }, { passive: true });
  }

  /* Deterministic, so a page always shows the same sister guide rather
     than shuffling on every load. */
  function houseFor(seed) {
    if (!HOUSE.length) return null;
    var n = 0;
    for (var i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;
    var pick = HOUSE[n % HOUSE.length];
    return {
      name: pick.name, blurb: pick.blurb, url: pick.url,
      initials: pick.initials, tagline: pick.blurb, banner: pick.banner, house: true
    };
  }

  function linkHtml(p, placement) {
    if (!p.url) return "";
    /* Paid placements carry rel="sponsored" because Google requires it
       and an unmarked paid link risks a penalty on both sites. */
    return '<a href="' + esc(attributedUrl(p.url, placement)) + '" target="_blank" rel="' +
      (p.house ? "noopener" : "noopener sponsored") + '">' +
      (p.house ? "Open the guide" : "Visit site") + "</a>";
  }

  function metaHtml(p, placement) {
    var tel = p.phone ? '<a href="tel:' + esc(p.phone.replace(/[^0-9+]/g, "")) + '">' + esc(p.phone) + "</a>" : "";
    return '<div class="pt-meta">' + tel + (tel && p.url ? " &middot; " : "") + linkHtml(p, placement) + "</div>";
  }

  function tierLink(t, extraClass) {
    return '<a class="pt-tier-link' + (extraClass ? " " + extraClass : "") + '" href="advertise.html">' +
        '<span><b>' + esc(t.label + " · " + t.name) + '</b><small>' + esc(t.note) + '</small></span>' +
        '<strong>This could be your ad &mdash; click here to see this tier &amp; pricing &rarr;</strong>' +
      "</a>";
  }

  function houseArt(entry, placement, eager) {
    if (!entry || !entry.banner || !entry.url) return "";
    return '<a class="pt-house-creative" href="' + esc(attributedUrl(entry.url, placement)) +
      '" target="_blank" rel="noopener" aria-label="Visit ' + esc(entry.name) + ', our sister guide">' +
      '<img class="pt-house-art" src="' + esc(entry.banner) + '" alt="' + esc(entry.name) +
      '" loading="' + (eager ? "eager" : "lazy") + '" decoding="async"></a>';
  }

  function ensureCreativeStyles() {
    if (document.getElementById("partnerCreativeStyles")) return;
    var style = document.createElement("style");
    style.id = "partnerCreativeStyles";
    style.textContent =
      ".pt-house-creative{display:block;width:100%;margin:0;overflow:hidden;background:#092f33;border:1px solid rgba(11,57,57,.18);box-shadow:0 12px 30px rgba(12,45,44,.12);text-decoration:none}" +
      ".pt-house-creative:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(12,45,44,.18)}" +
      ".pt-house-art{display:block;width:100%;height:auto;aspect-ratio:auto;object-fit:contain}" +
      ".pt-tier-link{display:flex;align-items:center;justify-content:space-between;gap:18px;margin:8px 0 18px;padding:10px 2px;border:0;border-top:1px solid rgba(18,56,54,.22);background:transparent!important;color:inherit!important;box-shadow:none!important;text-decoration:none}" +
      ".pt-tier-link:hover{border-top-color:#e85d36;transform:none!important;box-shadow:none!important}" +
      ".pt-tier-link>*{min-width:0;max-width:100%}.pt-tier-link b,.pt-tier-link small{display:block;overflow-wrap:anywhere}.pt-tier-link b{font:800 12px/1.35 sans-serif;letter-spacing:.08em;text-transform:uppercase}.pt-tier-link small{margin-top:2px;font-size:11px;opacity:.68}" +
      ".pt-tier-link strong{font:800 11px/1.3 sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#d9512c;border-bottom:1px solid currentColor;white-space:nowrap;overflow-wrap:anywhere}" +
      "@media(max-width:620px){.pt-tier-link{align-items:flex-start;flex-direction:column;gap:7px}.pt-tier-link strong{white-space:normal}}";
    document.head.appendChild(style);
  }

  /* ---------------- Premium: Live Conditions sponsor ---------------- */
  function renderHero() {
    var host = document.getElementById("homeSponsor");
    if (!host) return;

    var h = PARTNERS.hero;
    if (h && !live(h)) h = null;
    var sold = !!h;
    if (!h) h = LIVE_GUIDE;
    if (!h) return;

    var a = document.createElement("a");
    a.className = "lsp" + (h.banner ? " lsp-visual-ad" : (sold ? "" : " lsp-avail"));
    a.href = attributedUrl(h.url, "live-conditions") || "#";
    if (h.url) { a.target = "_blank"; a.rel = sold ? "noopener sponsored" : "noopener"; }
    a.setAttribute("aria-label", sold
      ? "Visit " + h.name + ", sponsor of this guide"
      : "Visit " + h.name + ", our sister guide");
    a.innerHTML =
      '<span class="lsp-label">' + (sold ? "Live conditions sponsored by" : "Our sister guide") + "</span>" +
      mark(h, sold ? "pt-mark-c" : "pt-mark-b") +
      '<span class="lsp-body"><b>' + esc(h.name) + "</b>" +
      (h.tagline ? "<span>" + esc(h.tagline) + "</span>" : "") + "</span>";
    if (h.banner) a.innerHTML = '<img class="lsp-art" src="' + esc(h.banner) + '" alt="' + esc(h.name) + '" loading="eager" decoding="async">';
    track(a, h, "homepage-sponsor");
    host.appendChild(a);

    if (!sold) host.insertAdjacentHTML("beforeend", tierLink(TIERS.hero, "lsp-tier-link"));
  }

  /* ---------------- Tier Three: section sponsor bar ---------------- */
  function renderSponsor() {
    var key = sectionKey();
    if (SPONSOR_SECTIONS.indexOf(key) === -1) return;

    var s = PARTNERS.sponsors[key];
    if (s && !live(s)) s = null;
    var sold = !!s;
    if (!s) s = houseFor("sponsor:" + key);
    if (!s) return;

    var host = document.querySelector("main .shell") || document.querySelector("main");
    if (!host) return;

    var bar = document.createElement("div");
    bar.className = sold ? "pt-sponsor" : "pt-house-creative";
    bar.innerHTML = !sold && s.banner
      ? '<img class="pt-house-art" src="' + esc(s.banner) + '" alt="' + esc(s.name) + '" loading="lazy" decoding="async">'
      : '<span class="pt-sponsor-label">' + (sold ? "Presented by" : "Our sister guide") + "</span>" +
        mark(s, sold ? "pt-mark-c" : "pt-mark-b") +
        '<span class="pt-sponsor-body"><b>' + esc(s.name) + "</b>" +
        (s.tagline ? "<span>" + esc(s.tagline) + "</span>" : "") + "</span>";

    if (s.url) {
      var a = document.createElement("a");
      a.href = attributedUrl(s.url, "section-sponsor:" + key);
      a.target = "_blank";
      a.rel = sold ? "noopener sponsored" : "noopener";
      a.className = "pt-sponsor-link";
      a.setAttribute("aria-label", "Visit " + s.name + (sold ? ", sponsor of this section" : ", our sister guide"));
      a.appendChild(bar);
      track(a, s, "section-sponsor:" + key);
      host.appendChild(a);
    } else {
      host.appendChild(bar);
    }

    if (!sold) host.insertAdjacentHTML("beforeend", tierLink(TIERS.sponsor, "pt-tier-link-sponsor"));
  }

  /* ---------------- Directory listings ----------------
     <div data-partners="rentals" data-tier="featured" data-town="florence"></div> */
  function renderListings() {
    var slots = document.querySelectorAll("[data-partners]");
    if (!slots.length) return;

    Array.prototype.forEach.call(slots, function (slot) {
      var cat = slot.getAttribute("data-partners");
      var town = slot.getAttribute("data-town") || "";

      var rows = PARTNERS.listings.filter(function (p) {
        if (p.category !== cat || !live(p)) return false;
        if (!town) return true;
        return p.town === town || p.town === "all";
      }).sort(function (a, b) {
        return (TIER_RANK[a.tier] || 9) - (TIER_RANK[b.tier] || 9);
      });

      /* Unsold, so dress the slot as a for-sale sign: a real advert for
         one of our own guides, ribboned with the tier and the price. */
      var forSale = null;
      if (!rows.length) {
        var h = houseFor("cat:" + cat + ":" + town);
        if (!h) return;
        h.tier = slot.getAttribute("data-tier") || "featured";
        forSale = TIERS[h.tier] || TIERS.featured;
        rows = [h];
      }

      var heading = slot.getAttribute("data-partners-title");
      var html = heading ? '<h3 class="pt-heading">' + esc(heading) + "</h3>" : "";

      rows.forEach(function (p) {
        if (forSale && p.banner) {
          html += houseArt(p, "directory:" + cat, false);
          return;
        }
        var featured = p.tier === "featured";
        html +=
          '<div class="pt-card' + (featured ? " pt-featured" : "") + (p.house ? " pt-house" : "") +
            (forSale ? " pt-avail" : "") + '">' +
            (forSale ? '<span class="pt-ribbon"><b>' + esc(forSale.label) + "</b> " + esc(forSale.name) + "</span>" : "") +
            /* A Featured slot is sold on the photo, so an unsold one has
               to show the photo space or it looks identical to Tier One. */
            (featured && p.photo
              ? '<img class="pt-photo" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">'
              : (forSale && featured
                  ? '<span class="pt-photo pt-photo-slot">Your photo<br>goes here</span>'
                  : mark(p, p.house || !featured ? "pt-mark-b" : "pt-mark-c"))) +
            '<div class="pt-body">' +
              '<span class="pt-badge' + (featured && !p.house ? "" : " pt-badge-sand") + '">' +
                (p.house ? "Our sister guide" : (featured ? "Featured Partner" : "Partner")) +
              "</span><h4>" + esc(p.name) + "</h4>" +
              (p.blurb ? "<p>" + esc(p.blurb) + "</p>" : "") +
              metaHtml(p, "directory:" + cat) +
            "</div>" +
          "</div>";
      });

      if (forSale) {
        html += tierLink(forSale);
      }

      slot.innerHTML = html;
      slot.classList.add("pt-slot-filled");
      Array.prototype.forEach.call(slot.querySelectorAll("a"), function (a, i) {
        track(a, rows[Math.floor(i / 2)] || rows[0], "directory:" + cat);
      });
    });
  }

  /* ---------------- Trip Planner placement ----------------
     Appends once the planner has produced output, without touching the
     planner's own code, so the two stay independent. */
  function renderPlanner() {
    var out = document.getElementById("planOut") ||
              document.getElementById("plannerResult") ||
              document.querySelector(".planner-output, .plan-output, #plannerOutput");
    if (!out) return;

    var rows = PARTNERS.listings.filter(function (p) {
      return p.planner && p.tier === "featured" && live(p);
    });
    if (!rows.length) return;

    var injected = false;
    function inject() {
      if (injected || !out.offsetParent) return;
      injected = true;
      var box = document.createElement("div");
      box.className = "pt-planner";
      var html = '<h3 class="pt-heading">Local partners for this trip</h3>' +
                 '<p class="pt-planner-note">Businesses that support this guide. We only list ones we would call ourselves.</p>';
      rows.forEach(function (p) {
        html += '<div class="pt-card pt-featured">' + mark(p, "pt-mark-c") +
          '<div class="pt-body"><h4>' + esc(p.name) + "</h4>" +
          (p.blurb ? "<p>" + esc(p.blurb) + "</p>" : "") + metaHtml(p, "trip-planner") + "</div></div>";
      });
      box.innerHTML = html;
      out.appendChild(box);
      Array.prototype.forEach.call(box.querySelectorAll("a"), function (a, i) {
        track(a, rows[Math.floor(i / 2)] || rows[0], "planner");
      });
    }
    new MutationObserver(inject).observe(out, { attributes: true, attributeFilter: ["style", "class"] });
    inject();
  }

  function start() {
    ensureCreativeStyles();
    window.ODGPartnerErrors = [];
    function safely(name, render) {
      try { render(); }
      catch (e) {
        window.ODGPartnerErrors.push({ placement: name, message: e && e.message ? e.message : String(e) });
        if (window.console && console.error) console.error("ODG partner placement failed:", name, e);
      }
    }
    safely("hero", renderHero);
    safely("section", renderSponsor);
    safely("listings", renderListings);
    safely("planner", renderPlanner);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  window.ODGPartners = { data: PARTNERS, refresh: start };
})();
