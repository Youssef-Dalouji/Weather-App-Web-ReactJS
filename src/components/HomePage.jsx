import React, { useEffect, useState } from "react";
import Body from "./Body";
import SideBar from "./SideBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/HomePage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
let HomePage=() => {
    let [location,setLocation]=useState("")
    let [locationexect,setLocationexect]=useState("rabat")
    let [datacurrent,setDatacurrent]=useState({})
    let [datacountry,setDatacountry]=useState([])
    let [isloadingcurrentweather,setIsloadingcurrentweather]=useState(false)
    let [isloadingcountry,setIsloadingcountry]=useState(false)
    let [errorverfication,setErrorverfication]=useState(false)
    let [isloadinghourlyweather,setIsloadinghourlyweather]=useState(false)
    let [codecountry,setCodecountry]=useState("MA")
    let [coordonnee,setCoordonnee]=useState({ "lon": -6.8401, "lat": 33.9911 })
    let [datahourly,setDatahourly]=useState({})
    let HandlerInput=(e) => {
        setLocation(() => {
            return e.target.value
        })
    }
    let HandlerClick=() => {
        if(location===undefined || location===""){
            toast.warning("Please enter the location")
        }else if(!(/^[A-Z\s]+$/i.test(location))){
            toast.warning("The name of the location must be devoid of numbers and symbols")
        }else if(location.includes("script")){
            toast.info("professional hacker 🌞")
        }else{
            setLocationexect((prevstate)=>{
                if(prevstate!==location){
                    return location.toLocaleLowerCase()
                }else{
                    setErrorverfication(()=>{
                        return true
                    })
                }
            })
            setIsloadingcurrentweather(()=>{
                return false
            })
            setIsloadingcountry(()=>{
                return false
            })
            setIsloadinghourlyweather(()=>{
                return false
            })
        }
    }
    useEffect(() => {
      let getData=async()=>{
        let res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationexect}&units=metric&APPID=e07f9579d98d95fbcfffcb5689b399a2`)
        if(res.status>=200 && res.status<300){
            return res.data
        }
        throw new Error('Something went wrong');
      }
      getData().then((res)=>{
        setDatacurrent(()=>{
            return {...res}
        })
        setCodecountry(()=>{
            return res.sys.country
        })
        setCoordonnee(()=>{
            return { "lon":res.coord.lon, "lat":res.coord.lat}
        })
        setIsloadingcurrentweather(()=>{
            return true
        })
      }).catch((e)=>{
        console.log(e)
        setIsloadingcurrentweather(()=>{
            return true
        })
        setIsloadingcountry(()=>{
            return true
        })
        setIsloadinghourlyweather(()=>{
            return true
        })
        if(!errorverfication){
            toast.error("Location Name Error or Non-Existent")
        }else{
            setErrorverfication(()=>{
                return false
            })
        }
      })
    },[locationexect])
    useEffect(()=>{
        if(isloadingcurrentweather){
            let getData=async()=>{
                let res=await axios.get(`https://restcountries.com/v3.1/alpha/${codecountry}`)
                if(res.status>=200 && res.status<300){
                    return res.data
                }
                throw new Error('Something went wrong');
            }
            getData().then((res)=>{
                setDatacountry(()=>{
                    return [...res]
                })
                setIsloadingcountry(()=>{
                    return true
                })
            }).catch((e)=>{
                console.log(e)
            })
        }
    },[datacurrent])
    useEffect(()=>{
        let getData_i=async() => {
            let res=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordonnee.lat}&lon=${coordonnee.lon}&appid=e07f9579d98d95fbcfffcb5689b399a2`)
            if(res.status>=200 && res.status<300){
                return res.data
            }
            throw new Error('Something went wrong');
        }
        getData_i().then((res)=>{
            setDatahourly(()=>{
                return {...res}
            })
            setIsloadinghourlyweather(()=>{
                return true
            })
        }).catch((e)=>{
            console.log(e)
        })
    },[coordonnee])
    if(isloadingcountry && isloadingcurrentweather && isloadinghourlyweather){
        return<>
        <div className="HomePage">
            <SideBar HandlerInput={HandlerInput} HandlerClick={HandlerClick} datacurrent={datacurrent} datacountry={datacountry} />
            <Body datahourly={datahourly} datacurrent={datacurrent} />
            <img className="img-background" src={require(`../img/Image Cases/${datacurrent.weather[0].icon}.jpg`)} alt="Back-ground" />
            <div className="color-background"></div>
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                <ToastContainer />
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
export default HomePage