import lockImage from '../../../assets/lock.png';
import unlockedImage from '../../../assets/unlocked.png';
import service_bars from '../../../assets/bars.png'
import '../navStats/navStats.css';
import lockSound from '../../../assets/sounds/lock-sound.mp3';
import wifiImage from '../../../assets/wifi.png';
import celsius from '../../../assets/weather-icons/celsius.svg';
import farenheit from '../../../assets/weather-icons/farenheit.svg';
import Clock from '../../Clock'
import { useEffect, useRef } from 'react';
const NavStats = (props) => {
   const getTemperature = () => {
      if (props.weather) {
         if (!props.tempScale) return Math.trunc(props.weather.current_weather.temperature);
         return (Math.trunc(props.weather.current_weather.temperature * 9 / 5) + 32)
      }

   }
   const handleTempScaleChange = (scale) => {
      if (scale == 0) props.setTempScale(1);
      else props.setTempScale(0);
   }
   const lockScreen = () => {
      const lockSound = document.getElementById('home-lock-sound');
      props.setIsLocked(true);
      if (!props.isLocked) {
         lockSound.currentTime = 0;
         lockSound.play();
      }
   }
 
   useEffect(() => {
      function checkDistance(e){
         const position = window.scrollY;
         
         if(position > 0){
            if(!document.getElementById('statusPane').classList.contains('solidColorAnimation')){
               document.getElementById('statusPane').classList.add('solidColorAnimation');
               props.setIsScrolled(true);
            }
         } else {
            if(document.getElementById('statusPane').classList.contains('solidColorAnimation')){
               document.getElementById('statusPane').classList.remove('solidColorAnimation');
               props.setIsScrolled(false);
            }
         }
      }
      window.addEventListener('scroll', checkDistance);
      return () => window.removeEventListener('scroll', checkDistance);
   },[])
   return (
      <div id='statusPane'>
         <div id="leftStatus">
            <audio id='home-lock-sound' src={lockSound}></audio>
            <img
               id="lock-button"
               className="statusIcons"
               src={props.isLocked ? lockImage : unlockedImage}
               alt="lock button"
               onClick={lockScreen}
            />
            {!props.isLocked ? <Clock outputType={1}></Clock> : null}
         </div>
         <div id="rightStatus">
            <img
               id="tempSymbol"
               className='statusIcons'
               src={props.tempScale ? farenheit : celsius}
               style={props.isLocked ? { display: "none" } : null}
               onClick={() => { handleTempScaleChange(props.tempScale) }}>
            </img>
            <img id="service_bars" alr="service bars" className="statusIcons" src={service_bars} />
            <img id="wifiIcon" alr="Wifi Icon" className="statusIcons" src={wifiImage} />
         </div>
      </div>
   );
}
export default NavStats;
