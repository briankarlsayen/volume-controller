import React from 'react'

function VolumeChart({volume, setVolume}) {
  return (
    <div>
      <p className="typingGame__volume">volume: {volume}%</p>
    </div>
  )
}

export default VolumeChart
