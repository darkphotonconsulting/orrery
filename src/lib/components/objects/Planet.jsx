import React from 'react';

import * as THREE from 'three'
import {
  useFrame,
  useLoader,
  useThree,
}  from '@react-three/fiber';

export function Planet ({
  meshPositionX = 0,
  meshPositionY = 0,
  meshPositionZ = 0,
  meshRotationX = 0,
  meshRotationY = 0,
  meshRotationZ = 0,
  useAmbientLight = true,
  useSpotLight = false,
  spotlightPositionX = 0,
  spotlightPositionY = 0,
  spotlightPositionZ = 0,
  spotlightAngle = 0.3,
  lightIntensity = 0.5,
  widthSections = 30,
  heightSections = 30,
  wireFrame = true,
  baseColor = 'green',
  radius = 10,
  index = 0,
  userData = {},
  ...props
}) {

  const { size } = useThree()
  const ref = React.useRef();
  const [active, setActive] = React.useState(false)
  // TODO: improve planet texturing
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/base/${userData.planet.englishName.toLowerCase()}.jpeg`)
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set( 1, 1 );

  useFrame(({ clock }) => {
    // TODO: scale the rotation of planets based on their axial rotation
    // ref.current.rotation.y = clock.getElapsedTime() / userData.planet.objectHarmonicFrequency * Math.PI /3

  })


  return (
    <mesh
      ref={ref}
      scale={active ? 1.5 : 1}
      position={[
        meshPositionX || 0,
        meshPositionY || 0,
        meshPositionZ || 0
      ]}
      rotation={[
        meshRotationX || 0,
        meshRotationY || 0,
        meshRotationZ || 0
      ]}
      onClick={(event) => setActive(!active)}
    >
      {(() => {
        if (useAmbientLight) {
          return (
            <ambientLight intensity={lightIntensity || 0.5} />
          );
        }
      })()}

      {(() => {
        if (useSpotLight || false) {
          return (
            <spotLight
              position={[
                spotlightPositionX || 10,
                spotlightPositionY || 15,
                spotlightPositionZ || 10
              ]}
              angle={spotlightAngle || 0.3}
            />
          );
        }
      })()}
      <sphereGeometry
        ref={ref}
        args={[
          radius || 0.7,
          widthSections || 30,
          heightSections || 30
        ]}
        attach='geometry'
      />

      {(() => {
        if (wireFrame) {
          return (
            <meshStandardMaterial wireframe attach='material' color={active ? 'red' : baseColor || 'black'} resolution={[size.width, size.height]} />
          )
        } else {
          return (
            <meshPhysicalMaterial
              map={baseTexture}
            />
            // <meshStandardMaterial attach='material' color={active ? 'red' : baseColor || 'black'} />
          )
        }
      })()}

  </mesh>
 )

}