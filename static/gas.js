function setupFuelCalculator(){
  const form=document.getElementById("fuelCalculator");
  if(!form)return;
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const data=new FormData(form);
    const miles=Number(data.get("miles")),mpg=Number(data.get("mpg"));
    const extra=Number(data.get("extraGallons")),price=Number(data.get("price"));
    if(!Number.isFinite(miles)||!Number.isFinite(mpg)||!Number.isFinite(extra)||!Number.isFinite(price)||mpg<=0||price<=0)return;
    const road=miles/mpg,total=road+extra,cost=total*price;
    document.getElementById("roadGallons").textContent=`${road.toFixed(1)} gal`;
    document.getElementById("extraGallonsResult").textContent=`${extra.toFixed(1)} gal`;
    document.getElementById("totalGallons").textContent=`${total.toFixed(1)} gal`;
    document.getElementById("fuelCost").textContent=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cost);
    const result=document.getElementById("fuelResult");
    result.hidden=false;
    result.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
}

function gasMoney(value){return `$${Number(value).toFixed(2)}`}

function renderGasDelta(id,current,reference){
  const element=document.getElementById(id);
  if(!element||!Number.isFinite(reference)){if(element)element.textContent="Current Oregon average";return}
  const cents=Math.round((current-reference)*100);
  element.className=cents>0?"gas-up":cents<0?"gas-down":"gas-steady";
  element.textContent=cents===0?"No change since yesterday":`${cents>0?"▲":"▼"} ${Math.abs(cents)}¢ since yesterday`;
}

function renderGasTrend(data){
  const rows=[
    ["Today",data.current],
    ["Yesterday",data.yesterday],
    ["Week ago",data.weekAgo],
    ["Month ago",data.monthAgo]
  ].filter(([,prices])=>prices);
  document.getElementById("gasTrendBody").innerHTML=rows.map(([label,prices])=>`<tr>
    <td>${label}</td><td>${gasMoney(prices.regular)}</td><td>${gasMoney(prices.mid)}</td><td>${gasMoney(prices.premium)}</td><td>${gasMoney(prices.diesel)}</td>
  </tr>`).join("");
}

async function loadOregonGasPrices(){
  const note=document.getElementById("gasFetchedNote");
  if(!note)return;
  try{
    const response=await fetch("/api/gas");
    if(!response.ok)throw new Error("Price feed unavailable");
    const data=await response.json();
    if(!data.current)throw new Error("No current average");
    const current=data.current;
    document.getElementById("gasRegular").textContent=gasMoney(current.regular);
    document.getElementById("gasMid").textContent=gasMoney(current.mid);
    document.getElementById("gasPremium").textContent=gasMoney(current.premium);
    document.getElementById("gasDiesel").textContent=gasMoney(current.diesel);
    renderGasDelta("gasRegularDelta",current.regular,data.yesterday?.regular);
    renderGasDelta("gasMidDelta",current.mid,data.yesterday?.mid);
    renderGasDelta("gasPremiumDelta",current.premium,data.yesterday?.premium);
    renderGasDelta("gasDieselDelta",current.diesel,data.yesterday?.diesel);
    renderGasTrend(data);
    const updated=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(data.fetched));
    note.textContent=`Oregon statewide average · updated ${updated} · source: AAA`;
    const priceInput=document.querySelector('#fuelCalculator input[name="price"]');
    if(priceInput&&!priceInput.value)priceInput.value=Number(current.regular).toFixed(3);
  }catch(error){
    note.innerHTML='Local preview is showing the most recently checked Oregon averages. The hosted page refreshes from <a href="https://gasprices.aaa.com/?state=OR" target="_blank" rel="noreferrer">AAA Gas Prices</a>.';
    ["gasRegularDelta","gasMidDelta","gasPremiumDelta","gasDieselDelta"].forEach(id=>{
      const element=document.getElementById(id);if(element)element.textContent="Most recently checked";
    });
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  setupFuelCalculator();
  loadOregonGasPrices();
});
