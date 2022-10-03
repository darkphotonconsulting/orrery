import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
// import { extend, useThree, useFrame } from '@react-three/fiber';
import {
  useThree,
  useFrame
} from '@react-three/fiber';


export function Camera({ fov = 75, position = [10,15,10], ...props}) {
  const cameraRef = React.useRef()
  const {
    camera,
    // gl: { domElement }
  } = useThree();
  useFrame(({ clock }) => {
    camera.fov = fov
    // console.log(cameraRef)
  })



  // console.log(PerspectiveCamera)
  return (
    <group>
      {/* <cameraHelper ref={ref} args={[camera, domElement]}/> */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={position}
        fov={fov}
        far={5000}
        zoom={2}
      />
    </group>

  )
}