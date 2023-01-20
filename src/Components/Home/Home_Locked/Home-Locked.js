import { useEffect, useRef, useState } from 'react';
import Clock from '../../Clock'
import '../Home_Locked/home_locked.css'
import enterSound from '../../../assets/sounds/enterClick.mp3';
import exitSound from '../../../assets/sounds/home-exit-sound.mp3';


const Home_Locked = (props) => {
   const [sliderValue, setSliderValue] = useState(1); // values: 1-100
   //--------------------------------------- Sound
   
   const playSound = (id) => {
      const sound = document.getElementById(id);
      sound.currentTime = 0;
      sound.play();
   }
   //-------------------------------------- Mouse Events (input slider)
   // Update input slider value on new input.
   const handleSliderChange = (event) =>{
      setSliderValue(event.target.value);
   }
   // Change slider color green on mouse down, and grey on mouse up. 
   const handleMouseDown = () => {
      document.getElementById('open-slider').style.setProperty('--slider-color', '#78d47d');
      
   }
   const handleMouseUp = () => {
      document.getElementById('open-slider').style.setProperty('--slider-color', '#929292c2');
      if(sliderValue < 92) {
         setSliderValue(1);
      }
      else {
         setSliderValue(100);
         playSound("home-enter");
         setTimeout(() => {
            setSliderValue(1);
            props.setIsLocked(false);
         }, 250)
         
      }
   }
   //---------------------------------- JSX
   return (
      <div className='home-screen-box'>
         <Clock outputType = {0}/>
         <div className='sliderBox'>
            <audio id="home-enter" src={enterSound}/>
            <audio id="home-exit" src={exitSound}/>
            <input 
               type='range' 
               min='1' 
               max='100' 
               value={sliderValue.toString()}
               id='open-slider'
               onInput={handleSliderChange}
               onMouseUp={handleMouseUp}
               onMouseDown={ handleMouseDown}
               onTouchStart={handleMouseDown }
               onTouchEnd={handleMouseUp}>
            </input>
         </div>
      </div>
   )
}

export default Home_Locked;



