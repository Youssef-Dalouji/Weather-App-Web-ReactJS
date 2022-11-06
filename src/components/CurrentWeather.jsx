import React, { useEffect, useState } from "react";
import '../scss/CurrentWeather.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/HomePage.css'
let CurrentWeather=(props) => {
    let [datacurrent,setDatacurrent]=useState(props.datacurrent)
    let [isloadingcurrentweather,setIsloadingcurrentweather]=useState(false)
    useEffect(()=>{
      setDatacurrent(()=>{
        return {...props.datacurrent}
      })
      setIsloadingcurrentweather(()=>{
        return true
      })
    },[props.datacurrent])
    let datanow=new Date()
    let nameday=""
    let namemonth=""
    switch (datanow.getDay()) {
        case 0:
          nameday="Sunday";
          break;
        case 1:
          nameday="Monday";
          break;
        case 2:
          nameday="Tuesday";
          break;
        case 3:
          nameday="Wednesday";
          break;
        case 4:
          nameday="Thursday";
          break;
        case 5:
          nameday="Friday";
          break;
        case 6:
          nameday="Saturday";
          break;
      }
      switch(datanow.getMonth()){
        case 1: namemonth = "Jan";
            break;
        case 2: namemonth = "Feb";
            break;
        case 3: namemonth = "Mar";
            break;
        case 4: namemonth = "Apr";
            break;
        case 5: namemonth = "May";
            break;
        case 6: namemonth = "Jun"; 
            break;
        case 7: namemonth = "Jul";
            break;
        case 8: namemonth = "Aug";
            break;
        case 9: namemonth = "Sep";
            break;
        case 10: namemonth = "Oct";
            break;
        case 11: namemonth = "Nov";
            break;
        case 12: namemonth = "Dec";
            break;
        }
      let datacompleted=`${datanow.getHours()>=0 && datanow.getHours()<=9?"0"+datanow.getHours():datanow.getHours()}:${datanow.getMinutes()>=0 && datanow.getMinutes()<=9?"0"+datanow.getMinutes():datanow.getMinutes()} - ${nameday}, ${datanow.getDate()>=0 && datanow.getDate()<=9 ?"0"+datanow.getDate():datanow.getDate()} ${namemonth} ${String(datanow.getFullYear()).substring(2,4)}`
    if(isloadingcurrentweather){
      return <>
        <div className="CurrentWeather">
            <h1 className="degree">{Math.round(parseFloat(datacurrent.main.temp))}°</h1>
            <div className="infoplus">
                <h1>{datacurrent.name}</h1>
                <h5>{datacompleted}</h5>
            </div>
            <div className="logoWeather-statu">
                <img src={require(`../img/weatherIcons/${datacurrent.weather[0].icon}.svg`)} alt="logo" />
                <h5>{datacurrent.weather[0].description}</h5>
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
export default CurrentWeather
