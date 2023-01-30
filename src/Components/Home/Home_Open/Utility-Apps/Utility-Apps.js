import noWeatherData from '../../../../assets/weather-icons/noWeather.svg'
import '../Utility-Apps/utility-apps.css'
const Utility_Apps = (props) => {
   // gets the current temperature and returns it. 
   const getTemperature = () => {
      if (!props.tempScale) return Math.trunc(props.weather.current_weather.temperature);
      return (Math.trunc(props.weather.current_weather.temperature * 9 / 5) + 32).toString();
   }
   const tempChangeHandler = () => {
      props.tempScale ? props.setTempScale(0) : props.setTempScale(1);
   }
   return (
      <div className="personal-sec">
         <button id="weatherApp"
            className="app-buttons"
            onClick={() => props.hideAllAppsHandler('weather')}// hide all apps and open 'weather'component.
         >
            <span className='weatherTopText'>
               <h3>{!props.weather ? "Weather Data Unavailable" : getTemperature()}</h3>
               {!props.weather ? null : <p>{props.tempScale ? '°F' : "°C"}</p>}
            </span>
            <img className="weather_icons" src={!props.weather ? noWeatherData : props.weather.icon}></img>
            <h5 id="weatherAppBtnBottomTxt">{!props.weather ? "" : props.weather.description}</h5>
         </button>
         <div className="app-buttons"
            onClick={() => props.hideAllAppsHandler('contacts')}>
            <h4>Contacts</h4>
         </div>
         <div className="app-buttons"><h4>Clock</h4></div>
         <div className="app-buttons"><h4>Calender</h4></div>
         <div className="app-buttons"><h4>Reminder</h4></div>
         <div className="app-buttons"><h4>Notes</h4></div>
      </div>
   )
}

export default Utility_Apps;