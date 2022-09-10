import * as THREE from 'three'

export const ellipsePoints = ({
  semimajorAxis = 10,
  semiminorAxis = 15
}) => {
  const points = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = semimajorAxis * Math.cos(angle)

    const y = semiminorAxis * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, y))
  }
  points.push(points[0])
  return points
}

export const circlePoints = ({
  radius = 10
}) => {
  const points = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, y))
  }
  points.push(points[0])
  return points
}
// (x,y,z) = (r*(cos(theta)*sin(phi)) , r*(sin(theta)*sin(phi)) , r*(cos(phi)) )
export const spherePoints = ({
  radius = 10,
  step = 32,

}) => {
  const points = []
  // const steps = Array.from(Array(step)).keys()
  let u = 0
  let v = 0
  // for (const step of steps) {
  //   u += step
  //   v += step
  //   const x = radius * (Math.cos(u) * Math.sin(v))
  //   const y = radius * (Math.sin(u) * Math.sin(v))
  //   const z = radius * (Math.cos(v))
  //   points.push(new THREE.Vector3(x, y, z))
  // }

  while (u <= Math.PI && v <= 2 * Math.PI) {
    u += step
    v += step
    const x = radius * (Math.cos(u) * Math.sin(v))
    const y = radius * (Math.sin(u) * Math.sin(v))
    const z = radius * (Math.cos(v))
    points.push(new THREE.Vector3(x, y, z))
  }

  return points


}