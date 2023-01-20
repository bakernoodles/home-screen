import '../Weather/weather.css'
import back_image from '../../../../assets/back.svg'
import noWeatherData from '../../../../assets/weather-icons/noWeather.svg'
import { useEffect, useState } from 'react';
import WeatherByDay from './weather-sub-components/WeatherByDay';
import CurrentWeather from './weather-sub-components/CurrentWeather';
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Weather = (props) => {
   const date = new Date();
   const hour = date.getHours();
   const [jsxArray, setJsxArray] = useState([]); // holds the jsx for the hourly data jsx.
   const [preActiveBox, setPrevActiveBox] = useState(null);
   const getTemperature = (temp = props.weather.current_weather.temperature) => {
      if (!props.tempScale) return Math.trunc(temp);
      return (Math.trunc(temp * 9 / 5) + 32).toString();
   }

   const getApparentTemp = () => {
      if (!props.tempScale) return Math.trunc(props.weather.hourly.apparent_temperature[hour]);
      return (Math.trunc(props.weather.hourly.apparent_temperature[hour] * 9 / 5) + 32).toString();
   }

   const getDewPoint = () => {
      if (!props.tempScale) return Math.trunc(props.weather.hourly.dewpoint_2m[hour]);
      return (Math.trunc(props.weather.hourly.dewpoint_2m[hour] * 9 / 5) + 32).toString();
   }

   const handleTempScaleChange = (scale) => {
      if (scale == 0) props.setTempScale(1);
      else props.setTempScale(0);
   }
   // Get the hourly icon. I had errors before I modified the icon implementation code. Gonna leave the try/catch in just in case.
   
   const getHourlyIcon = (index) => {
      let icon = noWeatherData;
      try {
         icon = props.weather.hourly.icons[index][1];
      } catch (err) {
         console.log(`There was an error adding an hourly data icon. 
         perhaps refresh the page?`, err)
      }
      return icon;
   }
   // handle hourly boxes on click. shows more info in the hourly section on click. 
   const handleHourlyClicked = (i) => {
      // if the active box is clicked, check if it is already open. if it is, hide the extra info. if not, show it. i = box index
      if (preActiveBox === i) {
         if (document.getElementById('hourly-container' + i).classList.contains('expand-box')) {
            document.getElementById('hourly-container' + i).classList.remove('expand-box');
            document.getElementById('hourly-bottom-row' + i).classList.remove('show-hourly-other');
         } else {
            document.getElementById('hourly-container' + i).classList.add('expand-box');
            document.getElementById('hourly-bottom-row' + i).classList.add('show-hourly-other');
         }
      } 
      // else if previous box clicked is not null, and is a different box; hide the previous box info, and show the new box info.
      else if (preActiveBox !== i && typeof preActiveBox !== 'object') {
         document.getElementById('hourly-container' + preActiveBox).classList.remove('expand-box');
         document.getElementById('hourly-bottom-row' + preActiveBox).classList.remove('show-hourly-other');
         document.getElementById('hourly-container' + i).classList.add('expand-box');
         document.getElementById('hourly-bottom-row' + i).classList.add('show-hourly-other');
      } else { // Must be the first box clicked. So, show the info.
         document.getElementById('hourly-container' + i).classList.add('expand-box');
         document.getElementById('hourly-bottom-row' + i).classList.add('show-hourly-other');
      }
      setPrevActiveBox(i);


   }

   // gets hourly temperature JSX and saves it in an array to map for later.
   useEffect(() => {
      if (props.weather) {
         const jsxArrayHolder = []; // holds the jsx that will be used in setJsxArray state.
         for (let i = hour; i <= (24 + hour); i++) { // loops from the starting hour (12:00AM) up to 24 hours + the current hour.
            const d = new Date(props.weather.hourly.time[i]); // the time of the iterated time. used for getting the hour.
            let currentHour = d.getHours();
            const today = d.getDate();
            // if the time in the iteration is greater then the time now or if a new day, push the jsx element. otherwise, do nothing.
            if (d.getTime() > date.getTime() || today !== date.getDay()) {
               const meridiem = currentHour > 11 ? ' PM' : ' AM';
               currentHour = (currentHour % 12);
               jsxArrayHolder.push(
                  <div
                     tabIndex={0}
                     key={i}
                     id={'hourly-container' + i}
                     className='hourly-containers'
                     onClick={() => handleHourlyClicked(i)}
                     onKeyDown={(e) => e.key === "Enter" ? handleHourlyClicked(i) : null}
                  >
                     <div className='hourly-top-row'>
                        <p tabIndex={0}>{currentHour ? currentHour + meridiem : 12 + meridiem}</p>
                        <div className='hourly-icons-container'>
                           <img className='hourly-icons' src={getHourlyIcon(i)} alt={`;${props.weather.hourly.icons[i][0]} weather icon`}></img>
                        </div>
                        <p tabIndex={0}>{getTemperature(props.weather.hourly.temperature_2m[i])} {props.tempScale ? '°F' : "°C"}</p>
                     </div>
                     <div id={'hourly-bottom-row' + i} className='hourly-bottom-row'>
                        <div tabIndex={0} className='hourly-description'>{props.weather.hourly.icons[i][0]}</div>
                        <div className='hourly-other-data'>
                           <div tabIndex={0}>🌧  {props.weather.hourly.precipitation[i]}mm</div>
                           <div tabIndex={0}>💨 {props.weather.hourly.windspeed_10m[i]} mph</div>
                           <div tabIndex={0}>☁  {props.weather.hourly.cloudcover[i]}%</div>
                        </div>
                     </div>
                  </div>);
            }
         }
         setJsxArray(jsxArrayHolder);
      }

   }, [props.tempScale, preActiveBox]);
   return (
      <div title="Weather App" className="weatherAppContainer">
         <button className='backButton' onClick={() => props.hideAllAppsHandler('no-open-apps')}>
            <img className='backButtonImage' alt=";back button" src={back_image} />
         </button>
         {/*---------------------------------current weather--------------------------------*/}
         {!props.weather ? 'weather unavailable' :
            <CurrentWeather
               weather={props.weather}
               handleTempScaleChange = {handleTempScaleChange}
               getTemperature={getTemperature}
               getApparentTemp = {getApparentTemp}
               hour={hour}
               getDewPoint={getDewPoint}
               tempScale={props.tempScale}
               setTempScale={props.setTempScale}
             />
         }

         {/*---------------------------------weather by day--------------------------------*/}
         <WeatherByDay
            weather={props.weather}
            noWeatherData={noWeatherData}
            getTemperature={getTemperature}
         />
         {/*---------------------------------weather by hour--------------------------------*/}
         <div id="weather-by-hour-container">
            <h5 tabIndex={0} id="hourly-title">HOURLY FORECAST</h5>
            {!props.weather ? null : jsxArray}
         </div>
      </div>
   )
}

export default Weather;