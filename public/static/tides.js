const tideRegions={
  florence:{name:"Florence",station:"9434032",stationName:"Florence, Siuslaw River"},
  winchester:{name:"Winchester Bay",station:"9433445",stationName:"Umpqua River Entrance"},
  coos:{name:"Coos Bay",station:"9432780",stationName:"Charleston"}
};

let tideCountdownTimer;
let tideChartData=[];

function tideDateString(date=new Date()){
  return `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,"0")}${String(date.getDate()).padStart(2,"0")}`;
}

function parseTideTime(value){return new Date(value.replace(" ","T"))}

function tideApiUrl(station,interval,range){
  const params=new URLSearchParams({
    product:"predictions",application:"ODFieldGuide",begin_date:tideDateString(),range:String(range),
    datum:"MLLW",station,time_zone:"lst_ldt",units:"english",interval,format:"json"
  });
  return `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?${params}`;
}

function formatTideTime(value){
  return new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit"}).format(parseTideTime(value));
}

function formatTideDate(value,index){
  const date=parseTideTime(value);
  if(index===0)return"Today";
  return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(date);
}

function updateCountdown(target){
  clearInterval(tideCountdownTimer);
  const output=document.getElementById("nextTideCountdown");
  const tick=()=>{
    const remaining=Math.max(0,target-Date.now());
    const hours=Math.floor(remaining/3600000),minutes=Math.floor((remaining%3600000)/60000);
    output.textContent=remaining?`${hours}h ${minutes}m`:"Now";
  };
  tick();
  tideCountdownTimer=setInterval(tick,60000);
}

function renderNextTide(region,predictions){
  const now=new Date();
  const next=predictions.find(item=>parseTideTime(item.t)>now)||predictions[0];
  document.getElementById("tideLocation").textContent=region.name;
  document.getElementById("nextTideType").textContent=next.type==="H"?"HIGH":"LOW";
  document.getElementById("nextTideTime").textContent=formatTideTime(next.t);
  document.getElementById("nextTideHeight").textContent=`${Number(next.v).toFixed(1)} ft MLLW`;
  document.getElementById("tideTrend").textContent=next.type==="H"?"Rising":"Falling";
  document.getElementById("tideStatus").textContent="NOAA live";
  document.getElementById("tideUpdated").textContent=`Predictions from ${region.stationName} · Local Pacific time`;
  document.querySelector(".next-tide-card").setAttribute("aria-busy","false");
  updateCountdown(parseTideTime(next.t));
}

function renderTideSchedule(predictions){
  const groups=[];
  predictions.forEach(item=>{
    const key=item.t.slice(0,10);
    let group=groups.find(entry=>entry.key===key);
    if(!group){group={key,items:[]};groups.push(group)}
    group.items.push(item);
  });
  document.getElementById("tideSchedule").innerHTML=groups.slice(0,7).map((group,index)=>{
    const date=parseTideTime(group.items[0].t);
    const dateLabel=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(date);
    return `<article class="tide-day">
      <div class="tide-day-heading"><span>${formatTideDate(group.items[0].t,index)}</span><small>${dateLabel}</small></div>
      <div class="tide-day-events">${group.items.map(item=>`<div class="${item.type==="H"?"high":"low"}"><span>${item.type==="H"?"HIGH":"LOW"}</span><b>${formatTideTime(item.t)}</b><small>${Number(item.v).toFixed(1)} ft</small></div>`).join("")}</div>
    </article>`;
  }).join("");
}

function buildTideCurve(predictions){
  const curve=[];
  for(let index=0;index<predictions.length-1;index++){
    const start=parseTideTime(predictions[index].t),end=parseTideTime(predictions[index+1].t);
    const startValue=Number(predictions[index].v),endValue=Number(predictions[index+1].v);
    const steps=Math.max(2,Math.round((end-start)/600000));
    for(let step=0;step<steps;step++){
      const progress=step/steps;
      const eased=(1-Math.cos(Math.PI*progress))/2;
      curve.push({t:new Date(start.getTime()+(end-start)*progress),v:startValue+(endValue-startValue)*eased});
    }
  }
  const last=predictions[predictions.length-1];
  curve.push({t:parseTideTime(last.t),v:Number(last.v)});
  return curve;
}

function drawTideChart(){
  const canvas=document.getElementById("tideChart");
  if(!canvas||!tideChartData.length)return;
  const wrap=canvas.parentElement,ratio=window.devicePixelRatio||1;
  const width=wrap.clientWidth,height=Math.max(300,Math.min(420,width*.38));
  canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
  const ctx=canvas.getContext("2d");ctx.scale(ratio,ratio);
  const pad={left:48,right:24,top:30,bottom:42};
  const points=tideChartData.map(item=>({time:item.t instanceof Date?item.t:parseTideTime(item.t),value:Number(item.v)}));
  const start=points[0].time,end=new Date(start.getTime()+24*3600000);
  const visible=points.filter(point=>point.time<=end);
  const values=visible.map(point=>point.value),min=Math.floor(Math.min(...values)-.5),max=Math.ceil(Math.max(...values)+.5);
  const x=point=>pad.left+((point.time-start)/(end-start))*(width-pad.left-pad.right);
  const y=value=>pad.top+(max-value)/(max-min)*(height-pad.top-pad.bottom);
  ctx.clearRect(0,0,width,height);ctx.font="11px Inter, Arial";ctx.fillStyle="#6e837f";ctx.strokeStyle="rgba(21,63,60,.14)";ctx.lineWidth=1;
  for(let level=min;level<=max;level++){const py=y(level);ctx.beginPath();ctx.moveTo(pad.left,py);ctx.lineTo(width-pad.right,py);ctx.stroke();ctx.fillText(`${level} ft`,7,py+4)}
  for(let hour=0;hour<=24;hour+=6){const px=pad.left+(hour/24)*(width-pad.left-pad.right);ctx.beginPath();ctx.moveTo(px,pad.top);ctx.lineTo(px,height-pad.bottom);ctx.stroke();const label=new Intl.DateTimeFormat("en-US",{hour:"numeric"}).format(new Date(start.getTime()+hour*3600000));ctx.fillText(label,Math.min(px-12,width-45),height-15)}
  const gradient=ctx.createLinearGradient(0,pad.top,0,height-pad.bottom);gradient.addColorStop(0,"rgba(41,112,119,.30)");gradient.addColorStop(1,"rgba(41,112,119,.03)");
  ctx.beginPath();visible.forEach((point,index)=>{if(index===0)ctx.moveTo(x(point),y(point.value));else ctx.lineTo(x(point),y(point.value))});ctx.lineTo(x(visible[visible.length-1]),height-pad.bottom);ctx.lineTo(x(visible[0]),height-pad.bottom);ctx.closePath();ctx.fillStyle=gradient;ctx.fill();
  ctx.beginPath();visible.forEach((point,index)=>{if(index===0)ctx.moveTo(x(point),y(point.value));else ctx.lineTo(x(point),y(point.value))});ctx.strokeStyle="#2b7377";ctx.lineWidth=3;ctx.stroke();
  const now=new Date();
  if(now>=start&&now<=end){const px=pad.left+((now-start)/(end-start))*(width-pad.left-pad.right);ctx.beginPath();ctx.moveTo(px,pad.top);ctx.lineTo(px,height-pad.bottom);ctx.strokeStyle="#dd6b42";ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(px,pad.top+10,5,0,Math.PI*2);ctx.fillStyle="#dd6b42";ctx.fill();ctx.fillStyle="#dd6b42";ctx.font="700 9px Inter, Arial";ctx.fillText("NOW",Math.min(px+7,width-35),pad.top+14)}
}

function showTideError(region){
  clearInterval(tideCountdownTimer);
  document.getElementById("tideLocation").textContent=region.name;
  document.getElementById("nextTideType").textContent="--";
  document.getElementById("tideStatus").textContent="Official table";
  document.getElementById("tideUpdated").textContent="Live predictions unavailable. Use the official NOAA link below.";
  document.querySelector(".next-tide-card").setAttribute("aria-busy","false");
  document.getElementById("tideChartLoading").textContent="The live curve could not be loaded.";
  document.getElementById("tideSchedule").innerHTML='<div class="tide-loading"><b>Live schedule unavailable.</b><br>Open the selected NOAA station below for current predictions.</div>';
}

async function loadTides(regionKey){
  const region=tideRegions[regionKey];
  document.querySelector(".next-tide-card").setAttribute("aria-busy","true");
  document.getElementById("tideStatus").textContent="Updating";
  document.getElementById("noaaStationLink").href=`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${region.station}`;
  document.getElementById("tideChartLoading").hidden=false;
  try{
    const hiloResponse=await fetch(tideApiUrl(region.station,"hilo",168));
    if(!hiloResponse.ok)throw new Error("NOAA tide request failed");
    const hilo=await hiloResponse.json();
    if(!hilo.predictions?.length)throw new Error("NOAA returned no predictions");
    renderNextTide(region,hilo.predictions);
    renderTideSchedule(hilo.predictions);
    tideChartData=buildTideCurve(hilo.predictions);
    document.getElementById("tideChartLoading").hidden=true;
    drawTideChart();
  }catch(error){
    console.warn(error);
    showTideError(region);
  }
}

function setupTides(){
  const buttons=[...document.querySelectorAll("[data-tide-region]")];
  if(!buttons.length)return;
  buttons.forEach(button=>button.addEventListener("click",()=>{
    buttons.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active))});
    loadTides(button.dataset.tideRegion);
  }));
  window.addEventListener("resize",()=>{clearTimeout(window.tideResizeTimer);window.tideResizeTimer=setTimeout(drawTideChart,120)});
  loadTides("florence");
}

document.addEventListener("DOMContentLoaded",setupTides);
