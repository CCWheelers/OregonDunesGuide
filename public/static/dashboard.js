const state={password:"",days:30,data:null,trendMetric:"visitors"};
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const escapeHtml=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const integer=value=>Math.round(Number(value)||0).toLocaleString();
const percent=value=>`${(Number(value)*100).toFixed(1)}%`;
const duration=value=>{const seconds=Math.round(Number(value)||0);return`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`};
const shortDate=value=>{if(!value||value.length!==8)return value;return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(`${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6)}T12:00:00`))};
const eventLabel=name=>String(name||"").replace(/^planner_/,"").replaceAll("_"," ").replace(/\b\w/g,letter=>letter.toUpperCase());

function bars(elementId,rows,{name="name",value="users",limit=10,format=integer}={}){
  const element=document.getElementById(elementId);
  if(!element)return;
  const list=(rows||[]).slice(0,limit),max=Math.max(1,...list.map(row=>Number(row[value])||0));
  element.innerHTML=list.length?list.map(row=>`<div class="bar-row" title="${escapeHtml(row[name])}"><span class="bar-name">${escapeHtml(row[name])}</span><span class="bar-track"><i class="bar-fill" style="width:${Math.max(2,Math.round((Number(row[value])||0)/max*100))}%"></i></span><b class="bar-value">${format(row[value])}</b></div>`).join(""):`<p class="panel-note">Data will appear after visitors begin using the site.</p>`
}

function metricCard(label,item,note,{primary=false,format=integer,compare=true}={}){
  const change=Number(item?.change)||0;
  const direction=change>0?"up":change<0?"down":"";
  const changeText=!compare?"Collecting now":change===0?"No change":`${change>0?"↑":"↓"} ${Math.abs(change).toFixed(1)}%`;
  return`<article class="metric-card${primary?" primary":""}"><span class="metric-label">${escapeHtml(label)}</span><strong class="metric-value">${format(item?.current)}</strong><span class="delta ${direction}">${changeText}</span><span class="metric-note">${escapeHtml(note)}</span></article>`
}

function renderMetrics(data){
  const totals=data.totals||{};
  $("#metricGrid").innerHTML=[
    metricCard("VISITORS",totals.visitors,"Estimated distinct people."),
    metricCard("VISITS",totals.sessions,"Individual browsing sessions."),
    metricCard("PAGE VIEWS",totals.pageViews,"Total pages visitors opened."),
    metricCard("PLANS BUILT",totals.plannerBuilds,"Completed planner results.",{primary:true,compare:false}),
    metricCard("ENGAGEMENT",totals.engagementRate,"Visits that meaningfully engaged.",{format:value=>percent(value)}),
    metricCard("AVG. VISIT",totals.averageSessionDuration,"Average visit duration.",{format:duration}),
    metricCard("OUTBOUND CLICKS",totals.outboundClicks,"Official sites, businesses, and reservations.",{compare:false}),
    metricCard("SHARES",totals.shares,"Planner shares by email, text, or Messenger.",{compare:false}),
    metricCard("DIRECTIONS",totals.directions,"Clicks opening map directions.",{compare:false}),
    metricCard("NEW VISITORS",totals.newUsers,"People discovering the guide.",{}),
    metricCard("ENGAGED VISITS",totals.engagedSessions,"Visits with meaningful activity.",{}),
    metricCard("PAGES / VISIT",totals.viewsPerSession,"How deeply people explore.",{format:value=>Number(value||0).toFixed(1)}),
  ].join("")
}

function renderTrend(){
  const rows=state.data?.trend||[],metric=state.trendMetric,container=$("#trendChart");
  if(!rows.length){container.innerHTML='<p class="panel-note">Trend data will appear after tracking begins.</p>';return}
  const width=1000,height=300,pad={left:50,right:18,top:18,bottom:38};
  const values=rows.map(row=>Number(row[metric])||0),max=Math.max(1,...values);
  const x=index=>pad.left+(index/Math.max(1,rows.length-1))*(width-pad.left-pad.right);
  const y=value=>pad.top+(1-value/max)*(height-pad.top-pad.bottom);
  const points=values.map((value,index)=>`${x(index)},${y(value)}`).join(" ");
  const area=`${pad.left},${height-pad.bottom} ${points} ${x(rows.length-1)},${height-pad.bottom}`;
  const grid=[0,.25,.5,.75,1].map(fraction=>{const gy=pad.top+fraction*(height-pad.top-pad.bottom),label=Math.round(max*(1-fraction));return`<line class="gridline" x1="${pad.left}" y1="${gy}" x2="${width-pad.right}" y2="${gy}"/><text x="4" y="${gy+4}">${label}</text>`}).join("");
  const labelStep=Math.max(1,Math.ceil(rows.length/7));
  const labels=rows.map((row,index)=>index%labelStep===0||index===rows.length-1?`<text x="${x(index)}" y="${height-8}" text-anchor="middle">${escapeHtml(shortDate(row.date))}</text>`:"").join("");
  const dots=rows.map((row,index)=>`<circle class="chart-point" cx="${x(index)}" cy="${y(values[index])}" r="4"><title>${escapeHtml(shortDate(row.date))}: ${integer(values[index])}</title></circle>`).join("");
  container.innerHTML=`<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e46236" stop-opacity=".26"/><stop offset="1" stop-color="#e46236" stop-opacity="0"/></linearGradient></defs>${grid}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/>${dots}${labels}</svg>`
}

function renderInsights(data){
  const totals=data.totals||{},top=data.topPages?.[0],source=data.channels?.[0],mobile=(data.devices||[]).find(item=>item.name==="mobile");
  const plannerViews=(data.topPages||[]).find(item=>/planner/i.test(item.path))?.views||0;
  const conversion=plannerViews?Math.round((totals.plannerBuilds?.current||0)/plannerViews*1000)/10:0;
  const insights=[
    ["TRAFFIC",`${totals.visitors?.change>=0?"Audience grew":"Audience declined"} ${Math.abs(totals.visitors?.change||0).toFixed(1)}%`,`${integer(totals.visitors?.current)} visitors compared with ${integer(totals.visitors?.previous)} in the preceding period.`],
    ["CONTENT",top?`${top.title||top.path} leads the site`:"Content tracking is starting",top?`${integer(top.views)} views and about ${duration(top.seconds)} of engaged time per view.`:"The first useful comparison will appear after traffic is collected."],
    ["PLANNER",`${conversion||0}% planner completion rate`,plannerViews?`${integer(totals.plannerBuilds?.current)} completed plans from ${integer(plannerViews)} planner page views.`:"Planner conversion appears after both page views and completed plans are recorded."],
    ["DISCOVERY",source?`${source.name} is the largest channel`:"Traffic sources are collecting",source?`${integer(source.sessions)} visits arrived through this channel.`:"Search, social, referral, and direct traffic will be separated here."],
    ["MOBILE",mobile?`${integer(mobile.users)} phone visitors`:"Device data is collecting",mobile?"Use this to prioritize mobile layout and tap targets.":"Device totals will show whether phone or desktop deserves the most attention."],
    ["SEARCH",data.searchConsole?.connected?`${integer(data.searchConsole.totals.clicks)} Google clicks`:"Search Console connection pending",data.searchConsole?.connected?`${integer(data.searchConsole.totals.impressions)} appearances in Google with an average position of ${Number(data.searchConsole.totals.position||0).toFixed(1)}.`:"Connect Search Console to reveal queries, impressions, rankings, and search pages."],
  ];
  $("#insightGrid").innerHTML=insights.map(item=>`<article class="insight-card"><span>${item[0]}</span><b>${escapeHtml(item[1])}</b><p>${escapeHtml(item[2])}</p></article>`).join("")
}

function eventCount(name){return state.data?.events?.find(item=>item.name===name)?.count||0}
function renderPlanner(data){
  const plannerPageViews=(data.topPages||[]).filter(item=>/planner/i.test(item.path)).reduce((sum,item)=>sum+item.views,0);
  const steps=[
    ["Planner page viewed",plannerPageViews],
    ["Started answering",eventCount("planner_start")],
    ["Built a plan",eventCount("planner_build")],
    ["Printed / saved PDF",eventCount("planner_print")],
    ["Shared a plan",eventCount("planner_share_email")+eventCount("planner_share_text")+eventCount("planner_share_messenger")],
  ];
  const max=Math.max(1,...steps.map(item=>item[1]));
  $("#plannerFunnel").innerHTML=steps.map((item,index)=>{
    const previous=index?steps[index-1][1]:item[1],retention=previous?Math.round(item[1]/previous*100):0;
    return`<div class="funnel-row"><div class="funnel-top"><span>${item[0]}</span><b>${integer(item[1])}</b></div><div class="funnel-track"><div class="funnel-fill" style="width:${Math.max(item[1]?2:0,item[1]/max*100)}%"></div></div>${index?`<small>${retention}% continued from the preceding step</small>`:""}</div>`
  }).join("");
  const groups=[
    ["REGIONS","planner_region_"],
    ["STAY TYPES","planner_stay_"],
    ["ACTIVITIES","planner_interest_"],
    ["RENTALS","planner_rental_"],
    ["VEHICLES","planner_vehicle_"],
    ["DOG-FRIENDLY PLANS","planner_dog_"],
  ];
  $("#plannerSelections").innerHTML=groups.map(([label,prefix])=>{
    const rows=(data.planner||[]).filter(item=>item.name.startsWith(prefix)).map(item=>({name:eventLabel(item.name.slice(prefix.length)),users:item.count}));
    return`<div class="selection-group"><h4>${label}</h4><div id="selection-${prefix}">${rows.length?rows.map(row=>`<div class="bar-row"><span class="bar-name">${escapeHtml(row.name)}</span><span class="bar-track"><i class="bar-fill" style="width:${Math.max(3,row.users/Math.max(...rows.map(x=>x.users))*100)}%"></i></span><b class="bar-value">${integer(row.users)}</b></div>`).join(""):'<p class="panel-note">No selections recorded yet.</p>'}</div></div>`
  }).join("")
}

function renderTables(data){
  $("#topPages").innerHTML=(data.topPages||[]).slice(0,15).map(row=>`<tr><td title="${escapeHtml(row.path)}">${escapeHtml(row.path)}<span class="page-title">${escapeHtml(row.title)}</span></td><td>${integer(row.views)}</td><td>${duration(row.seconds)}</td><td>${integer(row.exits)}</td></tr>`).join("");
  $("#landingPages").innerHTML=(data.landingPages||[]).slice(0,15).map(row=>`<tr><td title="${escapeHtml(row.path)}">${escapeHtml(row.path)}</td><td>${integer(row.sessions)}</td><td>${percent(row.engagementRate)}</td><td>${duration(row.seconds)}</td></tr>`).join("")
}

function renderAudience(data){
  bars("cityBars",(data.cities||[]).map(row=>({name:`${row.city}${row.region?`, ${row.region}`:""}`,users:row.users})),{limit:12});
  bars("deviceBars",data.devices,{limit:6});
  bars("visitorBars",data.visitorTypes,{limit:4});
  bars("browserBars",data.browsers,{limit:8});
  const busy=(data.busiestTimes||[]).slice(0,5);
  $("#busyTimes").innerHTML=busy.length?busy.map(item=>`<div class="busy-card"><b>${escapeHtml(item.day)} at ${new Intl.DateTimeFormat("en-US",{hour:"numeric"}).format(new Date(2020,0,1,item.hour))}</b><span>${integer(item.sessions)} visits</span></div>`).join(""):'<p class="panel-note">Busiest times will appear as traffic accumulates.</p>'
}

function renderDiscovery(data){
  bars("channelBars",data.channels,{value:"sessions",limit:10});
  bars("sourceBars",data.sources,{value:"sessions",limit:12})
}

function renderActions(data){
  const actionNames={
    planner_build:"Plans built",planner_print:"Plans printed",planner_share_email:"Shared by email",
    planner_share_text:"Shared by text",planner_share_messenger:"Shared to Messenger",directions_click:"Directions opened",
    outbound_click:"Outbound links",phone_click:"Phone taps",email_click:"Email taps",map_filter:"Map filters",
    partner_click:"Partner ad clicks",house_ad_click:"Sister-guide clicks",
    map_layer:"Map layers",page_share_open:"Page share menu",scroll_depth:"Scroll milestones"
  };
  const actions=(data.events||[]).filter(item=>actionNames[item.name]).map(item=>({name:actionNames[item.name],users:item.count}));
  bars("actionBars",actions,{limit:14});
  const links=(data.outboundLinks||[]).map(item=>{let name=item.url;try{const url=new URL(item.url);name=`${url.hostname}${url.pathname==="/"?"" : url.pathname}`}catch{}return{name,users:item.clicks}});
  bars("outboundBars",links,{limit:14});
  const ads=(data.partnerAds||[]).map(item=>{
    let name=item.url;
    try{
      const url=new URL(item.url);
      const placement=url.searchParams.get("utm_content")?.replaceAll("_"," ")||"ad";
      name=`${url.hostname} · ${placement} · ${item.page}`;
    }catch{}
    return{name:`${item.kind==="house"?"SISTER":"PARTNER"} · ${name}`,users:item.clicks}
  });
  bars("partnerAdBars",ads,{limit:20})
}

function renderSearch(data){
  const search=data.searchConsole||{},status=$("#searchConsoleStatus"),content=$("#searchConsoleContent");
  if(!search.connected){
    status.hidden=false;status.innerHTML=`<b>Search Console is ready to connect.</b><br>${escapeHtml(search.reason||"Add the Search Console site setting in Netlify to activate search query and ranking reports.")}`;
    content.hidden=true;return
  }
  status.hidden=true;content.hidden=false;
  $("#searchMetrics").innerHTML=[
    ["GOOGLE CLICKS",integer(search.totals.clicks)],["IMPRESSIONS",integer(search.totals.impressions)],
    ["CLICK-THROUGH RATE",percent(search.totals.ctr)],["AVG. POSITION",Number(search.totals.position||0).toFixed(1)]
  ].map(item=>`<div class="search-stat"><span>${item[0]}</span><b>${item[1]}</b></div>`).join("");
  $("#searchQueries").innerHTML=(search.queries||[]).map(row=>`<tr><td>${escapeHtml(row.query)}</td><td>${integer(row.clicks)}</td><td>${integer(row.impressions)}</td><td>${Number(row.position||0).toFixed(1)}</td></tr>`).join("");
  $("#searchPages").innerHTML=(search.pages||[]).map(row=>`<tr><td title="${escapeHtml(row.page)}">${escapeHtml(row.page.replace(/^https?:\/\/[^/]+/,"")||"/")}</td><td>${integer(row.clicks)}</td><td>${integer(row.impressions)}</td><td>${percent(row.ctr)}</td></tr>`).join("")
}

function renderRealtime(data){
  const live=data.realtime||{};
  $("#liveUsers").textContent=integer(live.activeUsers);$("#livePlural").textContent=live.activeUsers===1?"":"s";
  $("#liveLocations").textContent=live.locations?.length?live.locations.map(item=>`${item.city||item.country} (${item.users})`).join(" · "):"No active visitor locations reported in the last 30 minutes."
}

function renderDashboard(data){
  state.data=data;
  $("#periodLabel").textContent=data.period;
  $("#updatedAt").textContent=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(data.updated));
  renderRealtime(data);renderMetrics(data);renderTrend();renderInsights(data);renderPlanner(data);renderTables(data);renderAudience(data);renderDiscovery(data);renderActions(data);renderSearch(data)
}

async function loadDashboard(){
  document.body.classList.add("loading");
  try{
    const result=await fetch(`/api/dashboard-metrics?days=${state.days}`,{headers:{"X-Dashboard-Password":state.password},cache:"no-store"});
    const payload=await result.json().catch(()=>({error:"The reporting service returned an unreadable response."}));
    if(!result.ok)throw Object.assign(new Error(payload.error||"Dashboard data could not be loaded."),{code:payload.code,detail:payload.detail,missing:payload.missing});
    sessionStorage.setItem("odg-dashboard-password",state.password);
    $("#loginScreen").hidden=true;$("#dashboard").hidden=false;
    renderDashboard(payload)
  }catch(error){
    $("#dashboard").hidden=true;$("#loginScreen").hidden=false;
    const message=error.code==="GOOGLE_NOT_CONFIGURED"?`The dashboard is built, but Google reporting still needs: ${(error.missing||[]).join(", ")}.`:error.detail||error.message;
    $("#loginMessage").textContent=message;
    $("#dashboardPassword").focus()
  }finally{document.body.classList.remove("loading")}
}

function csvCell(value){return`"${String(value??"").replaceAll('"','""')}"`}
function downloadCsv(){
  if(!state.data)return;
  const rows=[["Oregon Dunes Guide dashboard",state.data.period],["Updated",state.data.updated],[]];
  const add=(title,list,columns)=>{rows.push([title],columns.map(column=>column[0]));(list||[]).forEach(item=>rows.push(columns.map(column=>column[1](item))));rows.push([])};
  add("Summary",Object.entries(state.data.totals||{}).map(([name,value])=>({name,...value})),[["Metric",x=>x.name],["Current",x=>x.current],["Previous",x=>x.previous],["Change %",x=>x.change]]);
  add("Top pages",state.data.topPages,[["Path",x=>x.path],["Title",x=>x.title],["Views",x=>x.views],["Users",x=>x.users],["Seconds",x=>x.seconds],["Exits",x=>x.exits]]);
  add("Traffic sources",state.data.sources,[["Source / medium",x=>x.name],["Visits",x=>x.sessions],["Users",x=>x.users]]);
  add("Cities",state.data.cities,[["City",x=>x.city],["Region",x=>x.region],["Country",x=>x.country],["Users",x=>x.users]]);
  add("Events",state.data.events,[["Event",x=>x.name],["Count",x=>x.count],["Users",x=>x.users]]);
  add("Partner ad clicks",state.data.partnerAds,[["Type",x=>x.kind],["Destination",x=>x.url],["Origin page",x=>x.page],["Clicks",x=>x.clicks]]);
  if(state.data.searchConsole?.connected)add("Google queries",state.data.searchConsole.queries,[["Query",x=>x.query],["Clicks",x=>x.clicks],["Impressions",x=>x.impressions],["CTR",x=>x.ctr],["Position",x=>x.position]]);
  const blob=new Blob([rows.map(row=>row.map(csvCell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
  const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=`oregon-dunes-dashboard-${new Date().toISOString().slice(0,10)}.csv`;link.click();URL.revokeObjectURL(link.href)
}

document.addEventListener("DOMContentLoaded",()=>{
  try{state.password=sessionStorage.getItem("odg-dashboard-password")||""}catch{}
  if(state.password){$("#dashboardPassword").value=state.password;loadDashboard()}
  $("#loginForm").addEventListener("submit",event=>{event.preventDefault();state.password=$("#dashboardPassword").value;$("#loginMessage").textContent="Connecting…";loadDashboard()});
  $("#rangeButtons").addEventListener("click",event=>{const button=event.target.closest("[data-days]");if(!button)return;state.days=Number(button.dataset.days);$$("#rangeButtons button").forEach(item=>item.classList.toggle("active",item===button));loadDashboard()});
  $("#trendTabs").addEventListener("click",event=>{const button=event.target.closest("[data-metric]");if(!button)return;state.trendMetric=button.dataset.metric;$$("#trendTabs button").forEach(item=>item.classList.toggle("active",item===button));renderTrend()});
  $("#refreshDashboard").addEventListener("click",loadDashboard);
  $("#exportDashboard").addEventListener("click",downloadCsv);
  $("#lockDashboard").addEventListener("click",()=>{try{sessionStorage.removeItem("odg-dashboard-password")}catch{}state.password="";$("#dashboard").hidden=true;$("#loginScreen").hidden=false;$("#dashboardPassword").value="";$("#loginMessage").textContent="Dashboard locked.";$("#dashboardPassword").focus()})
});
