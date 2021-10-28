import React, {useState, useEffect} from 'react'
import './styling/DotaLoadingScreen.css'
import DotaImg from "./styling/dota-loading-screen.jpg";
import DotaTavern from "./styling/tavern.png";
import DotaBar from "./styling/loading-bar.png";
import Gold from './styling/gold.PNG'
import {hero} from './dotaHeroDetails'
//todos x
//use dragon font x
//load tavern image after loading x
//get dota datas x
//hover functionality x
// --- onHover get data from image x
//chat functionality


function DotaLoadingScreen() {
  const [timeLapse, setTimeLapse] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [minutes, setMinutes] = useState(0)
  const [second, setSecond] = useState(0)
  const [isHeroDetail, setIsHeroDetail] = useState(false)
  const [heroArray, setHeroArray] = useState([])
  const [isTavern, setIsTavern] = useState('')
  const [defaultDetails, setDefaultDetails] = useState({
    displayName: '',
    stat: {
      strengthBase: 0,
      strengthGain: 0,
      agilityBase: 0,
      agilityGain: 0,
      intelligenceBase: 0,
      intelligenceGain: 0,
      attackRange: 0,
      moveSpeed: 0
    },
    language: {
      bio: ''
    },
    skill: {
      first: '',
      second: '',
      third: '',
      fourth: ''
    }
  })
  
  console.log(isTavern)

  //create clock: minutes, seconds
  useEffect(()=> {
    if(!isLoading){
      const intervalId = setInterval(() => {
        setSecond(second + 1)
        if(second >= 59){
          setSecond(0)
          setMinutes(minutes => minutes + 1)
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
        console.log(data)
        setHeroArray(Object.entries(data));
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    }, [])

  const hoverHero = (heroName) => {
    setIsHeroDetail(true)
    const filterSkills = hero.filter((heroSkills)=> heroSkills.name.toLowerCase().includes(heroName.toLowerCase()))
    const filtered = heroArray.filter((data) => data[1].shortName.toLowerCase().includes(heroName.toLowerCase()))
    const newFiltered = filtered[0][1]
    const reFilter = newFiltered.language.hype.replace(/[<b>/]/g, "")
    setDefaultDetails({
      displayName: newFiltered.displayName,
      stat: {
        agilityGain: newFiltered.stat.agilityGain,
        agilityBase: newFiltered.stat.agilityBase,
        strengthBase: newFiltered.stat.strengthBase,
        strengthGain: newFiltered.stat.strengthGain,
        intelligenceBase: newFiltered.stat.intelligenceBase,
        intelligenceGain: newFiltered.stat.intelligenceGain,
        moveSpeed: newFiltered.stat.moveSpeed,
        attackRange: newFiltered.stat.attackRange,
      },
      language: {
        bio: reFilter
      },
      // skill: {
      //   first: filterSkills[0].skills[0],
      //   second: filterSkills[0].skills[1],
      //   third: filterSkills[0].skills[2],
      //   fourth: filterSkills[0].skills[3]
      // }
    })
  }

  const tavernContainer = () => {
    return(
      <div className="tavern__container">
        <div onClick={()=>setIsTavern('one')} className={`tavern__one + ${isTavern === 'one' ? 'tavern__active' : null}`}></div>
        <div onClick={()=>setIsTavern('two')} className={`tavern__two + ${isTavern === 'two' ? 'tavern__active' : null}`}></div>
        <div onClick={()=>setIsTavern('three')} className={`tavern__three + ${isTavern === 'three' ? 'tavern__active' : null}`}></div>
      </div>
    )
  }


  const heroDetails = () => {
    return(
      <div className="dota__details">
        <p>{defaultDetails.displayName}</p>
        <p className="dotaDetails__gold"><img className="gold__img" src={Gold} alt="gold" />250</p>
        <p>{defaultDetails.language.bio}</p>
        <div className="dotaDetails__attrib">
          <p><span style={{color: '#315dce'}}>Strength</span> - {defaultDetails.stat.strengthBase} + {defaultDetails.stat.strengthGain}</p>
          <p><span style={{color: 'red'}}>Agility</span> - {defaultDetails.stat.agilityBase} + {defaultDetails.stat.agilityGain}</p>
          <p><span style={{color: '#315dce'}}>Intelligence</span> - {defaultDetails.stat.intelligenceBase} + {defaultDetails.stat.intelligenceGain}</p>
        </div>
        {/* <p className="dotaDetails__skills">Learns {defaultDetails.skill.first}, {defaultDetails.skill.second}, {defaultDetails.skill.third}, and <span style={{color: 'orange'}}>{defaultDetails.skill.fourth}.</span></p> */}
        <p>Attack range of {defaultDetails.stat.attackRange}.</p>
        <p>Movement speed of {defaultDetails.stat.moveSpeed}.</p>
      </div>
    )
  }
  
  const showLoading = () => {
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

  const checkTavern = (tavern) => {
    if(tavern === 'one'){
      return(
        <div className="dotaTavern__one">
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__one" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Admiralproudmoore.jpg" alt="kunkka" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)}  className="hero__two" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Beastmaster.jpg" alt="Beastmaster" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__three" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/CentaurWarchief.jpg" alt="centaur" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__four" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Earthshaker.jpg" alt="earthshaker" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__five" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Omniknight.jpg" alt="omniknight" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__six" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PandarenBrewmaster.jpg" alt="brewmaster" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__seven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/RogueKnight.jpg" alt="sven" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eight" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2018/04/mountaingiant.png" alt="tiny" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__nine" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Taurenchieftain.jpg" alt="elder_titan" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__ten" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TreantProtector.jpg" alt="treant" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eleven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/wisp.jpg" alt="wisp" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__twelve" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Alchemist.jpg" alt="alchemist" />
        </div>
      )
    } else if (tavern === 'two'){
      return(
        <div className="dotaTavern__one">
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__one" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/AntiMage.jpg" alt="antimage" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)}  className="hero__two" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DwarvenSniper.jpg" alt="sniper" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__three" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Juggernaut.jpg" alt="juggernaut" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__four" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LoneDruid.jpg" alt="lone_druid" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__five" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Moonrider.jpg" alt="luna" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__six" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Morphling.jpg" alt="morphling" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__seven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/NagaSiren.jpg" alt="naga_siren" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eight" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PhantomLancer.jpg" alt="phantom_lancer" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__nine" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PriestessOfTheMoon.jpg" alt="mirana" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__ten" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/StealthAssassin.jpg" alt="riki" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eleven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TrollWarlord.jpg" alt="troll_warlord" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__twelve" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Gyrocopter.jpg" alt="gyrocopter" />
        </div>
      )
    } else if (tavern === 'three'){
      return(
        <div className="dotaTavern__one">
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__one" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/CrystalMaiden.jpg" alt="crystal_maiden" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)}  className="hero__two" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Enchantress.jpg" alt="enchantress" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__three" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/FaerieDragon.jpg" alt="puck" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__four" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/HolyKnight.jpg" alt="chen" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__five" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Keeperofthelight.jpg" alt="keeper_of_the_light" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__six" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LordofOlympia.jpg" alt="zuus" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__seven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Prophet.jpg" alt="furion" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eight" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Silencer.jpg" alt="silencer" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__nine" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Slayer.jpg" alt="lina" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__ten" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/StormSpirit.jpg" alt="storm_spirit" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__eleven" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Windrunner.jpg" alt="windrunner" />
          <img onMouseEnter={(e)=>hoverHero(e.target.alt)} onMouseLeave={()=> setIsHeroDetail(false)} className="hero__twelve" src="https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Thrall.jpg" alt="disruptor" />
        </div>
      )
    }
  }

  const showTavern = () => {
    return (
      <>
        <img onClick={()=> setIsTavern('')} className="dotaTavern__img" src={DotaTavern} alt="dota-tavern" />
        <div className="dotaTavern__timer">
          <p className="dotaTimer__minutes">{minutes}</p>
          <p className="dotaTimer__second">{second}</p>
        </div>
        {checkTavern(isTavern)}
        {isHeroDetail ? heroDetails() : null}
        {tavernContainer()}
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
