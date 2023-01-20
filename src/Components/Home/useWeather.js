// icon svg files from iconfinder.com
import sun from '../../assets/weather-icons/sun.svg'
import sunny from '../../assets/weather-icons/sunny.svg'
import night from '../../assets/weather-icons/night.svg'
import cloudy_night from '../../assets/weather-icons/cloudy_night.svg'
import drizzle from '../../assets/weather-icons/drizzle.svg'
import sprinkle from '../../assets/weather-icons/sprinkle.svg'
import rain from '../../assets/weather-icons/rain.svg'
import nightRain from '../../assets/weather-icons/nightRain.svg'
import showers from '../../assets/weather-icons/showers.svg'
import snow from '../../assets/weather-icons/snow.svg'
import snowstorm from '../../assets/weather-icons/snowstorm.svg'
import snowgrains from '../../assets/weather-icons/snowgrains.svg'
import day_clouds from '../../assets/weather-icons/cloudsDay.svg'
import fog from '../../assets/weather-icons/foggy.svg'
import fog2 from '../../assets/weather-icons/fog2.svg'
import haze from '../../assets/weather-icons/haze.svg'
import overcast from '../../assets/weather-icons/overcast.svg'
import thunderstorm from '../../assets/weather-icons/thunderStorm.svg'
import thunderstorm2 from '../../assets/weather-icons/thunderStorm2.svg'
import hailStorm from '../../assets/weather-icons/hailstorm.svg'
import noWeatherData from '../../assets/weather-icons/noWeather.svg'
import { useEffect, useState } from 'react'

/* 
   Custom weather hook. Weather is returned as JSON data. 
   If input value is not an array with a latitude and longitude, then the browser will get weather by geolocation by default, regardless of input.  
   Open-meteo weather api is used. Api offers no icons. Instead, local icons are used depending on weather code and time. 
   Updates by the hour! If it starts to rain or snow, you might have to wait for the hour to change for it to update.

 */
const useWeather = (weatherInput) => {
   const [weather, setWeather] = useState('');

   // Set weather with coordinates (weatherInput), if any.
   useEffect(() => {
      if (Array.isArray(weatherInput) && weatherInput.length === 2 && typeof weatherInput[0] === 'number' && typeof weatherInput[1] === 'number')
         fetchWithCoords(weatherInput);
      else {
         try {
            if (navigator.geolocation) {
               (navigator.geolocation.getCurrentPosition(setWeatherFromGeoLocation));
            } else setWeather(false);
         } catch (err) { console.log(err) }
      }
   }, [])

   // checks if it is day/night. Takes current time, sunrise, and sunset times as arguments.
   const checkIfDaylight = (timeNow, sunrise, sunset) => {
      sunrise = new Date(sunrise);
      sunset = new Date(sunset);
      if (timeNow > sunrise.getTime() && timeNow < sunset.getTime()) return true;
      else return false;
   }
   
   // uses the weather_interpreter to translate the weather codes into svg icon urls and description of the weather in a tuple.
   const addDailyIcons = (data) => {
      data.daily.icons = [[data.description, data.icon]];
      for (let i = 1; i < 7; i++) {
         data ?
            data.daily.icons.push(weather_interpreter(data.daily.weathercode[i])) :
            data.daily.icons.push(['No weather Data', noWeatherData])
      }
   }

   /* Adds all the icon urls for the hourly data to the weather object.
      Uses the weathercodes from the weather object to translate and return a tuple with a description and image(s) for each hour (24 hours). */

   const addhourlyIcons = (data) => {
      data.hourly.icons = [];

      /* loop through the weather codes and run them through the icon interpreter. (finds the appropriate icon and description)
         are there two icons? one is for day time, the other is for night. compare sunrise and sunset with the time of day and assign the correct icon for that time.
         
         The 24 hours needed might start from anytime, so by getting 24 hour data you might need to involve today and tomorrow.
         Loops 48 hours and calculates what day the current loop is on and compares current time with sunrise/sunset times according to what day it is.
      */ 
      for (let i = 0; i < 48; i++) {
         const weatherCodeData = weather_interpreter(data.hourly.weathercode[i]); // gets icon tuple. if the length is 2, there is only 1 icon. Add it.
         if (weatherCodeData.length === 2) data.hourly.icons.push([weatherCodeData[0], weatherCodeData[1], 0])
         //else, must be two icons. check if its day or night and assign the proper icon.
         else {
            const day = i < 24 ? 0 : 1; // 0 is today, 1 is tomorrow.
            const dateOfArrayItem = new Date(data.hourly.time[i]); 
            if (checkIfDaylight(dateOfArrayItem.getTime(), data.daily.sunrise[day], data.daily.sunset[day])) {
               data.hourly.icons.push([weatherCodeData[0], weatherCodeData[1], 0]);  // add a 0 to the tuple to indicate that its a day time icon(used in another function)
            }
            else data.hourly.icons.push([weatherCodeData[0], weatherCodeData[2], 1]);// add a 1 to the tuple to indicate that its a night time icon (used in another function)
         }
      }
   }

   // FETCH WITH GEOLOCATION (default)
   // (used immediately inside a useEffect)
   const setWeatherFromGeoLocation = (position) => {
      let apiURL = 'https://api.open-meteo.com/v1/forecast';
      let coordsURL = `?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
      const hourlyURL = `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,dewpoint_2m,cloudcover,apparent_temperature,snowfall,precipitation,weathercode&timezone=auto&current_weather=true`;
      const dailyURL = `&daily=apparent_temperature_min,apparent_temperature_max,sunrise,sunset,weathercode`
      apiURL = apiURL + coordsURL + hourlyURL + dailyURL;
      // if geo location was successfully enabled, fetch data.
      if (position)
         fetch(apiURL)
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
               const date = new Date()
               const time = date.getTime();
               const weatherCodeData = weather_interpreter(data.current_weather.weathercode);
               // if there is only 1 icon, set it.
               if (weatherCodeData.length === 2) data.icon = weatherCodeData[1];
               //else, check if its day or night and assign the proper icon.
               else {
                  const currentTime = date.getTime();
                  if (checkIfDaylight(time, data.daily.sunrise[0], data.daily.sunset[0])) {
                     data.icon = weatherCodeData[1];
                     data.isDay = true;
                  }
                  else {
                     data.isDay = false
                     data.icon = weatherCodeData[2];
                  }
               }
               data.description = weatherCodeData[0];
               addDailyIcons(data);
               addhourlyIcons(data);
               setWeather(data); // weather state is set here.
            })
            .catch(err => console.log(err))
   }

   // FETCH WITH GIVEN COORDINATES
   const fetchWithCoords = (coords) => {
      let apiURL = 'https://api.open-meteo.com/v1/forecast';
      const coordsURL = `?latitude=${coords[0]}&longitude=${coords[1]}`;
      const hourlyURL = `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,dewpoint_2m,cloudcover,apparent_temperature,snowfall,precipitation,weathercode&timezone=auto&current_weather=true`;
      const dailyURL = `&daily=apparent_temperature_min,apparent_temperature_max,sunrise,sunset,weathercode`
      apiURL = apiURL + coordsURL + hourlyURL + dailyURL;


      try {
         fetch(apiURL)
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
               const date = new Date()
               const time = date.getTime();
               const weatherCodeData = weather_interpreter(data.current_weather.weathercode);// description and icon(s) in array
               // if there is only 1 icon, set it to the data.
               if (weatherCodeData.length === 2) data.icon = weatherCodeData[1];
               //else, check if its day or night and assign the proper icon.
               else {
                  if (checkIfDaylight(time, data.daily.sunrise[0], data.daily.sunset[0])) {
                     data.icon = weatherCodeData[1];
                     data.isDay = true;
                  }
                  else {
                     data.icon = weatherCodeData[2];
                     data.isDay = false;
                  }
               }
               data.description = weatherCodeData[0];
               addDailyIcons(data);
               addhourlyIcons(data);
               setWeather(data); // weather state is set here.
            })
      } catch (err) { console.log("Unable to fetch data, check inputs.", err) }
   
   }

   return [weather, setWeather]; // hook return.
}//hook end 

// returns a description & icon/icons from the corresponding current weather code. 
const weather_interpreter = (code) => {
   const weatherCodes = {
      0: ["Clear sky", sun, night],
      1: ["Mainly clear", sun, night],
      2: ["Partly cloudy", day_clouds, cloudy_night],
      3: ["Overcast", overcast],
      45: ["Fog", fog, fog2],
      48: ["Depositing rime fog", fog],
      51: ["Light drizzle", sprinkle],
      53: ["Drizzle", drizzle],
      55: ["Heavy drizzle", drizzle],
      56: ["Freezing drizzle", drizzle],
      57: ["Freezing heavy drizzle", drizzle],
      61: ["Slight rain", rain, nightRain],
      63: ["Rain", rain, nightRain],
      65: ["Heavy rain", rain, nightRain],
      66: ["Freezing rain", rain, nightRain],
      67: ["Freezing heavy rain", rain, nightRain],
      71: ["light snow", snow],
      73: ["Snow", snow],
      75: ["Heavy snow", snowstorm],
      77: ["Snow grains", snowgrains],
      80: ["Slight rain showers", showers],
      81: ["Rain showers", showers],
      82: ["Heavy rain showers", showers],
      85: ["Slight snow showers", snowstorm],
      86: ["Heavy snow showers", snowstorm],
      95: ["Thunderstorm", thunderstorm, thunderstorm2],
      96: ["Thunderstorm & hail", hailStorm],
      99: ["Thunderstorm & hail", hailStorm]
   }
   return weatherCodes[code];
}


export { useWeather };


