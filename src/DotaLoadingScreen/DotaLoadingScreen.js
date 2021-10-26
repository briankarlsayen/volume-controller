import React, {useState} from 'react'
import './styling/DotaLoadingScreen.css'
import DotaImg from "./styling/dota-loading-screen.jpg";
import DotaBar from "./styling/loading-bar.png";

//todos
//use dragon font
//load tavern image after loading
//chat functionality



function DotaLoadingScreen() {
  const [timeLapse, setTimeLapse] = useState(true)
  const [count, setCount] = useState(0)

    const textStyle = {
      fontSize: `${count}px`,
      color: 'red'
    }
  

  return (
    <div className="dota__loading">
      <p style={textStyle}>I'm a Text</p>
      <button onClick={()=>setCount(count+1)}>Make it bigger</button>
      <div className="dotaLoading__logoText">
        <h2 className="logoText__upper">Defense</h2>
        <h4 className="logoText__second">OF</h4>
        <h4 className="logoText__third">THE</h4>
        <h2 className="logoText__lower">Acients</h2>  
      </div>
      <button onClick={()=> setTimeLapse(!timeLapse)} className="dotaLoading__test">Test</button>
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
