import React, {useState, useEffect} from 'react'
import {list} from './textList'
import VolumeChart from './VolumeChart'
import './TextTypingGame.css'

function TextTypingGame() {
  const [inputText, setInputText] = useState('')
  const [randomText, setRandomText] = useState('')
  const [warningText, setWarningText] = useState('')
  const [volume, setVolume] = useState(50)
  const [add, setAdd] = useState(false)
  const [subtract, setSubtract] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    checkSubmit(inputText.toLowerCase())
  }
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(()=> {
    setRandomText(getRandomText())
  },[])

  

  const getRandomText = () => {
    const num = getRandom(0, list.length)
    return list[num].toLowerCase()
  }

  const checkSubmit = (value) => {
    if(randomText === value){
      addVolume()
    } else {
      subtractVolume()
    }
  }

  const addVolume = () => {
    setWarningText('youre right')
    setInputText('')
    setRandomText(getRandomText())
    setAdd(true)
    // if(volume < 100){
    //   setVolume(volume + 10)
    // }
  }

  const subtractVolume = () => {
    setWarningText('youre wrong')
    setInputText('')
    setSubtract(true)
    // if(volume > 0){
    //   setVolume(volume - 10)
    // }
  }
  //tomer countdown bug, double time shown
  useEffect(()=> {
    if(volume > 0){
      const intervalId = setInterval(() => {
        if(add){
          setAdd(false)
          return setVolume(volume + 10)
        } else if(subtract) {
          setSubtract(false)
          return setVolume(volume - 10)
        }
        else{
          setVolume(volume -1)
        }
      }, 1000);
      return ()=> {
        clearInterval(intervalId)
      }
    } else if(volume > 100){
      return setVolume(100)
    } else {
      return setVolume(0)
    }
    
      // setInterval(() => countDown(volume), 1000);
      // clearInterval(countDown)
  },[volume])

  // const countDown = (val) => {
  //   console.log('tick')
  //   if(volume > 0){
  //     if(add){
  //       setAdd(false)
  //       return setVolume(val + 10)
  //     } else if(subtract) {
  //       setSubtract(false)
  //       clearInterval(val)
  //       return setVolume(val - 10)
  //     }
  //     else{
  //       clearInterval(val)
  //       return setVolume(val -1)
  //     }
  //   }
  // }

  
//   const countDown = () => {
//     if(volume > 0){
//       const intervalId = setInterval(() => {

//       if(add){
//         setAdd(false)
//         clearInterval(intervalId)
//         return setVolume(volume + 10)
//       } else if(subtract) {
//         setSubtract(false)
//         clearInterval(intervalId)
//         return setVolume(volume - 10)
//       }
//       else{
//         clearInterval(intervalId)
//         return setVolume(volume -1)
//       }
      
//     }, 1000);
//   }
  
// }
console.log(volume)
  return (
    <div className="typing-game">
      <h1>Text Typing Game</h1>
      <p>{randomText}</p>
      {warningText ? 
        <p className="typingGame__warning">{warningText}</p> : <div className="spacing"></div>
      }
      <form onSubmit={submitHandler}>
        <input type="text" value={inputText} onChange={e => {
          setInputText(e.target.value)
          setWarningText('')
          }}/>
        <input type="submit" />
      </form>
      <VolumeChart setVolume={setVolume} volume={volume} />
    </div>
  )
}

export default TextTypingGame
