import React, {useState} from 'react'
import './Node.css'
function Node({isStart, isFinish, node}) {
  //console.log(node)
  // if(node[0].isStart === true) {

  //   console.log('got it')
  // }
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : '';
  
  return (
    <div className={`node ${extraClassName}`}>
      
      
    </div>
  )
}

export default Node

export const DEFAULT_NODE = {
  row: 0,
  col: 0
}