/* ------------------------------------------------------------------
   LIVE CONDITIONS CONSOLE (homepage)

   Brings this site in line with the sister guides, which all lead with
   live conditions above the fold. Two real data sources, both already
   proven elsewhere in this codebase and neither needing an API key:

     Weather and wind : Open-Meteo, same endpoint weather.js uses
     Tides            : NOAA CO-OPS, same stations tides.js uses

   The ride window is computed from wind and gusts rather than fetched,
   which is the same reasoning weather.js applies on its own page.

   Everything degrades to a readable fallback if a fetch fails. A dead
   API should never leave a blank cell on the homepage.

   Coordinates and station IDs are lifted from weather.js and tides.js
   so there is one source of truth for them. Winchester Bay is used as
   the central reference point for the dune stretch.
------------------------------------------------------------------ */

(function () {
  "use strict";

  var REF = { name: "Winchester Bay", lat: 43.6773, lon: -124.1734, station: "9433445" };

  function el(id) { return document.getElementById(id); }
  function set(id, value, detailId, detail) {
    var node = el(id);
    if (node) node.textContent = value;
    if (detailId && detail != null) {
      var d = el(detailId);
      if (d) d.textContent = detail;
    }
  }

  /* ---- Weather and wind, plus the ride window computed from them ---- */
  function loadWeather() {
    var url = "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + REF.lat + "&longitude=" + REF.lon +
      "&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,wind_gusts_10m,wind_direction_10m" +
      "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles";

    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("weather");
      return r.json();
    }).then(function (data) {
      var c = data && data.current;
      if (!c) throw new Error("weather");

      var temp = Math.round(c.temperature_2m);
      var wind = Math.round(c.wind_speed_10m);
      var gust = Math.round(c.wind_gusts_10m || 0);
      var feels = Math.round(c.apparent_temperature);

      set("condWeather", temp + "° · " + compass(c.wind_direction_10m) + " " + wind + " mph",
          "condWeatherDetail", "Feels like " + feels + "°, gusting " + gust + " mph");

      /* Same thresholds weather.js uses on its own page, so the two
         never disagree with each other. */
      var label, note;
      if (gust >= 35) { label = "High wind"; note = "Exposed riding deserves a rethink today"; }
      else if (gust >= 25 || wind >= 18) { label = "Wind watch"; note = "Rideable, but carry extra margin"; }
      else if ((c.precipitation || 0) >= 0.05) { label = "Wet sand"; note = "Rain firms the sand up, watch visibility"; }
      else if (temp <= 45) { label = "Cold coast"; note = "Dry layers matter more than you think"; }
      else { label = "Good window"; note = "Nothing in the numbers to argue with"; }
      set("condRide", label, "condRideDetail", note);
    }).catch(function () {
      set("condWeather", "Unavailable", "condWeatherDetail", "Open the weather page");
      set("condRide", "Check weather", "condRideDetail", "Live read unavailable right now");
    });
  }

  function compass(deg) {
    if (deg == null) return "";
    var dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return dirs[Math.round(deg / 22.5) % 16];
  }

  /* ---- Next tide at the Umpqua River entrance ---- */
  function loadTides() {
    var d = new Date();
    var begin = "" + d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");

    var params = new URLSearchParams({
      product: "predictions", application: "OregonDunesGuide",
      begin_date: begin, range: "36", datum: "MLLW", station: REF.station,
      time_zone: "lst_ldt", units: "english", interval: "hilo", format: "json"
    });

    return fetch("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?" + params)
      .then(function (r) { if (!r.ok) throw new Error("tide"); return r.json(); })
      .then(function (data) {
        var rows = data && data.predictions;
        if (!rows || !rows.length) throw new Error("tide");

        var now = Date.now();
        var next = null;
        for (var i = 0; i < rows.length; i++) {
          var t = new Date(rows[i].t.replace(" ", "T")).getTime();
          if (t >= now) { next = rows[i]; break; }
        }
        if (!next) throw new Error("tide");

        var when = new Date(next.t.replace(" ", "T"));
        var time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(when);
        var kind = next.type === "H" ? "High" : "Low";
        set("condTide", kind + " " + time,
            "condTideDetail", REF.name + " · " + Number(next.v).toFixed(1) + " ft");
      })
      .catch(function () {
        set("condTide", "Unavailable", "condTideDetail", "Open the tides page");
      });
  }

  /* ---- Gas, via our own function so AAA is scraped once server-side ----
     Deliberately labelled "Oregon average". AAA publishes no named
     figure for Douglas or Coos county, so there is no honest number for
     Winchester Bay or Coos Bay, and coastal prices run above inland.
     Showing a Eugene figure under a Coos Bay label would be worse than
     showing nothing. */
  function loadGas() {
    return fetch("/api/gas").then(function (r) {
      if (!r.ok) throw new Error("gas");
      return r.json();
    }).then(function (data) {
      if (!data || !data.current) throw new Error("gas");
      var reg = data.current.regular;
      var y = data.yesterday && data.yesterday.regular;
      var detail = "Oregon average, regular";
      if (y != null) {
        var d = reg - y;
        var move = Math.abs(d) < 0.005 ? "level with yesterday"
                 : (d > 0 ? "up" : "down") + " " + Math.abs(d).toFixed(2) + " on yesterday";
        detail = "Regular, " + move;
      }
      set("condGas", "$" + reg.toFixed(2), "condGasDetail", detail);
    }).catch(function () {
      set("condGas", "Unavailable", "condGasDetail", "Open the fuel page");
    });
  }

  function start() {
    if (!el("condWeather")) return;   /* not the homepage */
    loadWeather();
    loadTides();
    loadGas();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
