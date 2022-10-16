import React from 'react'
import * as THREE from 'three'
export function Lighting({
  intensity = 15,
  color = THREE.Color('#ffffff'),
  ground = THREE.Color('#ffffff'),
  lightingRef = null,
  ...props
}) {
  const groupRef = React.useRef()
  console.log({
    event: 'debug-lighting',
    lighting: lightingRef
  })

  return (
    <group ref={groupRef} name='lighting-group'>
      {/* <fog attach='fog' args={['#404040', 10, 25]} /> */}

      <ambientLight
        ref={lightingRef}
        name={'ambient-light'}
        intensity={intensity}
        color={color}
        position={[0, 0, 0]}
      />

    </group>
  )
}
