import React, {useState, useEffect} from 'react'
import {list} from './textList'
import VolumeChart from './VolumeChart'
import './TextTypingGame.css'

function TextTypingGame() {
  const [inputText, setInputText] = useState('')
  const [randomText, setRandomText] = useState()
  const [warningText, setWarningText] = useState('')
  const [volume, setVolume] = useState(50)
  const [add, setAdd] = useState(false)
  const [subtract, setSubtract] = useState(false)
  const [correctNum, setCorrectNum] = useState(1)


  const submitHandler = (e) => {
    e.preventDefault()
    checkSubmit(inputText.toLowerCase())
  }
  

  useEffect(()=> {
    setRandomText(getRandomText())
  },[])

  
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getRandomText = () => {
    const newArr = []
    const newText =  list[getRandom(0, list.length)].toLowerCase()
    for(let i = 0; i < newText.length; i++){
      newArr.push({letter: newText.charAt(i), correct: false})
    }
    return newArr
  }


  //change this thing use what i used in search function inventory, useeffect on every type
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

  useEffect(()=> {
    {randomText &&
      checkInput()
    }
  },[inputText])

  const checkInput = () => {
    const newArr = [...randomText]
    for(let i= 0; i < correctNum; i++){
      console.log(correctNum)
      if(newArr[i].letter === inputText.slice(-1)){
        newArr[i].correct = true
        setCorrectNum(newArr.filter((data)=> data.correct).length + 1)
      } 
      if(newArr.length === correctNum){
        setRandomText(getRandomText())
        setCorrectNum(1)
      } 
    }
  }



  return (
    <div className="typing-game">
      <h1>Text Typing Game</h1>
      <div className="typing__text">
        {randomText && randomText.map((text)=>(
          <p className={`${text.correct && 'active'} typingGame__text`} text>{text.letter}</p>
        ))}
      </div>
      {warningText ? 
        <p className="typingGame__warning">{warningText}</p> : <div className="spacing"></div>
      }
      <form className="typingGame__form" onSubmit={submitHandler}>
        <div className="hide__input">
          <p></p>
        </div>
        <input className="typingGame__input" type="hidden" onBlur={({ target }) => target.focus()} autoFocus type="text" value={inputText} onChange={e => {
          setInputText(e.target.value)
          setWarningText('')
          }}/>
        <input className="typingGame__btn" type="submit" />
      </form>
      <VolumeChart setVolume={setVolume} volume={volume} />
    </div>
  )
}

export default TextTypingGame
