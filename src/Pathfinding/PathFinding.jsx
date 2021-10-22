import React, {useState, useEffect} from 'react'
import Node from './Node/Node'
import './Pathfinding.css'

function PathFinding() {
  const [nodes, setNodes] = useState()

  useEffect(()=> {
    const nodeArr = []
    for(let row = 0; row < 20; row++){
      const currentRow = [];
      for(let col = 0; col < 50; col++){
        const currentNode = {
          col, row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45
        }
        currentRow.push([currentNode])
      }
      nodeArr.push(currentRow)
    }
    setNodes(nodeArr)
  },[])

  return (
    <div className="grid">

        {nodes?.map((row, rowIndex)=> {
          return <div key={rowIndex} >
            {row.map((node, nodeIndex)=> {
            const start = node[0].isStart
            const finish = node[0].isFinish
            return (
              <Node key={nodeIndex}
              isStart={start}
              isFinish={finish}
              node={node}
              ></Node>
            )
            })}
            </div>
        })}
      
    </div>
  )
}

export default PathFinding
