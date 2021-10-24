import React, {useState} from 'react'
import './styling/DotaLoadingScreen.css'
import DotaImg from "./styling/dota-loading-screen.jpg";
import DotaBar from "./styling/loading-bar.png";

function DotaLoadingScreen() {
  const [timeLapse, setTimeLapse] = useState(true)

  return (
    <div className="dota__loading">
      <img className="dotaLoading__img" src={DotaImg} alt="dota" />
      <div className="dotaLoading__bar">
        <img className="dotaLoadingBar__img" src={DotaBar} alt="loading-bar" />
        <div className="dotaLoadingBar__container">
          <span className={`dotaLoadingBar__progress ${timeLapse && 'timelapse'}`}></span>
          <p className="dotaLoadingBar__text" >Loading</p>
        </div>
      </div>
    </div>
  )
}

export default DotaLoadingScreen
