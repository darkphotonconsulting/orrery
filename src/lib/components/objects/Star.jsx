import React from 'react';

import * as THREE from 'three'
import {
  useThree,
  useLoader
}  from '@react-three/fiber';

export function Star ({
  theme = {},
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
  setActiveBodies = () => {},
  activeBodies=[],
  ...props
}) {

  const { size } = useThree()
  const ref = React.useRef();
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/base/${userData.star.englishName.toLowerCase()}.jpeg`)
  const [active, setActive] = React.useState(false)
  return (
    <mesh
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
    onClick={(event) => {
      console.log('clicked star')
      setActive(!active)
      const activeNames = activeBodies.map((body) => body.englishName)
      if (activeNames.includes(userData.star.englishName) ) {
        const index = activeNames.indexOf(userData.star.englishName)
        setActiveBodies([
          ...activeBodies.slice(0, index),
          ...activeBodies.slice(index + 1, activeBodies.length)
        ])
      } else {
        setActiveBodies([
          ...activeBodies,
          userData.star
        ])
      }

    }}
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
        )
      }
    })()}

  </mesh>
 )

}