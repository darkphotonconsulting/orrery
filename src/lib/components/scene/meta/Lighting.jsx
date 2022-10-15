import React from 'react'
import * as THREE from 'three'
export function Lighting({
  intensity = 15,
  color = THREE.Color('#ffffff'),
  ground = THREE.Color('#ffffff'),
  // setSceneReferenceCatalog = () => {},
  // sceneReferenceCatalog = {},
  ...props
}) {
  const groupRef = React.useRef()
  const lightingRef = React.useRef()
  console.log({
    event: 'debug-lighting',
    lighting: lightingRef
  })
  // React.useMemo(() => {
  //   setSceneReferenceCatalog({
  //     ...sceneReferenceCatalog,
  //     lighting: lightingRef.current
  //   })
  // }, [lightingRef, setSceneReferenceCatalog, sceneReferenceCatalog])
  return (
    <group ref={groupRef} name='lighting-group'>
      {/* <fog attach='fog' args={['#404040', 10, 25]} /> */}

      <ambientLight
        name={'ambient-light'}
        intensity={intensity}
        color={color}
        position={[0, 0, 0]}

        // onUpdate={(self) => {console.log('rendered the ambient light')}}

      />

    </group>
  )
}
