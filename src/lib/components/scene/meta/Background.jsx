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
  backgroundRef=null,
  ...props
}) {
  const groupRef = React.useRef()
  return (

    <group ref={groupRef} name="background-group">
      {
        fade
        ?
        <Stars
          ref={backgroundRef}
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
          ref={backgroundRef}
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
