import React,{useRef, useEffect} from 'react'
import './ArrowGame.css'

function ArrowGame() {
  const textRef = useRef(null)
  const draw = (e) => {
    console.log('im down')
    //window.addEventListener("mousedown")
  }
  window.addEventListener('mousedown', draw)

  console.log(textRef)
  setTimeout(()=>{
    if(typeof textRef === null){
      textRef.current.innerHTML= "change"
    }
  }, 3000)

  

  return (
    <div className="arrow-game">
      <p ref={textRef}>Hallo</p>
    </div>
  )
}

export default ArrowGame
