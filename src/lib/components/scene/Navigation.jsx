import React from 'react';
import { extend, useThree } from '@react-three/fiber';
import {
  OrbitControls,
} from '@react-three/drei';

extend({OrbitControls})

export function Navigation({pan = true, zoom = true, rotate = true, ...props}) {
  const ref = React.useRef()
  const { camera, gl: { domElement } } = useThree();
  return (
    <OrbitControls
      ref={ref}
      enablePan={pan}
      enableZoom={zoom}
      enableRotate={rotate}
      args={[camera, domElement]}
    />
  )
}
