import { useState, useEffect } from "react";
const reg = /\d+:\d+/g; // Regex to get a simplified time string.
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// A clock component which returns either the time and date, or just the time as regular txt. 
// set props.outputType as a true or false value to return different JSX
// ex.        <Clock outputType={1}/> or <Clock outputType={false}/>
const Clock = (props) => {
   const [time, setTime] = useState(new Date().toLocaleTimeString());
   const [shortend, setShortend] = useState(true);     // toggle to display time with/without seconds. 
   const shortenedTime = time.match(reg);
   let date = new Date();
   useEffect( () => {
     let timer =  setTimeout( () => {
         date = new Date().toLocaleTimeString()
         setTime(date);
         
      }, 1000);
      return () => clearTimeout(timer);
   },[time])
   // if the output type is 0, return the time and date as JSX
   if(!props.outputType) return (
      <div className='dateAndTime' onClick = {() => setShortend(!shortend)}>
         <h1>{shortend ? shortenedTime : time}</h1>
         <h5>{weekday[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}</h5>
      </div>
   )
   // if the output type is 1, return the shortend time only
   if(props.outputType) return (
      <p>{shortenedTime}</p>
   )
}
export default Clock;