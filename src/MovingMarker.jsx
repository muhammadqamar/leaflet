/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

// LEAFLET
import L from 'leaflet'
import 'leaflet.motion/dist/leaflet.motion'
import { Marker, useMap } from 'react-leaflet'

const MovingMarker = ({ nextPosition, duration }) => {
  // CONTEXT
  const mapContext = useMap()

  // STATE
  const [prevPosition, setPrevPosition] = useState(nextPosition)
  const [isMoving, setIsMoving] = useState(false)

  // ICON
  const iconCar = L.icon({
    iconUrl: 'https://tryfrankly.co/Flat%20blue.svg',
    iconSize: L.point(100, 100)
  })

  // SIDE EFFECT LEAFLET MOTION
  useEffect(() => {
    if(
      prevPosition[0] !== nextPosition[0]
      && prevPosition[1] !== nextPosition[1]
    ) {
      setIsMoving(true)
      setPrevPosition(nextPosition)

      // CREATE ANIM MOVING
      L.motion.polyline([prevPosition, nextPosition], {
        color: 'red',
        weight: 6
      }, {
        auto: true,
        duration: duration,
        easing: L.Motion.Ease.linear
      }, {
        removeOnEnd: true,
        showMarker: true,
        icon: iconCar
      }).addTo(mapContext)

      // FOLLOW MARKER
      mapContext.setView(nextPosition, mapContext.getZoom())
    } else {
      setIsMoving(false)
    }

  }, [nextPosition])

  return (
    !isMoving && <Marker
      position={prevPosition}
      icon={iconCar}
    />
  )
}

export default MovingMarker