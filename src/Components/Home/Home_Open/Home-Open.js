import { useState } from "react";
import '../Home_Open/home_open.css';
import Utility_Apps from "../Home_Open/Utility-Apps/Utility-Apps";
import Weather from '../Home_Open/Weather/Weather';
import Contacts from '../Home_Open/Contacts/Contacts';

const Home_Open = (props) => {
   const [showApps, setShowApps] = useState(true);
   const [currentOpenApp, setCurrentOpenApp] = useState('no-open-apps');
   // hide the current open app.
   // if showApps is true, set to false. then setCurrentOpenApp to the next app to be opened. used in appPointers.
   const hideAllAppsHandler = (appToOpen) => {
      if(showApps) {
         setShowApps(false);
         setCurrentOpenApp(appToOpen);
      }
      else {
         setShowApps(true);
         setCurrentOpenApp('no-open-apps');
      }
   }
   // choose which component to be displayed based on the currentOpenApp state.
   // 
   const appPointers = {
      "no-open-apps": null,
      'weather': <Weather hideAllAppsHandler = {hideAllAppsHandler}
                           weather = {props.weather}
                           tempScale={props.tempScale}
                           setTempScale={props.setTempScale}/>,
      'contacts' : <Contacts hideAllAppsHandler = {hideAllAppsHandler}
                              isScrolled = {props.isScrolled}
                              setIsScrolled = {props.setIsScrolled}/>
   }

   return (
      <div id="home-open-container">
         {appPointers[currentOpenApp]} {/*The component to be opened. default is null*/}
         {currentOpenApp !== 'no-open-apps' ? null :
            <div id="allApps">
               <Utility_Apps 
                  tempScale = {props.tempScale} 
                  setTempScale = {props.setTempScale} 
                  weather = {props.weather}
                  hideAllAppsHandler = {hideAllAppsHandler}/>
            </div>
         }  
      </div>
   )
}
export default Home_Open;


