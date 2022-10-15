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
import { PerspectiveCamera } from '@react-three/drei';

import {
  LayerMaterial,
  DebugLayerMaterial,
  Texture,
  Noise,
  Depth
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

  // TODO: investigate why semiminorAxis vanishes on linear scaling mode.
  /*
    👨🏻‍🔧: if the value vanishes to a NaN, I currently estimate an ellipse by taking .80% of the semimajorAxis
    - 💡 the semiminorAxis appears to become NaN because the get/set methods which support it are being stripped from the object by 3js
    - when the object is passed into the userData field, three3js strips any executable functions leaving only properties
    - I need to rethink how to handle semiminorAxis, objectMass and objectVolume as they are all based on get/set methods and calculated at runtime.
      - I want to preserve this behavior as it allows ease of scaling and manipulation of the object
  */

  semiminorAxis = isNaN(semiminorAxis) ? semimajorAxis * 0.8 : semiminorAxis
  const {
    size,
    gl,
    scene
  } = useThree()

  const meshRef = React.useRef();
  const geomRef = React.useRef();
  const layerMaterialRef = React.useRef();
  const textureRef = React.useRef();
  const cameraRef = React.useRef();
  // const orbital = React.useRef();
  const [active, setActive] = React.useState(false)

  // TODO: improve planet texturing
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/diffuse/${userData.planet.englishName.toLowerCase()}-${controls.scene.resolution}.jpg`)
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set( 1, 1 );
  baseTexture.encoding = THREE.sRGBEncoding;
  // baseTexture.mapping = THREE.EquirectangularRefractionMapping
  // baseTexture.
  const bumpTexture = useLoader(THREE.TextureLoader, `/textures/diffuse/${userData.planet.englishName.toLowerCase()}-${controls.scene.resolution}.jpg`)
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.RepeatWrapping;
  bumpTexture.repeat.set( 1, 1 );
  bumpTexture.encoding = THREE.LinearEncoding
  // bumpTexture.encoding

  const normalTexture = useLoader(THREE.TextureLoader, `/textures/normal/${userData.planet.englishName.toLowerCase()}.jpg`)
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.encoding = THREE.LinearEncoding
  normalTexture.repeat.set( 1, 1 );


  const perspectiveCam = new THREE.PerspectiveCamera( 75, size.width / size.height, 0.1, 25 );
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
    geomRef.current.computeVertexNormals()
    geomRef.current.computeTangents()
    // console.log(meshRef)
    // console.log(cameraRef)


    if (animateOrbitalRotation) {

      const x =  (
        semimajorAxis *
        Math.cos(
          t / (earthYear * userData.planet.sideralOrbit)
        )
      )
      const z =  (
        semiminorAxis *
        Math.sin(
          t / (earthYear * userData.planet.sideralOrbit)
        )
      )
      // console.log({
      //   event: 'planet-orbital-step',
      //   planet: userData.planet.englishName,
      //   x,
      //   y

      // })
      /*
      TODO: orbits are counter-clockwise, but the planets are rotating clockwise


      */

      meshRef.current.position.x = -1 * x
      meshRef.current.position.z = -1 * z
      // meshRef.current.updateProjectionMatrix()
      // console.log('position:', meshRef.current.getWorldPosition())
      // console.log('position:', geomRef.current.getWorldPosition())
      // const cameraPosition = new THREE.Vector3()
      // meshRef.current.getWorldPosition(cameraPosition)
      // const cameraDelta = cameraPosition.clone().sub()
      cameraRef.current.position.x = (-1 * x)
      cameraRef.current.position.z = (-1 * z)
      // cameraRef.current.children[0].camera.position.y = 100
      cameraRef.current.position.y = 100
      // console.log(cameraRef)
      cameraRef.current.lookAt(0,0,0)
      cameraRef.current.children[0].camera.lookAt(0,0,0)

    }

    if (animateAxialRotation) {

      // mesh.current.rotation.y = t * (userData.planet.sideralRotation + 5)
      meshRef.current.rotation.y += t / (earthYear * userData.planet.sideralRotation)
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
    refs: [
      meshRef,
      geomRef,
      // emptyRef,
      layerMaterialRef,
      textureRef
    ]
  })

  return (
    <group
      key={`planet-group-${userData.planet.englishName.toLowerCase()}`}
      name={`planet-group-${userData.planet.englishName.toLowerCase()}`}
    >

      <mesh
        key={`planet-camera-mesh-${userData.planet.englishName.toLowerCase()}`}
        name={`planet-camera-mesh-${userData.planet.englishName.toLowerCase()}`}
        ref={cameraRef}
      >
        <cameraHelper

              args={[perspectiveCam]}
        />
      </mesh>
      <mesh
        key={`planet-mesh-${userData.planet.englishName.toLowerCase()}`}
        name={`planet-mesh-${userData.planet.englishName.toLowerCase()}`}
        ref={meshRef}
        // scale={active ? 1.5 : 1}
        scale={1}
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
              {
                ...userData.planet,
                meshRef,
                geomRef,
                // emptyRef,
                layerMaterialRef,
                textureRef
              }
              // userData.planet
            ])
          }
        }}
        castShadow={true}
        receiveShadow={true}

      >

        {/* 🔧 an empty at center space which represents the orbiting/rotating body */}
        {/* <primitive
          key={`planet-empty-${userData.planet.englishName}`}
          name={`planet-empty-${userData.planet.englishName}`}
          position={[0,0,0]}
          ref={emptyRef}
          object={new THREE.Object3D()}
        /> */}

        {/* enable/disable ambient lighting */}


        {/*
          base planet shape
          🤔: should we use a sphere or a plane?
          TODO:
            - improve planet texture appearance
            - improve planet texture mapping (bump, ocean, cloud, etc.)
        */}


        <sphereBufferGeometry
          key={`planet-geometry-${userData.planet.englishName.toLowerCase()}`}
          name={`planet-geometry-${userData.planet.englishName.toLowerCase()}`}
          ref={geomRef}
          args={[
            radius || 0.7,
            widthSections || 30,
            heightSections || 30
          ]}
          attach='geometry'
        >

        </sphereBufferGeometry>
        <primitive
          visible={active}
          object={
            new THREE.AxesHelper(2 * radius)
          }
        />
        <ambientLight
                key={`planet-ambient-light-${userData.planet.englishName}`}
                name={`planet-ambient-light-${userData.planet.englishName}`}
                intensity={2}
        />
        <LayerMaterial
            key={`planet-layers-${userData.planet.englishName.toLowerCase()}`}
            name={`planet-layers-${userData.planet.englishName.toLowerCase()}`}
            lighting={'physical'}
            depthTest={true}
            depthWrite={true}
            transmission={0.9}
            opacity={1}
            roughness={0.9}
            metalness={0.9}
            resolution={[size.width, size.height]}
            ref={layerMaterialRef}
            visible={true}
            color={'#060606'}
          >

            <Texture
              visible={true}
              ref={textureRef}
              map={baseTexture}
              bumpMap={bumpTexture}
              bumpScale={125}
              alpha={1}
              depthTest={true}
              depthWrite={true}
              mode={'normal'}

              side={THREE.DoubleSide}
            />
        </LayerMaterial>
    </mesh>
  </group>
 )

}