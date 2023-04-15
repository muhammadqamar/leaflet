import React, { useEffect, useRef, useState } from 'react'

// LEAFLET
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// MARKER
import MovingMarker from './MovingMarker'

const dataCoordinate = [
  [-8.796011, 115.218816],
  [-8.793359, 115.215509],
  [-8.790276, 115.212202],
  [-8.788487, 115.209082],
  [-8.786699, 115.205089],
  [-8.785527, 115.201782],
  [-8.785034, 115.197289],
  [-8.784972, 115.194169],
  [-8.784540, 115.191424],
  [-8.783969, 115.187870],
  [-8.783528, 115.186170],
  [-8.783032, 115.183856],
  [-8.782508, 115.181291],
  [-8.781296, 115.178614],
  [-8.779560, 115.177694]
]

let setPositionInterval

function App() {
  // STATE & REFS
  const [nextPosition, setNextPosition] = useState([-8.798064, 115.222211])
  const currentIndexRef = useRef(0)

  // SETTING
  const duration = 5 * 1000 // 1000 ms = 1 sec

  // SIDE EFFECT INTERVAL
  useEffect(() => {
    setPositionInterval = setInterval(() => {
      currentIndexRef.current < dataCoordinate.length && setNextPosition(dataCoordinate[currentIndexRef.current])
      currentIndexRef.current = currentIndexRef.current + 1
    }, duration)

    return () => clearInterval(setPositionInterval)
  }, [])

  return (
    <MapContainer
      center={[-8.798064, 115.222211]}
      zoom={17}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MovingMarker
        nextPosition={nextPosition}
        duration={duration}
      />
    </MapContainer>
  )
}

export default App
