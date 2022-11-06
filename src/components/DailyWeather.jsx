import React from "react";
import '../scss/DailyWeather.css'
let DailyWeather=(props) => {
  return <>
    <div className="DailyWeather">
        <h2>{props.date}</h2>
        <img src={require(`../img/weatherIcons/${props.img}.svg`)} alt="Icon Weather" />
        <span><span className="maxe">{props.max}°</span><span className="mine">{props.min}°</span></span>
        <h3>{props.statu}</h3>
    </div>
  </>
}
export default DailyWeather