const WeatherByDay = (props) => {
   return (
      <div id="daily-weather-container">
         {!props.weather ? null : props.weather.daily.time.map((day, index) => {
            let date = new Date(props.weather.daily.time[index] + "T00:00:00");
            return (<div className="day-weather-box" key={index}>
               <div className="daily-first-row">
                  {!index ? <p tabIndex={0}>Today</p> : <p tabIndex={0}>{date.getMonth() + 1}/{date.getDate()}</p>}
               </div>
               <div className='daily-second-row'>
                  <img className="icons"
                     src={!props.weather ? props.noWeatherData : !index ?
                        props.weather.icon :
                        props.weather.daily.icons[index][1]}>
                  </img>
                  <div className='daily-temp-box'>
                     <div className='tempRow'>
                        <p
                           tabIndex={0}
                           className='temp-num'>{props.getTemperature(props.weather.daily.apparent_temperature_max[index])}°</p>
                     </div>
                     <div className='tempRow'>
                        <p
                           tabIndex={0}
                           className='temp-num'>{props.getTemperature(props.weather.daily.apparent_temperature_min[index])}°</p>
                     </div>
                  </div>
               </div>
               <div className="daily-third-row">
                  <p tabIndex={0}>{props.weather.daily.icons[index][0]}</p>
               </div>
            </div>
            )
         })}
      </div>
   )
}

export default WeatherByDay;