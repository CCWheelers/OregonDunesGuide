(function () {
  var root = document.getElementById("regionNews");
  if (!root) return;
  var status = document.getElementById("regionNewsStatus");
  function esc(value) { return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
  function safeUrl(value) { try { var parsed = new URL(value, location.href); return /^https?:$/.test(parsed.protocol) ? parsed.href : "#"; } catch (_) { return "#"; } }
  function dateLabel(value) { if (!value) return "Current update"; var date = new Date(value); return isNaN(date.valueOf()) ? "Current update" : new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(date); }
  function render(items) {
    root.innerHTML = items.map(function (item) {
      return '<article class="region-news-card' + (item.priority ? " priority" : "") + '"><div><span>' + esc(item.priority ? "ACTION ALERT" : dateLabel(item.publishedAt)) + '</span><small>' + esc(item.source) + '</small></div><h2>' + esc(item.title) + '</h2><p>' + esc(item.summary) + '</p><a href="' + esc(safeUrl(item.url)) + '" target="_blank" rel="noopener">Read the source &rarr;</a></article>';
    }).join("");
  }
  fetch("https://duneguideusa.com/api/news",{headers:{Accept:"application/json"}}).then(function(response){if(!response.ok)throw new Error("News request failed");return response.json();}).then(function(data){var items=(data.items||[]).filter(function(item){return item.region==="oregon"||item.region==="network";}).slice(0,12);if(!items.length)throw new Error("No Oregon news returned");render(items);if(status)status.textContent="Current Oregon and Dune Guide USA network headlines loaded.";}).catch(function(){root.innerHTML='<article class="region-news-card"><div><span>OFFICIAL SOURCES</span></div><h2>The live news sweep is temporarily unavailable.</h2><p>Use the official Forest Service and Oregon State Parks links below for current closures and alerts.</p></article>';if(status)status.textContent="Live headlines are temporarily unavailable.";});
})();
