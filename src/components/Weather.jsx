
import './Weather.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import { useEffect, useRef, useState } from 'react';
const Weather = () => {
  const inputref=useRef();
const[weatherdata,setweatherdata]=useState(false);
const allicons={
  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloud_icon,
  "02n":cloud_icon,
  "03d":cloud_icon,
  "03n":cloud_icon,
  "04d":drizzle_icon,
  "04n":drizzle_icon,
  "09d":rain_icon,
  "09n":rain_icon,
  "10d":rain_icon,
  "10n":rain_icon,
  "13d":snow_icon,
  "13n":snow_icon
}
  const search=async(city)=>{
  if(city===""){
    alert("Enter City Name");
    return;
  }
   try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
  const response=await fetch(url);
  const data=await response.json();
  if(!response.ok){
    alert(data.message);
    return;
  }
  const icon=allicons[data.weather[0].icon]||clear_icon;
  setweatherdata({
    humidity:data.main.humidity,
    windspeed:data.wind.speed,
    temperature:Math.floor(data.main.temp),
    location:data.name,
    icon:icon
  })
  } catch (error) {
    setweatherdata(false);
    console.error("Error in fetching");
   }
  }

  useEffect(()=>{
       search("London");
  },[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherdata?<>
      <img src={weatherdata.icon} className='weather-icon' alt="" />
      <p className='temperature'>{weatherdata.temperature}°C</p>
      <p className='location'>{weatherdata.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherdata.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherdata.windspeed}</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
      </>:<>
      </>
} 
    </div>
  )
}

export default Weather