import React from 'react';

import * as THREE from 'three'
// import
// import fs from 'fs'
// import glsl from 'glslify'
import {
  useFrame,
  useLoader,
  useThree,
}  from '@react-three/fiber';


import {
  LayerMaterial,
  DebugLayerMaterial,
  Texture,
  Noise
} from 'lamina'

// import vertexShader from '../../../assets/shaders/planetVertex.glsl'
// import meta from '../../../assets/bodies.json'
/*
  TODO: import and use Html to conditionally render information about the planet above the planet
    - the transformation should follow the planets orbital path
    - the rotation should be such that the text is always facing the camera
  import { Html } from '@react-three/drei'
*/


export function Planet ({
  theme = {},
  meshPositionX = 0,
  meshPositionY = 0,
  meshPositionZ = 0,
  meshRotationX = 0,
  meshRotationY = 0,
  meshRotationZ = 0,
  semimajorAxis = 10,
  semiminorAxis = 5,
  useAmbientLight = true,
  useSpotLight = false,
  animateAxialRotation = false,
  animateOrbitalRotation = false,
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

  // TODO: investigate why semiminorAxis vanishes on linear scaling mode.
  /*
    👨🏻‍🔧: if the value vanishes to a NaN, I currently estimate an ellipse by taking .80% of the semimajorAxis
    - 💡 the semiminorAxis appears to become NaN because the get/set methods which support it are being stripped from the object by 3js
    - I need to rethink how to handle semiminorAxis, objectMass and objectVolume as they are all based on get/set methods and calculated at runtime.
      - I want to preserve this behavior as it allows ease of scaling and manipulation of the object
  */
  // console.log(vertexShader.text())
  // console.log(glsl)
  // console.log(meta)
  semiminorAxis = isNaN(semiminorAxis) ? semimajorAxis * 0.8 : semiminorAxis
  const { size } = useThree()
  const empty = React.useRef()
  const mesh = React.useRef();
  const geom = React.useRef();
  // const orbital = React.useRef();
  const [active, setActive] = React.useState(false)

  // TODO: improve planet texturing
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/base/${userData.planet.englishName.toLowerCase()}.jpeg`)
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set( 1, 1 );

  const points = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = semimajorAxis * Math.cos(angle)
    const y = semiminorAxis * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, y))
  }
  points.push(points[0])
  const curve = new THREE.CatmullRomCurve3(points)
  curve.closed = true
  useFrame((state, delta) => {
    const earthYear = 2 * Math.PI * (1 /60) * (1/60)
    const t = state.clock.getElapsedTime() * 0.5
    if (animateOrbitalRotation) {
      const x = semimajorAxis * Math.cos(t * (earthYear * userData.planet.sideralOrbit))
      const y = semiminorAxis * Math.sin(t * (earthYear * userData.planet.sideralOrbit))
      /*
      🤔 how should we handle the zed axis?, we should take into account the inclination of the orbit
      const z = 0
      */

      mesh.current.position.x = x
      mesh.current.position.z = y

    }

    if (animateAxialRotation) {

      // mesh.current.rotation.y = t * (userData.planet.sideralRotation + 5)
      mesh.current.rotation.y += earthYear * userData.planet.sideralRotation
    }
  })
  console.log({
    event: 'planet-render',
    planet: userData.planet.englishName,
    index: index,
    radius: userData.planet.equaRadius,
    semimajorAxis: userData.planet.semimajorAxis,
    semiminorAxis: userData.planet.semiminorAxis,
    inclination: userData.planet.inclination,
    keys: Object.keys(userData.planet),
  })

  return (
    <group>

    <mesh
      ref={mesh}
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
        setActive(!active)
        const activeNames = activeBodies.map((body) => body.englishName)
        if (activeNames.includes(userData.planet.englishName) && !active === false) {
          const index = activeNames.indexOf(userData.planet.englishName)
          setActiveBodies([
            ...activeBodies.slice(0, index),
            ...activeBodies.slice(index +1, activeBodies.length)
          ])
        } else {
          setActiveBodies([
            ...activeBodies,
            userData.planet
          ])
        }
      }}

    >

      {/* 🔧 an empty at center space which represents the orbiting/rotating body */}
      <primitive
        position={[0,0,0]}
        ref={empty}
        object={new THREE.Object3D()}
      />

      {/* enable/disable ambient lighting */}
      {(() => {
        if (useAmbientLight) {
          return (
            <ambientLight intensity={lightIntensity || 0.5} />
          );
        }
      })()}
      {/* enable/disable spot lighting */}
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
      {/*
        base planet shape
        🤔: should we use a sphere or a plane?
        TODO:
          - improve planet texture appearance
          - improve planet texture mapping (bump, ocean, cloud, etc.)
      */}
      <sphereGeometry
        ref={geom}

        args={[
          radius || 0.7,
          widthSections || 30,
          heightSections || 30
        ]}
        attach='geometry'
      >

      </sphereGeometry>
      <LayerMaterial
          lighting={'phong'}
          resolution={[size.width, size.height]}
        >
          <Texture
            map={baseTexture}
            alpha={1}
            mode={'normal'}
          />
      </LayerMaterial>


      {/* improve texturing, bump, masking, atmosphere, etc. */}

      {/* {(() => {
        if (wireFrame) {
          return (
            <meshStandardMaterial
              wireframe
              attach='material'
              color={active ? 'red' : baseColor || 'black'}
              resolution={[size.width, size.height]}
            />
          )
        } else {
          return (
            <meshPhysicalMaterial
              map={baseTexture}
            />
          )
        }
      })()} */}

  </mesh>
  </group>
 )

}