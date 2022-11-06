import React, { useEffect, useState } from "react";
import '../scss/Body.css'
import CurrentWeather from "./CurrentWeather";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/HomePage.css'
let Body=(props) => {
    let [datacurrent,setDatacurrent]=useState(props.datacurrent)
    let [datahourly,setDatahourly]=useState(props.datahourly)
    let [isloadingcurrentweather,setIsloadingcurrentweather]=useState(false)
    let [isloadinghourlyweather,setIsloadinghourlyweather]=useState(false)
    useEffect(()=>{
      setDatacurrent(()=>{
        return {...props.datacurrent}
      })
      setIsloadingcurrentweather(()=>{
        return true
      })
    },[props.datacurrent])
    useEffect(()=>{
      setDatahourly(()=>{
        return {...props.datahourly}
      })
      setIsloadinghourlyweather(()=>{
        return true
      })
    },[props.datahourly])
    //----------------------------Hourly Weather
    let dataiterablefilter=[...datahourly.list]
    let datenow=new Date()
    let datacompleted=`${datenow.getFullYear()}-${datenow.getMonth()+1>=0 && datenow.getMonth()+1<=9 ?"0"+datenow.getMonth()+1:datenow.getMonth()+1}-${datenow.getDate()>=0 && datenow.getDate()<=9 ?"0"+datenow.getDate():datenow.getDate()} ${datenow.getHours()>=0 && datenow.getHours()<=9?"0"+datenow.getHours():datenow.getHours()}:00:00`
    dataiterablefilter=dataiterablefilter.filter((item,indx) => {
        if(item.dt_txt>=datacompleted && indx<=5){
            return true
        }
        return false
    }
    )
    //-----------------------------
    //-----------------------------Daily Weather
    let dateNOW=new Date()
    let diffdatepossible=[]
    for (let i = 1; i <= 6; i++) {
        diffdatepossible.push(`${dateNOW.getFullYear()}-${dateNOW.getMonth()+1>=0 && dateNOW.getMonth()+1<=9 ?"0"+dateNOW.getMonth()+1:dateNOW.getMonth()+1}-${dateNOW.getDate()>=0 && dateNOW.getDate()<=9 ?"0"+dateNOW.getDate():dateNOW.getDate()} 00:00:00`,`${dateNOW.getFullYear()}-${dateNOW.getMonth()+1>=0 && dateNOW.getMonth()+1<=9 ?"0"+dateNOW.getMonth()+1:dateNOW.getMonth()+1}-${dateNOW.getDate()>=0 && dateNOW.getDate()<=9 ?"0"+dateNOW.getDate():dateNOW.getDate()} 21:00:00`)
        dateNOW.setDate(dateNOW.getDate()+1)
    }
    let dataiterablefilterdaily=[...datahourly.list];let dataRegroupFor=[];
    for (let j = 0; j <=10; j+=2) {
        let datamax=[]
        let datamin=[]
        let datastatuplus=[]
        let dataimg=[]
        dataiterablefilterdaily.map((item) => {
          if(item.dt_txt>=diffdatepossible[j] && item.dt_txt<=diffdatepossible[j+1]){
                datamax.push(item.main.temp_max)
                datamin.push(item.main.temp_min)
                dataimg.push(item.weather[0].icon)
                datastatuplus.push(item.weather[0].main)
          }
        })
        let nameday=""
        switch (new Date(diffdatepossible[j]).getDay()) {
            case 0:
              nameday="Sun";
              break;
            case 1:
              nameday="Mon";
              break;
            case 2:
              nameday="Tue";
              break;
            case 3:
              nameday="Wed";
              break;
            case 4:
              nameday="Thu";
              break;
            case 5:
              nameday="Fri";
              break;
            case 6:
              nameday="Sat";
              break;
          }
        let datefinal=`${nameday} ${new Date(diffdatepossible[j]).getDate()}`
        if(dataimg.length!==0){
            if(dataimg.length===1){
                dataRegroupFor.push({maxtemp:Math.round(parseFloat(Math.max(...datamax))-273.15),mintemp:Math.round(parseFloat(Math.min(...datamin))-273.15),img:dataimg[0],statu:datastatuplus[0],date:datefinal})
            }else{
                dataRegroupFor.push({maxtemp:Math.round(parseFloat(Math.max(...datamax))-273.15),mintemp:Math.round(parseFloat(Math.min(...datamin))-273.15),img:dataimg[1],statu:datastatuplus[1],date:datefinal})
            }
        }
    }
    //-----------------------------
  if(isloadingcurrentweather && isloadinghourlyweather){
    return<>
      <div className="Body">
          <header>
             <h1>.Weather</h1>
          </header>
          <div className="Current-Weather">
              <CurrentWeather datacurrent={datacurrent} />
          </div>
          <div className="HourlyWeathermain">
              <h1 className="titre">Hourly</h1>
              <div className="info-hourly">
                  {dataiterablefilter.map((item,indx)=><HourlyWeather key={indx} degree={item.main.temp} statu={item.weather[0].main} humidity={item.main.humidity} img={item.weather[0].icon} wind={item.wind.speed} timeHour={new Date(item.dt_txt).getHours()>=0 && new Date(item.dt_txt).getHours()<=9?"0"+new Date(item.dt_txt).getHours()+":00":new Date(item.dt_txt).getHours()+":00"} />)}
              </div>
          </div>
          <div className="DailyWeathermain">
              <h1 className="titre">Daily</h1>
              <div className="info-daily">
                    {dataRegroupFor.map((item,indx)=><DailyWeather key={indx} date={item.date} img={item.img} max={item.maxtemp} min={item.mintemp} statu={item.statu} />)}
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
export default Body