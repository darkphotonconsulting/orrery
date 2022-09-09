import React from 'react';

import {
  Canvas,
  // useThree,
  // useFrame
} from '@react-three/fiber';
import { CelestialBodies } from './lib/data/CelestialBodies.js';
import { CelestialBodyScaler } from './lib/tools/Scalers.js';
import {
  // OrbitControls,
  Loader,
} from '@react-three/drei';
// TODO: incorporate the physics engine proprely
// import {
//   Physics,
// } from "@react-three/cannon";
import * as THREE from 'three';

import './styles.css';

// import {
//   Star,
//   Planet
// } from './lib/components/Sphere.jsx';

import {
  Star
} from './lib/components/objects/Star.jsx'
// import { OrbitPath } from './lib/components/Orbit.jsx';

// refactored imports

import {
  Navigation
} from './lib/components/scene/Navigation.jsx'
import {
  Lighting
} from './lib/components/scene/Lighting.jsx'

import {
  Background
} from './lib/components/scene/Background.jsx'

import {
  ControlPad
} from './lib/components/scene/ControlPad.jsx'

import {
  Camera
} from './lib/components/scene/Camera.jsx'




// function OrreryCamera({ scaleConfig = {}, scenePlanets = [], ...props}) {
//   const {
//     gl: { domElement },
//     camera,

//   } = useThree();

//   const ref = React.useRef()
//   const far = (planets) => {
//     const axis = scenePlanets.map((planet) => planet.semimajorAxis)
//     const max = Math.max(...axis)
//     return max
//   }
//   const near = (planets) => {
//     const axis = scenePlanets.map((planet) => planet.semimajorAxis)
//     const min = Math.min(...axis)
//     return min
//   }
//   const perspectiveCamera = new THREE.PerspectiveCamera(
//     scaleConfig.cameraFieldOfView,
//     window.innerWidth / window.innerHeight,
//     near(scenePlanets),
//     far(scenePlanets)

//   )
//   // const orthographicCamera = new THREE.OrthographicCamera(

//   // )
//   const sceneCamera = scaleConfig?.cameraPerspective
//     ? (
//       <group>
//         <cameraHelper args={[perspectiveCamera]}/>
//         <OrbitControls
//           autoRotate={false}
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           ref={ref}
//           camera={camera}
//         />

//       </group>
//     )
//     : (
//       <group>
//         <cameraHelper args={[perspectiveCamera]}/>
//         <OrbitControls
//           autoRotate={false}
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           ref={ref}
//           camera={camera}
//           // args={[threeCam, gl.domElement]}
//         />

//       </group>

//     )
//   return sceneCamera
// }

// function OrreryPlanets({ scaleConfig, orreryStars = [], handleGalaxyUpdate, ...props}) {
//   const [requestBodies, setRequestBodies] = React.useState([])
//   const [scenePlanets, setScenePlanets] = React.useState([])
//   const [scaledScenePlanets, setScaledScenePlanets ] = React.useState([])
//   const ref = React.useRef()
//   React.useEffect(() => {
//     if (scenePlanets.length === 0) {
//       fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
//       .then((response) => {
//         // get the data from API and store it in state
//         const json = response.json();
//         return json;
//       })
//       // on a succesful response, set the state
//       .then((json) => {
//         const { bodies } = json
//         setRequestBodies([
//           requestBodies,
//           ...bodies
//         ])
//         const allBodies = new CelestialBodies({ bodies: [...bodies] });
//         const planets = allBodies.planets();
//         const scaler = scaleTool.getTransormationFunction({type: scaleConfig.scaler})
//         const scaledPlanets = scaler({
//           bodies: planets,
//           rangeMinimum: scaleConfig.scaleMinimum,
//           rangeMaximum: scaleConfig.scaleMaximum,
//           constant: scaleConfig.scaleConstant,
//           base: scaleConfig.scaleBase
//         })


//         handleGalaxyUpdate('planets', planets, scaledPlanets)
//         setScaledScenePlanets([
//           ...scaledPlanets
//         ])
//         setScenePlanets([
//           ...planets
//         ])
//         return bodies
//       })
//       .then((bodies) => {
//       })
//     } else {

//       const bodies = requestBodies
//       const allBodies = new CelestialBodies({ bodies: [...bodies] });
//       const planets = allBodies.planets();


//       const scaler = scaleTool.getTransormationFunction({type: scaleConfig.scaler})
//       const scaledPlanets = scaler({
//         bodies: planets,
//         rangeMinimum: scaleConfig.scaleMinimum,
//         rangeMaximum: scaleConfig.scaleMaximum,
//         constant: scaleConfig.scaleConstant,
//         base: scaleConfig.scaleBase
//       })
//       handleGalaxyUpdate('planets', planets, scaledPlanets)
//       setScaledScenePlanets([
//         ...scaledPlanets
//       ])

//     }

//   }, [scenePlanets, scaledScenePlanets, requestBodies, scaleConfig.scaleMinimum, scaleConfig.scaleMaximum, scaleConfig.scaleBase, scaleConfig.scaleConstant, scaleConfig.scaler, handleGalaxyUpdate])

//   const star = orreryStars[0]


//   const sceneItems = scaledScenePlanets.map((planet, index) => {

//     return (
//       <group>

//         <Planet
//           scale={[1.0, 1.0, 1.0]}
//           key={`planet-body-${planet.englishName.toLowerCase()}`}
//           userData={{planet}}
//           wireFrame={false}
//           useSpotLight={false}
//           useAmbientLight={true}
//           baseColor={'#22803D'}
//           meshPositionX={(planet.semimajorAxis + star.equaRadius   ) * (index + 2)}
//           meshPositionY={0}
//           meshPositionZ={0}
//           radius={planet.englishName.toLowerCase() === 'mercury' ? 0.10 : Math.abs(planet.equaRadius)}
//           index={index}
//         />
//         <OrbitPath
//           key={`planet-orbit-${planet.englishName.toLowerCase()}`}
//           semimajorAxis={(planet.semimajorAxis + star.equaRadius   ) * (index + 2)}
//           semiminorAxis={(planet.semiminorAxis + star.equaRadius   ) * (index + 2)}
//           inclination={planet.inclination}
//           baseColor={'#FFFFFF'}
//           index={index}
//           thickness={3}
//           userData={{
//             planet,
//             star
//           }}
//         />
//       </group>

//     )
//   })

//   return (
//     <group ref={ref}>
//       {sceneItems}
//     </group>
//   )
// }



// export class App extends React.Component {
//   #defaultScaler = 'log'
//   #defaultScale = 0.5
//   #defaultBase = 2
//   #defaultConstant = 0.1
//   #defaultRangeMinimum = 20
//   #defaultRangeMaximum = 100
//   #defaultNear = .01
//   #defaultFar = 100000;
//   #defaultPosition = [-5000,-5000,-5000]
//   #defaultFov = 175

//   constructor(props) {
//     super(props);
//     this.ref = React.createRef();
//     this.state = {
//       controls: {
//         scaler: 'log',
//         scaleMinimum: 1,
//         scaleMaximum: 1000,
//         scaleConstant: 0.1,
//         scaleBase: 5,
//         cameraFieldOfView: 75,
//         cameraPerspective: true,
//         cameraX: 100,
//         cameraY: 100,
//         cameraZ: 100
//       },
//       scene: {
//         aspect: {
//           width: window.innerWidth,
//           height: window.innerHeight,
//           // ratio: window.innerWidth / window.innerHeight
//           ratio: 1
//         }
//       },
//       camera: {
//         fov: this?.props?.camera?.fov || this.#defaultFov,
//         near: this?.props?.camera?.near || this.#defaultNear,
//         far: this?.props?.camera?.far || this.#defaultFar,
//         position: this?.props?.camera?.position || this.#defaultPosition
//       },
//       shadows: this?.props.shadows || true,
//       transformation: {
//         scaler: this?.props.transformation?.scaler || this.#defaultScaler,
//         scale: this?.props.transformation?.scale || this.#defaultScale,
//         base: this?.props.transformation?.base || this.#defaultBase,
//         rangeMinimum: this?.props?.transformation?.rangeMinimum || this.#defaultRangeMinimum,
//         rangeMaximum: this?.props?.transformation?.rangeMaximum|| this.#defaultRangeMaximum,
//         constant: this?.props?.transformation?.constant || this.#defaultConstant
//       },
//       galaxy: {
//         pristene: {
//           stars: [],
//           planets: [],
//           dwarfs: [],
//           moons: [],
//           asteroids: [],
//           comets: [],
//         },
//         scaled: {
//           stars: [],
//           planets: [],
//           dwarfs: [],
//           moons: [],
//           asteroids: [],
//           comets: [],
//         }
//       }
//     };
//     this.handleControlPadUpdate = this.handleControlPadUpdate.bind(this)
//     this.handleGalaxyUpdate = this.handleGalaxyUpdate.bind(this)
//     this.calculateCameraFarness = this.calculateCameraFarness.bind(this)
//     this.calculateCameraNearness = this.calculateCameraNearness.bind(this)
//   }

//   // TODO: research if alternatives for this pattern.
//   componentDidMount() {
//     // deprecated for now

//   }

//   calculateCameraNearness() {
//     const planets = this.state.galaxy.scaled.planets
//     const axis = planets.map((planet) => planet.semimajorAxis)
//     const minAxis = Math.min(...axis)
//     return minAxis
//   }

//   calculateCameraFarness() {
//     const planets = this.state.galaxy.scaled.planets
//     const axis = planets.map((planet) => planet.semimajorAxis)
//     const maxAxis = Math.max(...axis)
//     return maxAxis
//   }



//   handleGalaxyUpdate(type, pristene, scaled) {
//     this.setState((state) => ({
//       ...state,
//       galaxy: {
//         ...state.galaxy,
//         pristene: {
//           ...state.galaxy.pristene,
//           [type]: [
//             ...pristene
//           ]
//         },
//         scaled: {
//           ...state.galaxy.scaled,
//           [type]: [
//             ...scaled
//           ]
//         }
//       }
//     }))
//   }

//   handleControlPadUpdate(controls) {
//     this.setState((state) => ({
//       ...state,
//       controls,

//     }));
//   }

//   camera() {
//     return new THREE.PerspectiveCamera(
//       this.state.controls.cameraFieldOfView,
//       window.innerWidth / window.innerHeight,
//       this.state.camera.near,
//       this.state.camera.far
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             // height: '1vh'
//             }}
//         >

//           <Canvas
//             dpr={window.devicePixelRatio}
//           >
//             {/* render a control ui  */}

//           </Canvas>
//         </div>
//         <div style={{
//           width: '100vw',
//           height: '100vh',
//         }}>
//           <Canvas
//             dpr={window.devicePixelRatio}
//             camera={{
//               position: [
//                 this.state.controls.cameraX,
//                 this.state.controls.cameraY,
//                 this.state.controls.cameraZ
//               ],
//               fov: this.state.controls.cameraFieldOfView,
//               // near: this.calculateCameraNearness(),
//               // far: 1000
//             }}
//           >
//             <React.Suspense>
//               <OrreryCamera scaleConfig={this.state.controls} scenePlanets={this.state.galaxy.scaled.planets}/>
//               <OrreryControlPad
//                 handleControlPadUpdate={this.handleControlPadUpdate}

//                 scaleConfig={this.state.controls}
//                 {...this.props}

//               />

//               <primitive object={new THREE.AxesHelper(10)} />
//               <color attach='background' args={['#15151a']} />
//               <fog attach='fog' args={['#202030', 10, 25]} />
//               <hemisphereLight intensity={0.2} color='#eaeaea' groundColor='blue' />

//               <Stars
//                 radius={1000}
//                 depth={100}
//                 count={15000}
//                 factor={4}
//                 saturation={1}
//                 fade
//                 speed={1}
//               />

//                 {/* [this.state.galaxy.scaled.stars[0].gravity || 1, this.state.galaxy.scaled.stars[0].gravity || 1, this.state.galaxy.scaled.stars[0].gravity || 1 ] */}
//                 <Physics gravity={
//                   this.state.galaxy.scaled.planets.length > 0
//                   ?
//                     [
//                       // scaled the gravitational force
//                       this.state.galaxy.scaled.planets.find((planet) => planet.englishName === 'Earth').gravity * 27.9,
//                       this.state.galaxy.scaled.planets.find((planet) => planet.englishName === 'Earth').gravity * 27.9,
//                       this.state.galaxy.scaled.planets.find((planet) => planet.englishName === 'Earth').gravity * 27.9,
//                     ]
//                   : [1,1,1]
//                 }>




//                   {/* render our sun - sol/soleil */}
//                   <OrreryStars scaleConfig={this.state.controls} handleGalaxyUpdate={this.handleGalaxyUpdate}  {...this.props}/>

//                   {/* render the planets */}
//                   <OrreryPlanets scaleConfig={this.state.controls} handleGalaxyUpdate={this.handleGalaxyUpdate} orreryStars={this.state.galaxy.scaled.stars} {...this.props}/>


//                 </Physics>

//               {/* <OrbitControls
//                 enablePan={true}
//                 enableZoom={true}
//                 enableRotate={true}

//               /> */}
//             </React.Suspense>

//             {/* <Sphere/> */}
//           </Canvas>
//         </div>
//       </div>

//     );
//   }
// }

export function App({ ...props}) {
  const ref = React.useRef()
  const [celestialBodies, setCelestialBodies] = React.useState([])
  const [galaxy, setGalaxy ] = React.useState({
    stars: [],
    planets: [],
    dwarfs: [],
    moons: [],
    asteroids: [],
    comets: [],
  })
  const [scaledGalaxy, setScaledGalaxy] = React.useState({
    stars: [],
    planets: [],
    dwarfs: [],
    moons: [],
    asteroids: [],
    comets: [],
  })
  const [controls, setControls] = React.useState({
    camera: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      fov: 75,
    },
    helpers: {
      camera: true,
      axes: true,
      direction: false,
      grid: false
    },
    lighting: {
      intensity: 0.2,
      color: '#eaeaea',
      ground: 'blue',
    },
    scale: {
      type: 'log',
      min: 1,
      max: 100,
      base: 10,
      constant: 0.1
    }
  })

  React.useEffect(() => {
    // const { current } = ref


    if (celestialBodies.length === 0) {
      // console.log('what is going on?')
      fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        // get the data from API and store it in state
        const json = response.json();
        return json;
      })
      .then((json) => {
        setCelestialBodies(json.bodies)
        const galaxyTool = new CelestialBodies({
          bodies: json.bodies,
        })

        const stars = galaxyTool.stars()
        const planets = galaxyTool.planets()
        const dwarfs = galaxyTool.dwarfs()
        const moons = galaxyTool.moons()
        const asteroids = galaxyTool.asteroids()
        const comets = galaxyTool.comets()
        setGalaxy({
          stars,
          planets,
          dwarfs,
          moons,
          asteroids,
          comets,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      const scaleTool = new CelestialBodyScaler({})
      const scaler = scaleTool.getTransormationFunction({
        type: controls.scale.type,
      })
      const scaled = scaler({
        bodies: [
          ...galaxy.stars,
          ...galaxy.planets,
          ...galaxy.dwarfs,
          ...galaxy.moons,
          ...galaxy.asteroids,
          ...galaxy.comets,
        ],
        rangeMinimum: controls.scale.min,
        rangeMaximum: controls.scale.max,
        base: controls.scale.base,
        constant: controls.scale.constant
      })
      setScaledGalaxy({
        stars: scaled.filter((body) => body.bodyType === 'Star'),
        planets: scaled.filter((body) => body.bodyType === 'Planet'),
        dwarfs: scaled.filter((body) => body.bodyType === 'Dwarf Planet'),
        moons: scaled.filter((body) => body.bodyType === 'Moon'),
        asteroids: scaled.filter((body) => body.bodyType === 'Asteroid'),
        comets: scaled.filter((body) => body.bodyType === 'Comet'),
      })

    }

    console.log({
      event: 'load-galaxy',
      showAxis: controls.helpers.axes,
      bodyTypes: Object.keys(galaxy),
      knownStars: galaxy.stars.length,
      knownPlanets: galaxy.planets.length,
      knownDwarfs: galaxy.dwarfs.length,
      knownMoons: galaxy.moons.length,
      knownAsteroids: galaxy.asteroids.length,
      knownComets: galaxy.comets.length,
      scaleType: controls.scale.type,
      scaleRangeMin: controls.scale.min,
      scaleRangeMax: controls.scale.max,
      scaledStars: scaledGalaxy.stars.length,
      scaledPlanets: scaledGalaxy.planets.length,
      scaledDwarfs: scaledGalaxy.dwarfs.length,
      scaledMoons: scaledGalaxy.moons.length,
      scaledAsteroids: scaledGalaxy.asteroids.length,
      scaledComets: scaledGalaxy.comets.length,

    })

  // 👹 controls and galaxy are the dependencies, adding additional deps such as the scaled galaxy, may cause an infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ controls, galaxy])

  const near = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    console.log('near axes', axes)
    const min = Math.min(...axes)
    return min
  }

  const far = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    console.log('far axes', axes)
    const max = Math.max(...axes)
    return max
  }
  console.log(
    {
      event: 'distance-summary',
      near: near(scaledGalaxy),
      far: far(scaledGalaxy),
    }
  )


  return (
        <div>
          <div>
            <span>HUD, coming soon {scaledGalaxy.planets.length}</span>
          </div>
          <div
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <>
              <Canvas
                ref={ref}
                dpr={window.devicePixelRatio}
                camera={{
                  position: [
                    10,
                    15,
                    10
                  ],
                  fov: 55,
                  near: 0.1,
                  far: 1000
                }}

              >
                <React.Suspense fallback={null}>
                  {/* space is transparent and appears black when not viewed from behind an atmosphere */}
                  <color
                    attach='background' args={['#15151a']}
                  />

                  {/* render configured scene level helpers */}
                  {
                    controls.helpers.axes && scaledGalaxy.stars.length > 0 ?
                    (<primitive object={new THREE.AxesHelper(scaledGalaxy.stars[0].equaRadius * 100)} />)
                    : null
                  }
                  {
                    controls.helpers.grid && scaledGalaxy.stars.length > 0 ?
                    (<primitive object={new THREE.GridHelper(far(scaledGalaxy) * 1000, far(scaledGalaxy) * 1000)}/>)
                    : null
                  }
                  <Navigation/>
                  <Camera
                    fov={controls.camera.fov}
                  />
                  <ControlPad
                    setControls={setControls}
                  />
                  <Lighting
                    intensity={controls.lighting.intensity}
                    color={controls.lighting.color}
                    ground={controls.lighting.ground}

                  />
                  <Background
                    // radius={far(scaledGalaxy) * 10}
                    // depth={far(scaledGalaxy) * 10}
                  />
                  {
                    scaledGalaxy.stars && scaledGalaxy.stars.length > 0
                    ? (
                      <Star
                        meshPositionX={0}
                        meshPositionY={0}
                        meshPositionZ={0}
                        meshRotationX={0}
                        meshRotationY={0}
                        meshRotationZ={0}
                        useAmbientLight={true}
                        useSpotLight={false}
                        spotlightPositionX={0}
                        spotlightPositionY={0}
                        spotlightPositionZ={0}
                        spotlightAngle={0.3}
                        lightIntensity={0.5}
                        widthSections={30}
                        heightSections={30}
                        wireFrame={false}
                        baseColor={'green'}
                        radius={scaledGalaxy.stars.find((star) => star.englishName === 'Sun').equaRadius}
                        index={0}
                        userData={{
                          star: scaledGalaxy.stars.find((star) => star.englishName === 'Sun'),
                          controls
                        }}
                      />
                    )
                    : (<mesh></mesh>)

                  }
                </React.Suspense>

              </Canvas>
              <Loader/>
            </>
          </div>
        </div>




  )
}