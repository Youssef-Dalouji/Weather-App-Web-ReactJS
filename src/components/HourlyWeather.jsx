import React, { useState } from "react";
import "../scss/HourlyWeather.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
let HourlyWeather=(props) => {
    return<>
        <div className="HourlyWeather">
            <img src={require(`../img/weatherIcons/${props.img}.svg`)} alt="icon-weather" />
            <h2 className="lifedegree">{Math.round(parseFloat(props.degree-273.15))}°</h2>
            <h3 className="lifestate">{props.statu}</h3>
            <h4 className="humdity"><FontAwesomeIcon icon={faDroplet} /> {props.humidity}%</h4>
            <h4 className="wid"><FontAwesomeIcon icon={faWind} /> {Math.round(parseFloat(props.wind)*3.6)} km/h</h4>
            <h3 className="lifetime">{props.timeHour}</h3>
        </div>
    </>
}
export default HourlyWeather
