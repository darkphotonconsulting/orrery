import React from 'react';
import {
  Stars,
} from '@react-three/drei';




export function Background({
  radius = 100,
  depth = 50,
  count = 15000,
  factor = 5,
  saturation = 1,
  speed = 1,
  fade = true,
  ...props
}) {
  const backgroundStars = React.useRef()
  // useFrame(({ clock }) => {


  // })
  return (

    <group>
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
