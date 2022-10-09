import React from 'react';

import * as THREE from 'three'
import {
  useThree,
  useLoader,
  useFrame,
  extend

}  from '@react-three/fiber';



import {
  LayerMaterial,
  DebugLayerMaterial,
  Texture,
  Noise,
} from 'lamina'

import {
  StarConvectionLayer
} from '../shaders/StarConvectionLayer.js'

extend({ StarConvectionLayer})

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
  widthSections = 50,
  heightSections = 50,
  wireFrame = true,
  baseColor = 'green',
  radius = 10,
  index = 0,
  userData = {},
  setActiveBodies = () => {},
  activeBodies=[],
  controls = {},
  ...props
}) {

  const { size } = useThree()
  const groupRef = React.useRef()
  const meshRef = React.useRef()
  const geomRef = React.useRef();
  const layerMaterialRef = React.useRef();
  const textureRef = React.useRef();
  // const noiseRef = React.useRef();
  const convectionRef = React.useRef();
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/diffuse/${userData.star.englishName.toLowerCase()}-${controls.scene.resolution}.jpg`)
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set( 1, 1 );


  const [active, setActive] = React.useState(false)

  useFrame((state, delta) => {
    // const earthYear = 2 * Math.PI * (1 /60) * (1/60)
    const t = state.clock.getElapsedTime()
    if (convectionRef.current) {

      convectionRef.current.time = t
      convectionRef.current.scale += t
    }
  })


  return (
    <group ref={groupRef}>
      <mesh
      ref={meshRef}
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
      <directionalLight
        color={'#ffffff'}
        position={[0,0,0]}
        intensity={1}
      />
      {(() => {
        <directionalLight
          position={[meshPositionX, meshPositionY, meshPositionZ]}
          intensity={0.5}
        />
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
      <sphereBufferGeometry
        ref={geomRef}
        args={[
          radius || 0.7,
          widthSections || 30,
          heightSections || 30
        ]}
        attach='geometry'
      >

      </sphereBufferGeometry>
      <LayerMaterial
          ref={layerMaterialRef}
          lighting={'standard'}
          color={'#D86433'}
          side={THREE.DoubleSide}
          emissive={new THREE.Color('#D86433')}

        >

          <Texture
            ref={textureRef}
            map={baseTexture}
            alpha={1}
            mode={'multiply'}
            emissive={'#862828'}
            color={'#862828'}
          />
          <starConvectionLayer
            ref={convectionRef}
            mode={'normal'}
            color={'#fff123'}
            alpha={0.9}
          />
          {/* <Noise
            ref={noiseRef}
            mapping={'local'}
            type={'perlin'}
            mode={'multiply'}
          /> */}

        </LayerMaterial>

      {/* {(() => {
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
      })()} */}

    </mesh>
  </group>
 )

}