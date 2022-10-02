import React from 'react'

export function Lighting({
  intensity = 0.2,
  color = '#eaeaea',
  ground = '#0000ff',
  ...props
}) {
  const lightingRef = React.useRef()
  return (
    <group >
      <fog attach='fog' args={['#202030', 10, 25]} />
      <hemisphereLight
        ref={lightingRef}
        intensity={intensity}
        color={color}
        groundColor={ground}
        scale={1}
      />
    </group>
  )
}
