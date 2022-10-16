import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
// import { extend, useThree, useFrame } from '@react-three/fiber';
import {
  useThree,
  useFrame
} from '@react-three/fiber';


export function Camera({
  fov = 75,
  position = [150,150,250],
  controls = {},
  scaledGalaxy = {},
  cameraRef = null,
  ...props
}) {
  const groupRef = React.useRef();
  console.log({
    event: 'debug-camera',
    camera: cameraRef
  })
  const {
    camera,
  } = useThree();
  useFrame(({ clock }) => {
    camera.fov = controls.camera.fov
    cameraRef.current.updateProjectionMatrix()

  })

  const near = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    const min = Math.min(...axes)
    console.log({
      event: 'calculate-minimum-distance',
      min,
      max: Math.max(...axes)

    })
    return min
  }

  const far = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    const max = Math.max(...axes)
    console.log({
      event: 'calculate-maximum-distance',
      max,
      min: Math.min(...axes)

    })
    return max
  }

  return (
    <group ref={groupRef} name={'camera-group'}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={position}
        fov={fov}
        near={0.001}
        far={5000}
      />
    </group>

  )
}