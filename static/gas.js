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

document.addEventListener("DOMContentLoaded",setupFuelCalculator);
