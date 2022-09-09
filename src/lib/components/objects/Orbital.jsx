import React from 'react';
import * as THREE from 'three'
import {
  useThree,
  // useUpdate
}  from '@react-three/fiber';

export function Orbital({
  semimajorAxis = 10,
  semiminorAxis = 11,
  inclination = 0,
  baseColor = 'green',
  index = 0,
  thickness = .2,
  userData = {},
  ...props
}) {

  // console.log(planet.semiminorAxis + star.equaRadius   ) * (index + 2))
  const ref = React.useRef()
  const { size } = useThree()
  const points = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = semimajorAxis * Math.cos(angle)
    // if the scale of the model is producing NaN values, just make a circle for now
    const y = isNaN(semiminorAxis) ? (semimajorAxis * 0.8) * Math.sin(angle) : semiminorAxis * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, y))
  }
  points.push(points[0])
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  return (
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach='material' color={baseColor} linewidth={thickness} />
      </line>
  )

}