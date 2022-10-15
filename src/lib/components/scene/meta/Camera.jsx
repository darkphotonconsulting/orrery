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
  ...props
}) {
  const groupRef = React.useRef();
  const cameraRef = React.useRef()

  console.log({
    event: 'debug-camera',
    camera: cameraRef
  })
  const {
    camera,
    // gl: { domElement }
  } = useThree();
  useFrame(({ clock }) => {

    // camera.fov = fov
    camera.fov = controls.camera.fov
    // camera.position.x = controls.camera.position[0]
    // camera.position.y = controls.camera.position[2]
    // camera.position.z = controls.camera.position[1]
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
      {/* <cameraHelper ref={ref} args={[camera, domElement]}/> */}
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