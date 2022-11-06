import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import { faLandmark } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/HomePage.css'
import '../scss/SideBar.css'
let SideBar=(props) => {
  let [datacurrent,setDatacurrent]=useState(props.datacurrent)
  let [datacountry,setDatacountry]=useState(props.datacountry)
  let [isloadingcurrentweather,setIsloadingcurrentweather]=useState(false)
  let [isloadingcountry,setIsloadingcountry]=useState(false)
  useEffect(()=>{
    setDatacurrent(()=>{
      return {...props.datacurrent}
    })
    setIsloadingcurrentweather(()=>{
      return true
    })
  },[props.datacurrent])
  useEffect(()=>{
    setDatacountry(()=>{
      return {...props.datacountry}
    })
    setIsloadingcountry(()=>{
      return true
    })
  },[props.datacountry])
  if(isloadingcountry && isloadingcurrentweather){
    return <>
    <div className="SideBar">
        <div className="search">
            <input type="text" placeholder="Search Location" onChange={(e)=>props.HandlerInput(e)} />
            <button type="button" onClick={props.HandlerClick}><FontAwesomeIcon className="icon-search" icon={faMagnifyingGlassLocation} /></button>
        </div>
        <div className="detailscountry">
            <h1>Country Details</h1>
            <div className="countryname">
              <h3>Country</h3>
              <h2>{datacountry[0].name.common} <img src={datacountry[0].flags.png} alt="flag" /></h2>
            </div>
            <div className="capital">
              <h3>Capital</h3>
              <h2><FontAwesomeIcon icon={faLandmark} /> {datacountry[0].capital[0]}</h2>
            </div>
            <div className="location">
              <h3>Location</h3>
              <h2><FontAwesomeIcon icon={faMapPin} /> {datacurrent.name}</h2>
            </div>
            <div className="region">
              <h3>Region</h3>
              <h2><FontAwesomeIcon icon={faMapLocationDot} /> {datacountry[0].region}</h2>
            </div>
        </div>

        <div className="detailsweather">
            <h1>Weather Details</h1>
            <div className="feelslike">
              <h3>Feels Like</h3>
              <h2><FontAwesomeIcon icon={faTemperatureHalf} /> {Math.round(parseFloat(datacurrent.main.feels_like))}°C</h2>
            </div>
            <div className="maxtemp">
              <h3>Temp Max</h3>
              <h2><FontAwesomeIcon icon={faTemperatureArrowUp} /> {Math.round(parseFloat(datacurrent.main.temp_max))}°C</h2>
            </div>
            <div className="mintemp">
              <h3>Temp Min</h3>
              <h2><FontAwesomeIcon icon={faTemperatureArrowDown} /> {Math.round(parseFloat(datacurrent.main.temp_min))}°C</h2>
            </div>
            <div className="wind">
              <h3>Wind</h3>
              <h2><FontAwesomeIcon icon={faWind} /> {Math.round(parseFloat(datacurrent.wind.speed)*3.6)} km/h</h2>
            </div>
            <div className="visibility">
              <h3>Visibility</h3>
              <h2><FontAwesomeIcon icon={faEye} /> {Math.round(parseFloat(datacurrent.visibility)/1000)} km</h2>
            </div>
            <div className="pressure">
              <h3>Pressure</h3>
              <h2><FontAwesomeIcon icon={faGauge} /> {Math.round(parseFloat(datacurrent.main.pressure))} mb</h2>
            </div>
            <div className="humidity">
              <h3>Humidity</h3>
              <h2><FontAwesomeIcon icon={faDroplet} /> {Math.round(parseFloat(datacurrent.main.humidity))}%</h2>
            </div>
        </div>

    </div>
  </>
  }else{
    return<>
            <div className="HomePage">
            <div className="HomePageSpinners">
                <img src={require('../img/logo/sun.png')} alt="logo" />
                <div class="spinner-grow child1" role="status">
                    <span class="sr-only"></span>
                </div>
                <div class="spinner-grow child2" role="status">
                    <span class="sr-only"></span>
                </div>
                <div class="spinner-grow child3" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
            </div>
        </>
  }
}
export default SideBar
