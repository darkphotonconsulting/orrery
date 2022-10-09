import React from 'react';
import {
  Stars,
} from '@react-three/drei';




export function Background({
  radius = 1000,
  depth = 250000,
  count = 15000,
  factor = 1,
  saturation = 1,
  speed = 2,
  fade = true,
  controls = {},
  scaledGalaxy = {},
  ...props
}) {
  const groupRef = React.useRef()
  // const backgroundRef = React.useRef()
  const backgroundStars = React.useRef()
  // useFrame(({ clock }) => {


  // })
  return (

    <group ref={groupRef}>
      {
        fade
        ?
        <Stars
          ref={backgroundStars}
          radius={radius}
          depth={depth}
          count={count}
          factor={factor}
          saturation={saturation}
          fade
          speed={speed}
        />
        :
        <Stars
          ref={backgroundStars}
          radius={radius}
          depth={depth}
          count={count}
          factor={factor}
          saturation={saturation}
          speed={speed}
        />
      }
    </group>
  )
}
