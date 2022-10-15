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
  Gradient,
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
  widthSections = 120,
  heightSections = 120,
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
    // textureRef.current.updateMatrix()
    geomRef.current.computeVertexNormals()
    geomRef.current.computeTangents()
    const t = state.clock.getElapsedTime()

    if (convectionRef.current) {


      convectionRef.current.time = t
      convectionRef.current.scale += t
    }
  })
  console.log({
    event: 'render-star'
  })



  return (
    <group
      ref={groupRef}
      name={`star-base-group-${userData.star.englishName.toLowerCase()}`}
      // id={`star-base-group-${userData.star.englishName.toLowerCase()}`}
    >
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
      {/* <pointLight
        color={'#FFFFFF'}
        power={2}
        intensity={5.5}
        decay={2}
      >
        <sphereBufferGeometry
          args={[
            radius,
            widthSections,
            heightSections
          ]}
        />
      </pointLight> */}


      <sphereBufferGeometry
        visible={true}
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
          attach={'material'}
          ref={layerMaterialRef}
          lighting={'physical'}
          color={
            new THREE.Color('#E75829').convertSRGBToLinear()
              .add(new THREE.Color('#F6A708').convertSRGBToLinear())
          }
          side={THREE.DoubleSide}
          transmission={0.91}
          roughness={0.01}
          metalness={0.05}

          // emissive={new THREE.Color('#C3650D')}

          emissiveIntensity={0.5}
          resolution={[size.width, size.height]}

        >
          <Gradient
            visible={true}
            attach={'material'}
            colorA={new THREE.Color('#FFEA01').convertSRGBToLinear()}
            colorB={new THREE.Color('#FF7E05').convertSRGBToLinear()}
            alpha={0.5}
            contrast={0.01}
            mapping={'local'}
            mode={'add'}
            axis={'z'}
          />
          <Texture
            attach={'material'}
            visible={false}
            ref={textureRef}
            map={baseTexture}
            alpha={1}
            color={new THREE.Color('#FFFFFF').convertSRGBToLinear()}
            mode={'overlay'}
            // emissiveIntensity={1}
          />
          <starConvectionLayer
            attach={'material'}
            visible={true}
            ref={convectionRef}
            mode={'multiply'}
            color={new THREE.Color('#184AE0').convertSRGBToLinear()}
            alpha={0.75}
          />
          <Noise
            // ref={noiseRef}
            attach={'material'}
            visible={false}
            mapping={'local'}
            type={'perlin'}
            mode={'multiply'}
          />

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