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
      skill: {
        first: filterSkills[0].skills[0],
        second: filterSkills[0].skills[1],
        third: filterSkills[0].skills[2],
        fourth: filterSkills[0].skills[3]
      }
    })
  }


  const heroDetails = () => {
    return(
      <div className="dota__details">
        <p>{defaultDetails.displayName}</p>
        <p className="dotaDetails__gold"><img className="gold__img" src={Gold} alt="gold" />250</p>
        <p>{defaultDetails.language.bio}</p>
        {/* <p>As The Admiral of the mighty Claddish Navy, Kunkka was charged with protecting the isles of his homeland when the demons of the Cataract made a concerted grab at the lands of men. After years of small sorties, and increasingly bold and devastating attacks, the demon fleet flung all its carnivorous ships at the Trembling Isle. Desperate, the Suicide-Mages of Cladd committed their ultimate rite, summoning a host of ancestral spirits to protect the fleet. Against the demons, this was just barely enough to turn the tide.</p> */}
        <div className="dotaDetails__attrib">
          <p><span style={{color: '#315dce'}}>Strength</span> - {defaultDetails.stat.strengthBase} + {defaultDetails.stat.strengthGain}</p>
          <p><span style={{color: 'red'}}>Agility</span> - {defaultDetails.stat.agilityBase} + {defaultDetails.stat.agilityGain}</p>
          <p><span style={{color: '#315dce'}}>Intelligence</span> - {defaultDetails.stat.intelligenceBase} + {defaultDetails.stat.intelligenceGain}</p>
        </div>
        <p className="dotaDetails__skills">Learns {defaultDetails.skill.first}, {defaultDetails.skill.second}, {defaultDetails.skill.third}, and <span style={{color: 'orange'}}>{defaultDetails.skill.fourth}.</span></p>
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

  const showTavern = () => {
    return (
      <>
        <img className="dotaTavern__img" src={DotaTavern} alt="dota-tavern" />
        <div className="dotaTavern__timer">
          <p className="dotaTimer__minutes">{minutes}</p>
          <p className="dotaTimer__second">{second}</p>
        </div>
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
        {isHeroDetail ? heroDetails() : null}
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
