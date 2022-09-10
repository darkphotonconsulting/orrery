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


const uv = ({
  step
}) => {
  const ustep = (Math.PI) / step
  const vstep = (2 * Math.PI) / step
  const umax = Math.PI
  const vmax = 2 * Math.PI
  const vsteps = []
  const usteps = []
  for (let v = 0; v < vmax; v += vstep) {
    vsteps.push(v)
  }
  for (let u = 0; u < umax; u += ustep) {
    usteps.push(u)
  }
  // return {
  //   u: usteps,
  //   v: vsteps
  // }
  return usteps.map(u => vsteps.map(v => [u, v]))
  .flat()
}

export const spherePoints = ({
  radius = 10,
  step = 32,
}) => {
  const steps = uv({step})
  // const { u, v} = steps
  return steps

}