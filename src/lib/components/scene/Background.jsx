import React from 'react';
import {
  Stars,
} from '@react-three/drei';




export function Background({
  radius = 100,
  depth = 100,
  count = 15000,
  factor = 5,
  saturation = 1,
  speed = 1,
  fade = true,
  ...props
}) {
  const ref = React.useRef()
  // useFrame(({ clock }) => {


  // })
  return (

    <group>
      {
        fade
        ?
        <Stars
          ref={ref}
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
