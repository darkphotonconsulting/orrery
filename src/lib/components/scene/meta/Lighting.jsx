import React from 'react'

export function Lighting({
  intensity = 0.2,
  color = '#eaeaea',
  ground = '#FF8800',
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
      {/* <fog attach='fog' args={['#202030', 10, 25]} /> */}

      <ambientLight
        name={'ambient-light'}
        intensity={1}
        color={color}
        position={[0, 0, 0]}

        // onUpdate={(self) => {console.log('rendered the ambient light')}}

      />

    </group>
  )
}
