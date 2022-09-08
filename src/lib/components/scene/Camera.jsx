import React from 'react';

import {
  useThree,
  useFrame
} from '@react-three/fiber';


export function Camera({ fov = 75, position = [10,15,10], ...props}) {
  const ref = React.useRef()
  const { camera, gl: { domElement } } = useThree();
  useFrame(({ clock }) => {
    camera.fov = fov
  })

  return (
    <group>
      <cameraHelper ref={ref} args={[camera, domElement]}/>
    </group>

  )
}