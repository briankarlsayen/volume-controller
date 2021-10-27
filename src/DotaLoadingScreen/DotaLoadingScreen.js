import React, {useState, useEffect} from 'react'
import './styling/DotaLoadingScreen.css'
import DotaImg from "./styling/dota-loading-screen.jpg";
import DotaTavern from "./styling/tavern.png";
import DotaBar from "./styling/loading-bar.png";

//todos
//use dragon font
//load tavern image after loading x
//chat functionality



function DotaLoadingScreen() {
  const [timeLapse, setTimeLapse] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [minutes, setMinutes] = useState(0)
  const [second, setSecond] = useState(0)
  const [getData, setGetData] = useState()

  
  //create clock: minutes, seconds
  useEffect(()=> {
    if(!isLoading){
      const intervalId = setInterval(() => {
        setSecond(second + 1)
        if(second >= 59){
          setSecond(0)
          setMinutes(minutes + 1)
        }
      }, 1000);
      return ()=> {
        clearInterval(intervalId)
      }
    }
  },[second, isLoading])


  useEffect(()=> {
    fetch('https://api.stratz.com/api/v1/Hero')
    .then((res) => {
      if(res.status !== 200) {
        console.log('err')
      }
      res.json().then((data) => {
        setGetData(data)
      })
    })
    .catch((err)=>{
      console.log(err)
    })

    }, [])
  
  const showLoading = () => {
    console.log(getData)
    return(
      <>
        <div className="dotaLoading__logoText">
          <h2 className="logoText__upper">Defense</h2>
          <h4 className="logoText__second">OF</h4>
          <h4 className="logoText__third">THE</h4>
          <h2 className="logoText__lower">Acients</h2>
          <h4 className="logoText__author">ICEFROG</h4>
          <h4 className="logoText__presents">presents</h4>
        </div>
        <button onClick={()=> setTimeLapse(!timeLapse)} className="dotaLoading__test">Test</button>
        <img className="dotaLoading__img" src={DotaImg} alt="dota" />
        <div className="dotaLoading__bar">
          <img className="dotaLoadingBar__img" src={DotaBar} alt="loading-bar" />
          <div className="dotaLoadingBar__container">
            <span  onAnimationEnd={() => setIsLoading(false)} className={`dotaLoadingBar__progress ${timeLapse && 'timelapse'}`}></span>
            <p className="dotaLoadingBar__text" >Loading</p>
          </div>
        </div>
      </>
    )
  }

  const showTavern = () => {
    
    return (
      <>
        <img className="dotaTavern__img" src={DotaTavern} alt="dota-tavern" />
        <div className="dotaTavern__timer">
          <p className="dotaTimer__minutes">{minutes}</p>
          <p className="dotaTimer__second">{second}</p>
        </div>
        <div className="dotaTavern__one">
          <img className="hero__one" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Admiralproudmoore.jpg" alt="Kunkka" />
          <img className="hero__two" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Beastmaster.jpg" alt="Beastmaster" />
          <img className="hero__three" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/CentaurWarchief.jpg" alt="Centaur Warchief" />
          <img className="hero__four" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Earthshaker.jpg" alt="Earthshaker" />
          <img className="hero__five" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Omniknight.jpg" alt="Omni Knight" />
          <img className="hero__six" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PandarenBrewmaster.jpg" alt="Pandaren Brewmaster" />
          <img className="hero__seven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/RogueKnight.jpg" alt="Sven" />
          <img className="hero__eight" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2018/04/mountaingiant.png" alt="Tiny" />
          <img className="hero__nine" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Taurenchieftain.jpg" alt="Tauren Chieftaint" />
          <img className="hero__ten" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TreantProtector.jpg" alt="Treant Protector" />
          <img className="hero__eleven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/wisp.jpg" alt="Wisp" />
          <img className="hero__twelve" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Alchemist.jpg" alt="Alchemist" />
        </div>
      </>
    )
  }

  return (
    <div className="dota__loading">
      {isLoading ? showLoading(): showTavern()}
    </div>
  )
}

export default DotaLoadingScreen
