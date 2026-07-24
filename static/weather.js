const weatherRegions={
  florence:{name:"Florence",lat:43.9826,lon:-124.0998},
  winchester:{name:"Winchester Bay",lat:43.6773,lon:-124.1734},
  coos:{name:"Coos Bay",lat:43.3665,lon:-124.2179}
};

const weatherDescriptions={
  0:"Clear",1:"Mostly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Freezing fog",
  51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",56:"Freezing drizzle",57:"Freezing drizzle",
  61:"Light rain",63:"Rain",65:"Heavy rain",66:"Freezing rain",67:"Freezing rain",
  71:"Light snow",73:"Snow",75:"Heavy snow",77:"Snow grains",
  80:"Rain showers",81:"Rain showers",82:"Heavy showers",85:"Snow showers",86:"Heavy snow showers",
  95:"Thunderstorm",96:"Thunderstorm with hail",99:"Severe thunderstorm"
};

const weatherSymbols={
  0:"SUN",1:"SUN",2:"MIX",3:"CLOUD",45:"FOG",48:"FOG",51:"DRIZZLE",53:"DRIZZLE",
  55:"RAIN",56:"ICE",57:"ICE",61:"RAIN",63:"RAIN",65:"RAIN",66:"ICE",67:"ICE",
  71:"SNOW",73:"SNOW",75:"SNOW",77:"SNOW",80:"SHOWER",81:"SHOWER",82:"SHOWER",
  85:"SNOW",86:"SNOW",95:"STORM",96:"STORM",99:"STORM"
};

function weatherUrl(region){
  const current="temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,visibility";
  const daily="weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset";
  return `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=${current}&daily=${daily}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=7`;
}

function compassDirection(degrees){
  return["N","NE","E","SE","S","SW","W","NW"][Math.round((degrees||0)/45)%8];
}

function formatWeatherTime(value){
  if(!value)return"";
  return new Intl.DateTimeFormat("en-US",{weekday:"short",hour:"numeric",minute:"2-digit"}).format(new Date(value));
}

function forecastDay(value,index){
  if(index===0)return"Today";
  return new Intl.DateTimeFormat("en-US",{weekday:"short"}).format(new Date(`${value}T12:00:00`));
}

function buildRideWindow(current){
  const wind=current.wind_speed_10m||0,gust=current.wind_gusts_10m||0,rain=current.precipitation||0;
  const visibility=(current.visibility||0)/1609.344,temp=current.temperature_2m;
  if(visibility&&visibility<2)return["LOW VISIBILITY","Keep the loop short and the group close.","Fog or marine cloud is limiting landmarks. Carry offline navigation and be ready to turn back."];
  if(gust>=35)return["HIGH-WIND CAUTION","Exposed riding deserves a rethink.","Strong gusts can move sand, hide tracks, and make crest approaches less predictable. Choose a sheltered backup."];
  if(gust>=25||wind>=18)return["WIND WATCH","Ride with extra margin.","Breezy conditions can reshape ridges and increase fatigue. Slow down at crests and regroup more often."];
  if(rain>=0.1)return["WET-WEATHER NOTE","Expect a colder, slower outing.","Rain can firm the surface but reduce comfort and visibility. Pack waterproof layers and protect navigation devices."];
  if(temp<=45)return["COLD COAST","Dry layers are essential.","Wind chill and moisture can turn a mild reading into cold exposure. Carry warm, dry insulation for every rider."];
  return["FAVORABLE WINDOW","Conditions look workable—stay coast-ready.","No major weather flag stands out right now. Dune conditions still vary, so start with a conservative first loop."];
}

function renderCurrent(region,data){
  const current=data.current;
  document.getElementById("weatherLocation").textContent=region.name;
  document.getElementById("currentTemperature").textContent=`${Math.round(current.temperature_2m)}°`;
  document.getElementById("currentCondition").textContent=weatherDescriptions[current.weather_code]||"Coastal conditions";
  document.getElementById("currentFeelsLike").textContent=`Feels like ${Math.round(current.apparent_temperature)}° · ${current.relative_humidity_2m}% humidity`;
  document.getElementById("currentWind").textContent=`${Math.round(current.wind_speed_10m)} mph ${compassDirection(current.wind_direction_10m)}`;
  document.getElementById("currentGusts").textContent=`${Math.round(current.wind_gusts_10m)} mph`;
  document.getElementById("currentRain").textContent=`${Number(current.precipitation).toFixed(2)} in`;
  document.getElementById("currentVisibility").textContent=`${((current.visibility||0)/1609.344).toFixed(1)} mi`;
  document.getElementById("weatherUpdated").textContent=`Updated ${formatWeatherTime(current.time)} · Live forecast data from Open-Meteo`;
  document.getElementById("weatherStatus").textContent="Live";
  document.querySelector(".weather-now").setAttribute("aria-busy","false");
  const ride=buildRideWindow(current);
  document.getElementById("rideWindowLabel").textContent=ride[0];
  document.getElementById("rideWindowTitle").textContent=ride[1];
  document.getElementById("rideWindowCopy").textContent=ride[2];
}

function renderForecast(data){
  const daily=data.daily;
  document.getElementById("forecastGrid").innerHTML=daily.time.map((date,index)=>{
    const code=daily.weather_code[index],description=weatherDescriptions[code]||"Variable";
    const dateLabel=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(`${date}T12:00:00`));
    return `<article class="forecast-card">
      <div class="forecast-day"><span>${forecastDay(date,index)}</span><small>${dateLabel}</small></div>
      <div class="weather-symbol" aria-hidden="true">${weatherSymbols[code]||"WX"}</div>
      <h3>${description}</h3>
      <div class="forecast-temps"><b>${Math.round(daily.temperature_2m_max[index])}°</b><span>${Math.round(daily.temperature_2m_min[index])}°</span></div>
      <dl><div><dt>Rain</dt><dd>${daily.precipitation_probability_max[index]??0}%</dd></div><div><dt>Wind</dt><dd>${Math.round(daily.wind_speed_10m_max[index])} mph</dd></div><div><dt>Gusts</dt><dd>${Math.round(daily.wind_gusts_10m_max[index])} mph</dd></div></dl>
    </article>`;
  }).join("");
}

function showWeatherError(region){
  document.getElementById("weatherLocation").textContent=region.name;
  document.getElementById("weatherStatus").textContent="Official forecast";
  document.getElementById("currentCondition").textContent="Live data unavailable";
  document.getElementById("currentFeelsLike").textContent="Use the official forecast link below";
  document.getElementById("weatherUpdated").textContent="The guide could not reach the live forecast service.";
  document.querySelector(".weather-now").setAttribute("aria-busy","false");
  document.getElementById("rideWindowLabel").textContent="CHECK BEFORE DEPARTURE";
  document.getElementById("rideWindowTitle").textContent="Open the official forecast.";
  document.getElementById("rideWindowCopy").textContent="Review wind, rain, visibility, warnings, road conditions, and Forest Service alerts before leaving pavement.";
  document.getElementById("forecastGrid").innerHTML='<div class="forecast-error"><b>Live outlook unavailable.</b><p>The rest of this guide remains available. Use the National Weather Service link below for current conditions and alerts.</p></div>';
}

async function loadWeather(regionKey){
  const region=weatherRegions[regionKey];
  document.querySelector(".weather-now").setAttribute("aria-busy","true");
  document.getElementById("weatherStatus").textContent="Updating";
  document.getElementById("nwsForecastLink").href=`https://forecast.weather.gov/MapClick.php?lat=${region.lat}&lon=${region.lon}`;
  try{
    const response=await fetch(weatherUrl(region));
    if(!response.ok)throw new Error(`Weather request failed: ${response.status}`);
    const data=await response.json();
    renderCurrent(region,data);
    renderForecast(data);
  }catch(error){
    console.warn(error);
    showWeatherError(region);
  }
}

function setupWeather(){
  const buttons=[...document.querySelectorAll("[data-weather-region]")];
  if(!buttons.length)return;
  buttons.forEach(button=>button.addEventListener("click",()=>{
    buttons.forEach(item=>{
      const active=item===button;
      item.classList.toggle("active",active);
      item.setAttribute("aria-pressed",String(active));
    });
    loadWeather(button.dataset.weatherRegion);
  }));
  loadWeather("florence");
}

document.addEventListener("DOMContentLoaded",setupWeather);
