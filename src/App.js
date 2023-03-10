import { useState, useEffect } from 'react';
import './App.css';
import Home_Locked from './Components/Home/Home_Locked/Home-Locked';
import Home_Open from './Components/Home/Home_Open/Home-Open';
import NavStats from "./Components/Home/navStats/NavStats";
import { useWeather } from './Components/Home/useWeather'
function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [weather, setWeather] = useWeather('');
  const [tempScale, setTempScale] = useWeather(1);
  const [isScrolled, setIsScrolled] = useState(0);
  return (
    <div className="App">
      <NavStats
        setIsLocked={setIsLocked}
        isLocked={isLocked}
        weather={weather}
        tempScale={tempScale}
        setTempScale={setTempScale}
        isScrolled={isScrolled}
        setIsScrolled={setIsScrolled} />
      {isLocked ?
        <Home_Locked
          setIsLocked={setIsLocked}
          isScrolled={isScrolled}
          setIsScrolled={setIsScrolled} /> :
        <>
          <span className='overlay'></span>
          <Home_Open
            setIsLocked={setIsLocked}
            weather={weather}
            setWeather={setWeather}
            tempScale={tempScale}
            setTempScale={setTempScale}
            isScrolled={isScrolled}
            setIsScrolled={setIsScrolled} 
          />
        </>
      }
    </div>
  );
}

export default App;



// Credit for the icons goes to "Boxicons.com"







