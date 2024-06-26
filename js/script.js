const searchLocationInput=document.getElementById("searchLocation")

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
   const lat= pos.coords.latitude
  const long= pos.coords.longitude
  console.log(lat);
  console.log(long);
  getWeather(`${lat},${long}`)
  })
}
async function getWeather(query) {
  let res=await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=946992043c004dddb10150655242406`)
  let data = await res.json()
  console.log(data);
  displayTodayWeather(data)
  displayTomm(data)
  displayAfterTomm(data)
}

searchLocationInput.addEventListener('input',function(e){
  getWeather(e.target.value)
})

function displayTodayWeather(data) {
  const todayDate=data.current.last_updated
  let date=new Date(todayDate)
  const todayWeekDay =date.toLocaleString('en-us',{weekday:'long'}) ;
  const todayDay =date.getDate();
  const todayMonth =date.toLocaleString('en-us',{month:'long'});
  const cityName=data.location.name
  const todayDegree =data.current.temp_c
  const todayCond=data.current.condition.text
  const humidity=data.current.humidity
  const wind=data.current.wind_kph
  const windDir=data.current.wind_dir
  dirToday.innerHTML=windDir
  windSpeedToday.innerHTML=wind
  humidityToday.innerHTML=humidity
  todayCondition.innerHTML= todayCond 
  tempToday.innerHTML=todayDegree
  cityToday.innerHTML=cityName
  todayWeekDayMarkeup.innerHTML=todayWeekDay
  dateToday.innerHTML=`${todayDay} ${todayMonth}`
  imgToday.setAttribute('src', data.current.condition.icon);
}
  
function displayTomm({forecast}) {
    tomorrowDay.innerHTML=new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'})
    iconTommorow.setAttribute('src',forecast.forecastday[1].day.condition.icon)
    tMaxTemp.innerHTML=forecast.forecastday[1].day.maxtemp_c
    tMinTemp.innerHTML=forecast.forecastday[1].day.mintemp_c
    
    tCond.innerHTML=forecast.forecastday[1].day.condition.text
}
function displayAfterTomm({forecast}) {
    afterTomorrow.innerHTML=new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'})
    iconAfterTom.setAttribute('src',forecast.forecastday[2].day.condition.icon)
    afterTomMaxTemp.innerHTML=forecast.forecastday[2].day.maxtemp_c
    afterTomMinTemp.innerHTML=forecast.forecastday[2].day.mintemp_c
    thirdCond.innerHTML=forecast.forecastday[2].day.condition.text
    
}


