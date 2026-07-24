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
  const hourly="temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_gusts_10m,visibility";
  return `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=${current}&hourly=${hourly}&daily=${daily}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=7`;
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

function upcomingHourlyIndexes(data,hours=24){
  const now=Date.now();
  const first=data.hourly.time.findIndex(value=>new Date(value).getTime()>=now);
  const start=Math.max(first,0);
  return data.hourly.time.map((_,index)=>index).slice(start,start+hours);
}

function renderHourly(data){
  const hourly=data.hourly;
  const indexes=upcomingHourlyIndexes(data,24).filter((_,index)=>index%4===0).slice(0,6);
  document.getElementById("hourlyGrid").innerHTML=indexes.map(index=>{
    const time=new Date(hourly.time[index]);
    const label=new Intl.DateTimeFormat("en-US",{weekday:"short",hour:"numeric"}).format(time);
    const code=hourly.weather_code[index];
    const visibility=(hourly.visibility[index]||0)/1609.344;
    return `<article class="hourly-card">
      <span>${label}</span>
      <div class="hourly-symbol">${weatherSymbols[code]||"WX"}</div>
      <h3>${Math.round(hourly.temperature_2m[index])}°</h3>
      <p>${weatherDescriptions[code]||"Variable"}</p>
      <dl><div><dt>Rain</dt><dd>${hourly.precipitation_probability[index]??0}%</dd></div><div><dt>Wind</dt><dd>${Math.round(hourly.wind_speed_10m[index])} mph</dd></div><div><dt>Gust</dt><dd>${Math.round(hourly.wind_gusts_10m[index])} mph</dd></div><div><dt>View</dt><dd>${visibility.toFixed(1)} mi</dd></div></dl>
    </article>`;
  }).join("");
}

function renderPracticalGuidance(region,data){
  const current=data.current;
  const hourly=data.hourly;
  const indexes=upcomingHourlyIndexes(data,24);
  const best=indexes.reduce((winner,index)=>{
    const visibility=(hourly.visibility[index]||0)/1609.344;
    const score=(hourly.wind_speed_10m[index]||0)+(hourly.wind_gusts_10m[index]||0)*1.4+(hourly.precipitation_probability[index]||0)*.32+(visibility<3?35:0);
    return !winner||score<winner.score?{index,score}:winner;
  },null);
  const bestTime=best?new Intl.DateTimeFormat("en-US",{weekday:"short",hour:"numeric"}).format(new Date(hourly.time[best.index])):"later";
  const bestGust=best?Math.round(hourly.wind_gusts_10m[best.index]):Math.round(current.wind_gusts_10m||0);
  const currentTemp=Math.round(current.temperature_2m||0);
  const feels=Math.round(current.apparent_temperature||currentTemp);
  const rainChance=Math.max(...indexes.map(index=>hourly.precipitation_probability[index]||0),0);
  const lowestVisibility=Math.min(...indexes.map(index=>(hourly.visibility[index]||16093)/1609.344),10);
  const peakGust=Math.max(...indexes.map(index=>hourly.wind_gusts_10m[index]||0),0);

  document.getElementById("weatherTimingTitle").textContent=`Best-looking checkpoint: ${bestTime}`;
  document.getElementById("weatherTimingCopy").textContent=`This is the calmest forecast checkpoint in the next 24 hours, with gusts near ${bestGust} mph. It is a planning clue—not a guarantee on exposed sand.`;

  if(feels<=45){
    document.getElementById("weatherWearTitle").textContent="Dress for cold wind and moisture";
    document.getElementById("weatherWearCopy").textContent="Wear a windproof shell over a warm layer, pack dry gloves and socks, and keep a complete dry layer sealed in the vehicle.";
  }else if(rainChance>=45){
    document.getElementById("weatherWearTitle").textContent="Bring a real rain layer";
    document.getElementById("weatherWearCopy").textContent="Use a wind-resistant waterproof shell, quick-drying layers, and dry footwear. Cotton stays cold when the coast turns wet.";
  }else{
    document.getElementById("weatherWearTitle").textContent="Coastal layers, even if town feels mild";
    document.getElementById("weatherWearCopy").textContent=`Around ${currentTemp}° now. Carry a wind shell and one warm layer because open dunes can feel cooler than the selected town.`;
  }

  if(peakGust>=30||lowestVisibility<3){
    document.getElementById("weatherGearTitle").textContent="Protect navigation and shorten the loop";
    document.getElementById("weatherGearCopy").textContent="Save the map offline, secure loose gear, use clear eye protection, keep the group close, and set a firm turnaround point before visibility or wind worsens.";
  }else if(rainChance>=45){
    document.getElementById("weatherGearTitle").textContent="Keep essentials dry";
    document.getElementById("weatherGearCopy").textContent="Seal phones, maps, gloves, and a battery bank. Add towels, a change of socks, and a dry place for helmets and goggles.";
  }else{
    document.getElementById("weatherGearTitle").textContent="Pack for a fast coastal change";
    document.getElementById("weatherGearCopy").textContent="Bring offline maps, water, eye protection, a wind layer, warm backup clothing, and enough light to handle a delayed return.";
  }

  if(rainChance>=65){
    document.getElementById("weatherRoadTitle").textContent="Wet-road conditions are possible";
    document.getElementById("weatherRoadCopy").textContent=`Rain probability reaches ${rainChance}% in the next day. Allow more braking distance, watch for standing water, and check US 101 cameras before towing.`;
  }else if(lowestVisibility<3){
    document.getElementById("weatherRoadTitle").textContent="Fog may affect the drive";
    document.getElementById("weatherRoadCopy").textContent="Low visibility is forecast at times. Slow down, use headlights, allow extra travel time, and verify coastal highway cameras.";
  }else if(peakGust>=35){
    document.getElementById("weatherRoadTitle").textContent="Watch exposed roads and trailers";
    document.getElementById("weatherRoadCopy").textContent="Strong gusts can affect high-profile vehicles and trailers. Check TripCheck and postpone if towing becomes uncomfortable.";
  }else{
    document.getElementById("weatherRoadTitle").textContent=`No major weather-road flag near ${region.name}`;
    document.getElementById("weatherRoadCopy").textContent="The forecast does not show a strong rain, fog, or wind signal right now. TripCheck remains the source for live incidents, construction, and cameras.";
  }
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
  document.getElementById("hourlyGrid").innerHTML='<div class="forecast-error"><b>Hourly outlook unavailable.</b><p>Use the official forecast link for current timing.</p></div>';
  document.getElementById("weatherTimingTitle").textContent="Check the official hourly forecast";
  document.getElementById("weatherTimingCopy").textContent="Live timing could not be calculated. Use National Weather Service hourly details before choosing a departure window.";
  document.getElementById("weatherWearTitle").textContent="Pack complete coastal layers";
  document.getElementById("weatherWearCopy").textContent="Bring a windproof shell, warm layer, dry footwear, gloves, and a waterproof backup.";
  document.getElementById("weatherGearTitle").textContent="Keep the conservative kit";
  document.getElementById("weatherGearCopy").textContent="Carry offline maps, water, first aid, eye protection, lights, and dry clothing.";
  document.getElementById("weatherRoadTitle").textContent="Check TripCheck before leaving";
  document.getElementById("weatherRoadCopy").textContent="Use live cameras and incident reports because weather-based road guidance is unavailable.";
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
    renderPracticalGuidance(region,data);
    renderHourly(data);
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
