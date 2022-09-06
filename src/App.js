import React from 'react';
import { Leva } from 'leva'
// import { useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { CelestialBodies } from './lib/data/CelestialBodies.js';
import { CelestialBodyScaler } from './lib/tools/Scalers.js';
import {
  OrbitControls,
  Stars,
} from '@react-three/drei';
import {
  Physics,
} from "@react-three/cannon";
import * as THREE from 'three';
import { useControls } from 'leva'
import './styles.css';

import { Star, Planet } from './lib/components/Sphere.jsx';

const scaleTool = new CelestialBodyScaler({

})

function OrreryControlPad({config, handleControlPadUpdate, ...props}) {
  const ref = React.useRef()
  const [ controls, setControls] = React.useState({
    // scaler: 'identity',
    // scaleMinimum: 1,
    // scaleMaximum: 1000,
    // scaleConstant: 0.1,
    // scaleBase: 3,
    // cameraFieldOfView: 75
    ...config

  })
  // console.log('controls', controls)
  // eslint-disable-next-line no-unused-vars
  const { scaler, scaleMinimum, scaleMaximum, scaleConstant, scaleBase } = useControls({
    scaler: {
      value: 'identity',
      options: scaleTool.listTransformations(),
      onChange: (v) => {
        // console.log(v)

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
    scaleMinimum: {
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
    scaleMaximum: {
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
    scaleConstant: {
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
    scaleBase: {
      value: controls.scaleBase,
      min: 1,
      max: 10,
      step: 1,
      onChange: (v) => {

        setControls({
          ...controls,
          scaleBase: v
        })
        console.log('the controls value is ', controls)
        handleControlPadUpdate({
          ...controls,
          scaleBase: v
        })


      }
    }
  })

  // handleControlPadUpdate(controls)

  return (
    <div ref={ref}>an empty div</div>
  )
}

function OrreryPlanets({ scaler = 'log', base = 2, ...props}) {
  const [scenePlanets, setScenePlanets] = React.useState([])
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
        const planets = allBodies.planets();



        setScenePlanets([
          ...planets
        ])
      })
  }, [scenePlanets])


  const sceneItems = scenePlanets.map((planet, index) => {

    return (
      <Planet
        scale={[1.0, 1.0, 1.0]}
        key={`planet-body-${planet.englishName.toLowerCase()}`}
        userData={planet}
        wireFrame={false}
        useSpotLight={false}
        useAmbientLight={true}
        baseColor={'#22803D'}
        meshPositionX={planet.semimajorAxis}
        meshPositionY={planet.semimajorAxis}
        meshPositionZ={0}
        radius={planet.equaRadius}
      />
    )
  })

  return (
    <group ref={ref}>
      {sceneItems}
    </group>
  )
}

function OrreryStars({ scaler = 'log', base = 2, ...props}) {
  const [sceneStars, setSceneStars] = React.useState([

  ])
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

        setSceneStars([
          ...stars
        ])
      })


  }, [sceneStars])

    const sceneItems = sceneStars.map((star, index) => {
      return (
        <Star
          ref={ref}
          key={star.id}
          userData={star}
          meshPositionX={0}
          meshPositionY={0}
          meshPositionZ={0}
          wireFrame={false}
          useSpotLight={false}
          useAmbientLight={true}
          baseColor={'#f0f0f0'}
          radius={10}
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
  #defaultScaler = 'linear'
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
        scaler: 'identity',
        scaleMinimum: 1,
        scaleMaximum: 1000,
        scaleConstant: 0.1,
        scaleBase: 5,
        cameraFieldOfView: 75
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
        pristene: [],
        scaled: []
      }
    };
    this.handleControlPadUpdate = this.handleControlPadUpdate.bind(this)
  }

  // TODO: research if alternatives for this pattern.
  componentDidMount() {
    fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((json) => {
        const { bodies } = json;
        const galaxyTool = new CelestialBodies({ bodies });
        const scaleTool = new CelestialBodyScaler({});
        // const galaxy = galaxyTool.list();
        const planets = galaxyTool.planets()
        console.log(planets)
        const stars = galaxyTool.stars()
        const dwarfs = galaxyTool.dwarfs()
        const moons = galaxyTool.moons()
        if (this.state.transformation.scaler === 'linear') {
          console.log(`using linear scaler`)
          this.setState((state) => ({
            ...state,

            galaxy: {
              pristene: {
                stars,
                planets,
                dwarfs,
                moons,
              },
              scaled: {
                stars: scaleTool.linearTransformation({bodies: [...planets, ...stars]}),
                planets: scaleTool.linearTransformation({bodies: [...stars,...planets]}),
                dwarfs: scaleTool.linearTransformation({bodies: dwarfs}),
                moons: scaleTool.linearTransformation({bodies: moons}),
              }
            }
          }));
        }

        if (this.state.transformation.scaler === 'sqrt') {
          console.log(`using sqrt scaler`)
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: {
                stars,
                planets,
                dwarfs,
                moons,
              },
              scaled: {
                stars: scaleTool.sqrtTransformation({
                  bodies: [...planets, ...stars],
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum
                }),
                planets: scaleTool.sqrtTransformation({
                  bodies: [...stars,...planets],
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum
                }),
                dwarfs: scaleTool.sqrtTransformation({
                  bodies: dwarfs,
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum
                }),
                moons: scaleTool.sqrtTransformation({
                  bodies: moons,
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum
                }),
              }
            }
          }));
        }

        if (this.state.transformation.scaler === 'log') {
          console.log(`using log scaler`)
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: {
                stars,
                planets,
                dwarfs,
                moons,
              },
              scaled: {
                stars: scaleTool.logTransformation({bodies: [...planets,...stars]}).filter((body) => body.bodyType === 'Star'),
                planets: scaleTool.logTransformation({bodies: [...stars,...planets]}).filter((body) => body.bodyType === 'Planet'),
                dwarfs: scaleTool.logTransformation({bodies: dwarfs}).filter((body) => body.bodyType === 'Dwarf Planet'),
                moons: scaleTool.logTransformation({bodies: moons}).filter((body) => body.bodyType === 'Moon'),
              }

            }
          }));
        }

        if (this.state.transformation.scaler === 'bisymmetric') {
          console.log(`using bisymmetric scaler`)
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: {
                stars,
                planets,
                dwarfs,
                moons,
              },
              scaled: {
                stars: scaleTool.bisymmetricTransformation({
                  bodies: [...planets,...stars],
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum,
                  constant: this.state.transformation.constant
                }).filter((body) => body.bodyType === 'Star'),
                planets: scaleTool.bisymmetricTransformation({
                  bodies: [...stars,...planets],
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum,
                  constant: this.state.transformation.constant
                }).filter((body) => body.bodyType === 'Planet'),
                dwarfs: scaleTool.bisymmetricTransformation({
                  bodies: dwarfs,
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum,
                  constant: this.state.transformation.constant
                }).filter((body) => body.bodyType === 'Dwarf Planet'),
                moons: scaleTool.bisymmetricTransformation({
                  bodies: moons,
                  rangeMinimum: this.state.transformation.rangeMinimum,
                  rangeMaximum: this.state.transformation.rangeMaximum,
                  constant: this.state.transformation.constant
                }).filter((body) => body.bodyType === 'Moon'),
              }

            }
          }));
        }
      });
  }

  handleControlPadUpdate(controls) {
    // const settings = event
    console.log('control-pad-updates', controls)
    this.setState((state) => ({
      ...state,
      controls,
      // foo: 'bar'

    }));

  }

  camera() {
    return new THREE.PerspectiveCamera(
      this.state.camera.fov,
      window.innerWidth / window.innerHeight,
      this.state.camera.near,
      this.state.camera.far
    );
  }

  render() {
    // let window
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            // height: '10vh'
            }}
        >
          <OrreryControlPad
            handleControlPadUpdate={this.handleControlPadUpdate}
            // handleControlPadUpdate={(controls) => this.setState({
            //   ...this.state,
            //   controls
            // })}
            config={this.state.controls}
            {...this.props}

          />
          <Canvas
            dpr={[1,2]}
          >
            {/* render a control ui  */}

          </Canvas>
        </div>
        <div style={{
          width: '100vw',
          height: '100vh',
        }}>
          <Canvas
            dpr={[1,2]}
          >
            <React.Suspense>
              <color attach='background' args={['#15151a']} />
              <fog attach='fog' args={['#202030', 10, 25]} />
              <hemisphereLight intensity={0.2} color='#eaeaea' groundColor='blue' />

              <Stars
                radius={500}
                depth={50}
                count={5000}
                factor={4}
                saturation={1}
                fade
                speed={1}
              />
              <perspectiveCamera
                makeDefault
                scale={[1.0, 1.0, 1.0]}
                fov={this.state.camera.fov}
                near={this.state.camera.near}
                far={this.state.camera.far}
                aspect={this.state.scene.aspect.ratio}
              />

                <Physics>




                  {/* render our sun - sol/soleil */}
                  <OrreryStars {...this.props}/>

                  {/* render the planets */}
                  <OrreryPlanets {...this.props}/>


                </Physics>
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minPolarAngle={Math.PI / 3}
              />
            </React.Suspense>

            {/* <Sphere/> */}
          </Canvas>
        </div>
      </div>

    );
  }
}
