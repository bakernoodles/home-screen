const CurrentWeather = (props) => {
   return(
      <div id="currentWeatherPane">
               <h2 tabIndex={0} id='location'>{props.weather.timezone.split('/')[1].replaceAll('_', ' ')}</h2>
               <div id='currentWeatherTopRow'>
                  <img tabIndex={0} id='weather-icon' alt="weather icon" src={props.weather.icon} />
                  <h1
                     tabIndex={0}
                     onClick={() => props.handleTempScaleChange(props.tempScale)}
                     id='tempTxt'>
                     {props.getTemperature()}
                  </h1>
                  <h2 tabIndex={0} onClick={() => props.handleTempScaleChange(props.tempScale)} id="tempScale">{props.tempScale ? '°F' : "°C"}</h2>
               </div>
               <div id="description">
                  <p tabIndex={0} className="description-txt">{props.weather.description} </p>
               </div>
               <div id="currentWeatherBottomRow">
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>FEELS LIKE</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.getApparentTemp()}°</b></p>
                  </div>
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>CLOUDS</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.weather.hourly.cloudcover[props.hour]}%</b></p>
                  </div>
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>DEW POINT</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.getDewPoint()}°</b></p>
                  </div>
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>PRECIPITATION</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.weather.hourly.precipitation[props.hour]}mm</b></p>
                  </div>
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>HUMIDITY</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.weather.hourly.relativehumidity_2m[props.hour]}%</b></p>
                  </div>
                  <div className='currentHourWeatherDetails'>
                     <p tabIndex={0} className='currentWeatherBottomTxt'>WIND</p>
                     <p tabIndex={0} className='currentWeatherBottomTxt'><b>{props.weather.current_weather.windspeed}</b>mph</p>
                  </div>
               </div>
            </div>
   )
}

export default CurrentWeather;