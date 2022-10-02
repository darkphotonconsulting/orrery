import React from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
} from '@react-three/drei';


extend({OrbitControls})

export function Navigation({pan = true, zoom = true, rotate = true, ...props}) {
  const ref = React.useRef()
  const { camera, gl: { domElement } } = useThree();
  useFrame((state) => {
    // console.log(state)
  })
  React.useEffect(() => {
    if (!!ref.current) {
      // console.log(ref.current)
    }
  }, [ref.current])
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
