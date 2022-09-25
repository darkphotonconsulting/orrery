import React from 'react';
import * as THREE from 'three'
import {
  // useThree,
  useFrame,
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


  const mesh = React.useRef()
  const geom = React.useRef()
  // const { size } = useThree()
  const points = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = semimajorAxis * Math.cos(angle)
    /* 🤔 Possibly Opinionated Calculation
    - If the semiminorAxis is `Not a Number`, estimate the semiminorAxis by taking .80% of the semimajorAxis
    */
    const y = isNaN(semiminorAxis)
    ? (semimajorAxis * 0.8) * Math.sin(angle)
    : semiminorAxis * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, y))
  }
  points.push(points[0])
  const curve = new THREE.CatmullRomCurve3(points)
  curve.closed = true
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64))

  useFrame((state, delta) => {
  })
  return (
      <mesh ref={mesh}>
        <line ref={geom} geometry={lineGeometry} userData={userData}>
          <lineBasicMaterial attach='material' color={baseColor} linewidth={thickness} linecap={'round'} linejoin={'round'} />
        </line>
      </mesh>

  )

}