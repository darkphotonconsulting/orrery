import React from 'react';
import { Leva } from 'leva'
// import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber';
import { CelestialBodies } from './lib/data/CelestialBodies.js';
import { CelestialBodyScaler } from './lib/tools/Scalers.js';
import {
  OrbitControls,
  Stars,
  // PerspectiveCamera,
  // OrthographicCamera,
} from '@react-three/drei';
import {
  Physics,
} from "@react-three/cannon";
import * as THREE from 'three';
import { folder, useControls } from 'leva'
import './styles.css';

import { Star, Planet } from './lib/components/Sphere.jsx';
import { OrbitalPath, OrbitPath } from './lib/components/Orbit.jsx';
const scaleTool = new CelestialBodyScaler({

})


function OrreryControlPad({scaleConfig, handleControlPadUpdate, ...props}) {
  const ref = React.useRef()
  const [ controls, setControls] = React.useState({
    ...scaleConfig

  })

  // eslint-disable-next-line no-unused-vars
  const { scaler, min: scaleMinimum, max: scaleMaximum, constant: scaleConstant, base: scaleBase, fov: cameraFieldOfView, perspective: cameraPerspective } = useControls('control', {
    scale: folder({
      scaler: {
        value: 'log',
        options: scaleTool.listTransformations(),
        onChange: (v) => {
          setControls({
            ...controls,
            scaler: v
          })
          handleControlPadUpdate({
            ...controls,
            scaler: v
          })

        }
      },
      min: {
        value: controls.scaleMinimum,
        min: 0,
        max: 100,
        step: 1,
        onChange: (v) => {
          // console.log('scale min range updated:', v)

          setControls({
            ...controls,
            scaleMinimum: v
          })
          handleControlPadUpdate({
            ...controls,
            scaleMinimum: v
          })


        }
      },
      max: {
        value: controls.scaleMaximum,
        min: 100,
        max: 1000,
        step: 1,
        onChange: (v) => {

          setControls({
            ...controls,
            scaleMaximum: v
          })
          handleControlPadUpdate({
            ...controls,
            scaleMaximum: v
          })


        }
      },
      constant: {
        value: controls.scaleConstant,
        min: 0.1,
        max: 1,
        step: 0.01,
        onChange: (v) => {

          setControls({
            ...controls,
            scaleConstant: v
          })
          handleControlPadUpdate({
            ...controls,
            scaleConstant: v
          })


        }
      },
      base: {
        value: controls.scaleBase,
        min: 1,
        max: 10,
        step: 1,
        onChange: (v) => {

          setControls({
            ...controls,
            scaleBase: v
          })
          // console.log('the controls value is ', controls)
          handleControlPadUpdate({
            ...controls,
            scaleBase: v
          })


        }
      }
    }),
    camera: folder({
      fov: {
        value: 75,
        min: 10,
        max: 100,
        step: .5,
        onChange: (v) => {

          setControls({
            ...controls,
            cameraFieldOfView: v
          })
          // console.log('the controls value is ', controls)
          handleControlPadUpdate({
            ...controls,
            cameraFieldOfView: v
          })


        }
      },
      perspective: {
        value: true,
        onChange: (v) => {

          setControls({
            ...controls,
            cameraPerspective: v
          })
          // console.log('the controls value is ', controls)
          handleControlPadUpdate({
            ...controls,
            cameraPerspective: v
          })
        }
      },
      // x: {
      //   value: 75,
      //   min: 10,
      //   max: 100,
      //   step: .5,
      //   onChange: (v) => {

      //     setControls({
      //       ...controls,
      //       cameraX: v
      //     })
      //     // console.log('the controls value is ', controls)
      //     handleControlPadUpdate({
      //       ...controls,
      //       cameraX: v
      //     })
      //   }
      // },
      // y: {
      //   value: 75,
      //   min: 10,
      //   max: 100,
      //   step: .5,
      //   onChange: (v) => {

      //     setControls({
      //       ...controls,
      //       cameraY: v
      //     })
      //     // console.log('the controls value is ', controls)
      //     handleControlPadUpdate({
      //       ...controls,
      //       cameraY: v
      //     })
      //   }
      // },
      // z: {
      //   value: 75,
      //   min: 10,
      //   max: 100,
      //   step: .5,
      //   onChange: (v) => {

      //     setControls({
      //       ...controls,
      //       cameraZ: v
      //     })
      //     // console.log('the controls value is ', controls)
      //     handleControlPadUpdate({
      //       ...controls,
      //       cameraZ: v
      //     })
      //   }
      // },
      placement: {
        value: [100,100,100],
        x: {
          step: 100
        },
        y: {
          step: 100
        },
        z: {
          step: 100
        },
        onChange: (v) => {
          // console.log('camera placement changed', v[0], v[1], v[2])
          handleControlPadUpdate({
            ...controls,
            cameraX: v[0],
            cameraY: v[1],
            cameraZ: v[2]
          })
        }

      }
    }),
    renderer: folder({
      shadows: true
    })


  })

  return (
   <mesh></mesh>
  )
}

function OrreryCamera({ scaleConfig = {}, scenePlanets = [], ...props}) {
  // configure farness and nearness of camera
  // TODO - take into consideration bodies farther than the planets (moons, asteroids, comets, etc)
  const {
    gl: { domElement },
    camera,

  } = useThree();

  const ref = React.useRef()
  const far = (planets) => {
    const axis = scenePlanets.map((planet) => planet.semimajorAxis)
    const max = Math.max(...axis)
    return max
  }
  const near = (planets) => {
    const axis = scenePlanets.map((planet) => planet.semimajorAxis)
    const min = Math.min(...axis)
    return min
  }
  const perspectiveCamera = new THREE.PerspectiveCamera(
    scaleConfig.cameraFieldOfView,
    window.innerWidth / window.innerHeight,
    near(scenePlanets),
    far(scenePlanets)

  )
  // const orthographicCamera = new THREE.OrthographicCamera(

  // )
  const sceneCamera = scaleConfig?.cameraPerspective
    ? (
      <group>
        <cameraHelper args={[perspectiveCamera]}/>
        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          ref={ref}
          camera={camera}
        />

      </group>
    )
    : (
      <group>
        <cameraHelper args={[perspectiveCamera]}/>
        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          ref={ref}
          camera={camera}
          // args={[threeCam, gl.domElement]}
        />

      </group>

    )
  return sceneCamera
}

function OrreryPlanets({ scaleConfig, orreryStars = [], handleGalaxyUpdate, ...props}) {
  const [requestBodies, setRequestBodies] = React.useState([])
  const [scenePlanets, setScenePlanets] = React.useState([])
  const [scaledScenePlanets, setScaledScenePlanets ] = React.useState([])
  const ref = React.useRef()
  React.useEffect(() => {
    if (scenePlanets.length === 0) {
      console.log('scene planets is empty')
      fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        // get the data from API and store it in state
        const json = response.json();
        return json;
      })
      // on a succesful response, set the state
      .then((json) => {
        const { bodies } = json
        setRequestBodies([
          requestBodies,
          ...bodies
        ])
        const allBodies = new CelestialBodies({ bodies: [...bodies] });
        const planets = allBodies.planets();
        console.log('visible-planets', planets)
        const scaler = scaleTool.getTransormationFunction({type: scaleConfig.scaler})
        const scaledPlanets = scaler({
          bodies: planets,
          rangeMinimum: scaleConfig.scaleMinimum,
          rangeMaximum: scaleConfig.scaleMaximum,
          constant: scaleConfig.scaleConstant,
          base: scaleConfig.scaleBase
        })
        // console.log('scaled: ', scaledPlanets)


        handleGalaxyUpdate('planets', planets, scaledPlanets)
        setScaledScenePlanets([
          ...scaledPlanets
        ])
        setScenePlanets([
          ...planets
        ])
        return bodies
      })
      .then((bodies) => {
        console.log('request bodies: ', requestBodies)
      })
    } else {
      // console.log('not remaking request as planets already exist')

      const bodies = requestBodies
      const allBodies = new CelestialBodies({ bodies: [...bodies] });
      const planets = allBodies.planets();


      const scaler = scaleTool.getTransormationFunction({type: scaleConfig.scaler})
      const scaledPlanets = scaler({
        bodies: planets,
        rangeMinimum: scaleConfig.scaleMinimum,
        rangeMaximum: scaleConfig.scaleMaximum,
        constant: scaleConfig.scaleConstant,
        base: scaleConfig.scaleBase
      })
      // console.log('planet-scale-update', scaledPlanets)
      handleGalaxyUpdate('planets', planets, scaledPlanets)
      setScaledScenePlanets([
        ...scaledPlanets
      ])

    }

  }, [scenePlanets, scaledScenePlanets, requestBodies, scaleConfig.scaleMinimum, scaleConfig.scaleMaximum, scaleConfig.scaleBase, scaleConfig.scaleConstant, scaleConfig.scaler, handleGalaxyUpdate])

  const star = orreryStars[0]


  const sceneItems = scaledScenePlanets.map((planet, index) => {

    return (
      <group>

        <Planet
          scale={[1.0, 1.0, 1.0]}
          key={`planet-body-${planet.englishName.toLowerCase()}`}
          userData={{planet}}
          wireFrame={false}
          useSpotLight={false}
          useAmbientLight={true}
          baseColor={'#22803D'}
          meshPositionX={(planet.semimajorAxis + star.equaRadius   ) * (index + 2)}
          meshPositionY={0}
          meshPositionZ={0}
          radius={planet.englishName.toLowerCase() === 'mercury' ? 0.10 : Math.abs(planet.equaRadius)}
          index={index}
        />
        <OrbitPath
          key={`planet-orbit-${planet.englishName.toLowerCase()}`}
          semimajorAxis={(planet.semimajorAxis + star.equaRadius   ) * (index + 2)}
          semiminorAxis={(planet.semiminorAxis + star.equaRadius   ) * (index + 2)}
          inclination={planet.inclination}
          baseColor={'#FFFFFF'}
          index={index}
          thickness={3}
          userData={{
            planet,
            star
          }}
        />
      </group>

    )
  })

  return (
    <group ref={ref}>
      {sceneItems}
    </group>
  )
}

function OrreryStars({ scaleConfig, handleGalaxyUpdate, ...props}) {
  const [sceneStars, setSceneStars] = React.useState([

  ])
  const [scaledSceneStars, setScaledSceneStars ] = React.useState([])
  const ref = React.useRef()
  React.useEffect(() => {
    fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((json) => {
        const { bodies } = json
        const allBodies = new CelestialBodies({ bodies: [...bodies] });
        const stars = allBodies.stars();
        const planets = allBodies.planets();
        const moons = allBodies.moons();
        const scaler = scaleTool.getTransormationFunction({type: scaleConfig.scaler})
        const scaledStars = scaler({
          bodies: [...planets, ...moons, ...stars],
          rangeMinimum: scaleConfig.scaleMinimum,
          rangeMaximum: scaleConfig.scaleMaximum,
          constant: scaleConfig.scaleConstant,
          base: scaleConfig.scaleBase
        })
          .filter((body) => body.bodyType === 'Star')

        handleGalaxyUpdate('stars', stars, scaledStars)
        setScaledSceneStars([
          ...scaledStars
        ])
        setSceneStars([
          ...stars
        ])
      })


  }, [sceneStars, scaleConfig, handleGalaxyUpdate])

    const sceneItems = scaledSceneStars.map((star, index) => {
      return (
        <Star
          // ref={ref}
          key={star.id}
          userData={
            {
              star,
              scaleConfig
            }
          }
          meshPositionX={0}
          meshPositionY={0}
          meshPositionZ={0}
          wireFrame={true}
          useSpotLight={false}
          useAmbientLight={true}
          baseColor={'#f0f0f0'}
          radius={star.equaRadius}
        />
      )
    })
    return (
      <group>
        {sceneItems}
      </group>
    )
}

export class App extends React.Component {
  #defaultScaler = 'log'
  #defaultScale = 0.5
  #defaultBase = 2
  #defaultConstant = 0.1
  #defaultRangeMinimum = 20
  #defaultRangeMaximum = 100
  #defaultNear = .01
  #defaultFar = 100000;
  #defaultPosition = [-5000,-5000,-5000]
  #defaultFov = 175

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      controls: {
        scaler: 'log',
        scaleMinimum: 1,
        scaleMaximum: 1000,
        scaleConstant: 0.1,
        scaleBase: 5,
        cameraFieldOfView: 75,
        cameraPerspective: true,
        cameraX: 100,
        cameraY: 100,
        cameraZ: 100
      },
      scene: {
        aspect: {
          width: window.innerWidth,
          height: window.innerHeight,
          // ratio: window.innerWidth / window.innerHeight
          ratio: 1
        }
      },
      camera: {
        fov: this?.props?.camera?.fov || this.#defaultFov,
        near: this?.props?.camera?.near || this.#defaultNear,
        far: this?.props?.camera?.far || this.#defaultFar,
        position: this?.props?.camera?.position || this.#defaultPosition
      },
      shadows: this?.props.shadows || true,
      transformation: {
        scaler: this?.props.transformation?.scaler || this.#defaultScaler,
        scale: this?.props.transformation?.scale || this.#defaultScale,
        base: this?.props.transformation?.base || this.#defaultBase,
        rangeMinimum: this?.props?.transformation?.rangeMinimum || this.#defaultRangeMinimum,
        rangeMaximum: this?.props?.transformation?.rangeMaximum|| this.#defaultRangeMaximum,
        constant: this?.props?.transformation?.constant || this.#defaultConstant
      },
      galaxy: {
        pristene: {
          stars: [],
          planets: [],
          dwarfs: [],
          moons: [],
          asteroids: [],
          comets: [],
        },
        scaled: {
          stars: [],
          planets: [],
          dwarfs: [],
          moons: [],
          asteroids: [],
          comets: [],
        }
      }
    };
    this.handleControlPadUpdate = this.handleControlPadUpdate.bind(this)
    this.handleGalaxyUpdate = this.handleGalaxyUpdate.bind(this)
    this.calculateCameraFarness = this.calculateCameraFarness.bind(this)
    this.calculateCameraNearness = this.calculateCameraNearness.bind(this)
  }

  // TODO: research if alternatives for this pattern.
  componentDidMount() {
    // deprecated for now

  }

  calculateCameraNearness() {
    const planets = this.state.galaxy.scaled.planets
    const axis = planets.map((planet) => planet.semimajorAxis)
    const minAxis = Math.min(...axis)
    console.log('nearest planet', minAxis)
    return minAxis
  }

  calculateCameraFarness() {
    const planets = this.state.galaxy.scaled.planets
    const axis = planets.map((planet) => planet.semimajorAxis)
    const maxAxis = Math.max(...axis)
    console.log('farthest planet', maxAxis)
    return maxAxis
  }



  handleGalaxyUpdate(type, pristene, scaled) {
    // console.log('galaxy-updates', {type, pristene, scaled})
    this.setState((state) => ({
      ...state,
      galaxy: {
        ...state.galaxy,
        pristene: {
          ...state.galaxy.pristene,
          [type]: [
            ...pristene
          ]
        },
        scaled: {
          ...state.galaxy.scaled,
          [type]: [
            ...scaled
          ]
        }
      }
    }))
  }

  handleControlPadUpdate(controls) {
    console.log('control-pad-updates', controls)
    this.setState((state) => ({
      ...state,
      controls,

    }));
  }

  camera() {
    return new THREE.PerspectiveCamera(
      this.state.controls.cameraFieldOfView,
      window.innerWidth / window.innerHeight,
      this.state.camera.near,
      this.state.camera.far
    );
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            // height: '1vh'
            }}
        >

          <Canvas
            dpr={window.devicePixelRatio}
          >
            {/* render a control ui  */}

          </Canvas>
        </div>
        <div style={{
          width: '100vw',
          height: '100vh',
        }}>
          <Canvas
            dpr={window.devicePixelRatio}
            camera={{
              position: [
                this.state.controls.cameraX,
                this.state.controls.cameraY,
                this.state.controls.cameraZ
              ],
              fov: this.state.controls.cameraFieldOfView,
              // near: this.calculateCameraNearness(),
              // far: 1000
            }}
          >
            <React.Suspense>
              <OrreryCamera scaleConfig={this.state.controls} scenePlanets={this.state.galaxy.scaled.planets}/>
              <OrreryControlPad
                handleControlPadUpdate={this.handleControlPadUpdate}

                scaleConfig={this.state.controls}
                {...this.props}

              />

              <primitive object={new THREE.AxesHelper(10)} />
              <color attach='background' args={['#15151a']} />
              <fog attach='fog' args={['#202030', 10, 25]} />
              <hemisphereLight intensity={0.2} color='#eaeaea' groundColor='blue' />

              <Stars
                radius={1000}
                depth={100}
                count={15000}
                factor={4}
                saturation={1}
                fade
                speed={1}
              />


                <Physics>




                  {/* render our sun - sol/soleil */}
                  <OrreryStars scaleConfig={this.state.controls} handleGalaxyUpdate={this.handleGalaxyUpdate}  {...this.props}/>

                  {/* render the planets */}
                  <OrreryPlanets scaleConfig={this.state.controls} handleGalaxyUpdate={this.handleGalaxyUpdate} orreryStars={this.state.galaxy.scaled.stars} {...this.props}/>


                </Physics>

              {/* <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}

              /> */}
            </React.Suspense>

            {/* <Sphere/> */}
          </Canvas>
        </div>
      </div>

    );
  }
}
