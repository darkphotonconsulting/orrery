import React, { useEffect } from 'react';
// import { Leva } from 'leva'



import { CelestialBodyScaler } from '../../../tools/Scalers.js';


// import * as THREE from 'three';
import { folder, useControls } from 'leva'

export function ControlPad({ setControls, ...props}) {
  const ref = React.useRef()
  const controls = useControls('mission-control', {
    camera: folder({
      position: {
        value: [150, 150, 250],
      },
      rotation: {
        value: [0, 0, 0],
      },
      fov: 75,

    }),
    helpers: folder({
      axes: true,
      grid: false,
      direction: true
    }),
    lighting: folder({
      intensity: 0.2,
      color: '#eaeaea',
      ground: 'blue'
    }),
    scale: folder({
      type: {
        value: 'linear',
        options: new CelestialBodyScaler({}).listTransformations()
      },
      min: {
        value: 1,
        step: 0.1,
      },
      max: {
        value: 100,
        step: 0.1,
      },
      base: {
        value: 10,
        step: 1,
      },
      constant: {
        value: 0.1,
        step: 0.1
      }

    }),
    scene: folder({
      // animations: true,
      rotations: true,
      orbits: true,
      paths: true,
      resolution: {
        value: '2k',
        options: ['2k', '4k', '8k']
      }
    })
  })

  useEffect(() => {
    setControls({
      camera: {
        position: controls.position,
        rotation: controls.rotation,
        fov: controls.fov
      },
      helpers: {
        axes: controls.axes,
        grid: controls.grid,
        direction: controls.direction
      },
      lighting: {
        intensity: controls.intensity,
        color: controls.color,
        ground: controls.ground
      },
      scale: {
        type: controls.type,
        min: controls.min,
        max: controls.max,
        base: controls.base,
        constant: controls.constant
      },
      scene: {
        // animations: controls.animations,
        rotations: controls.rotations,
        orbits: controls.orbits,
        paths: controls.paths,
        resolution: controls.resolution
      }
    })
  }, [controls, setControls])

  return (
   <mesh ref={ref}></mesh>
  )
}