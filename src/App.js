import React from 'react';
// import { useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { CelestialBodies } from './lib/data/CelestialBodies.js';
import { CelestialBodyScaler } from './lib/tools/Scalers.js';
import {
  // OrthographicCamera,
  // PerspectiveCamera,
  // BakeShadows,
  // ContactShadows,
  // Environment,
  OrbitControls,
  // Effects,
  Stars,
  // Text,
} from '@react-three/drei';
import {
  Physics,
  // usePlane,
  // useBox
} from "@react-three/cannon";
import * as THREE from 'three';

import './styles.css';

import { Star, Planet } from './lib/components/Sphere.jsx';

export class App extends React.Component {
  #defaultScaler = 'linear'
  #defaultScale = 0.5
  #defaultBase = 2
  #defaultConstant = 0.1
  #defaultRangeMinimum = 20
  #defaultRangeMaximum = 100
  #defaultNear = 10
  #defaultFar = 10000
  #defaultPosition = [300,300,10]
  #defaultFov = 55

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      scene: {
        aspect: {
          width: window.innerWidth,
          height: window.innerHeight,
          ratio: window.innerWidth / window.innerHeight
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
  }

  // TODO: research if alternatives for this pattern.
  componentDidMount() {
    fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then(async (json) => {
        const { bodies } = json;
        const galaxyTool = new CelestialBodies({ bodies });
        const scaleTool = new CelestialBodyScaler();
        // const galaxy = galaxyTool.list();
        const planets = await galaxyTool.planets()
        console.log(planets)
        const stars = await galaxyTool.stars()
        const dwarfs = await galaxyTool.dwarfs()
        const moons = await galaxyTool.moons()
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
      <div style={{
        width: '100%',
        height: '100%',
      }}>
      <Canvas
        dpr={[1,2]}
      >
        <React.Suspense>
          {/* <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={1.0} radius={1} />
        </Effects> */}
          <color attach='background' args={['#15151a']} />
          <fog attach='fog' args={['#202030', 10, 25]} />
          <hemisphereLight intensity={0.2} color='#eaeaea' groundColor='blue' />
          {/* <perspectiveCamera

        /> */}
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
              {(() => {
                if (this.state?.galaxy?.scaled?.stars?.length > 0) {
                  const sol = this.state.galaxy.scaled.stars.find(
                    (body) => body.bodyType === 'Star'
                  );
                  console.log('using sun data: ', sol);
                  return (
                    <Star
                      scale={[1.0, 1.0, 1.0]}
                      // baseColor={'hotpink'}
                      userData={sol}
                      wireFrame={false}
                      useSpotLight={false}
                      useAmbientLight={true}
                      baseColor={'#f0f0f0'}
                      // wireFrame={true}
                      // useSpotLight={true}
                      // useAmbientLight={true}
                      meshPositionX={0}
                      meshPositionY={0}
                      meshPositionZ={0}
                      radius={sol.equaRadius * 0.55}
                      // radius={10}
                    />
                  );
                }
              })()}
              {/* render the planets */}

              {
                this.state.galaxy.scaled.planets ?
                this.state.galaxy.scaled.planets
                  .filter((planet) => planet.bodyType === 'Planet')
                  .map((planet, index) => {
                  return (
                    <Planet
                    scale={[1.0, 1.0, 1.0]}
                    key={`planet-${index}`}
                    userData={planet}
                    wireFrame={false}
                    useSpotLight={false}
                    useAmbientLight={true}
                    baseColor={'#802222'}
                    meshPositionX={planet.semimajorAxis }
                    meshPositionY={planet.semiminorAxis }
                    meshPositionZ={0}
                    radius={planet.equaRadius}
                    />
                  )
                })
                : null
              }

            </Physics>
          <OrbitControls />
        </React.Suspense>

        {/* <Sphere/> */}
      </Canvas>
      </div>
    );
  }
}

// createRoot(document.getElementById('root')).render(<App/>)
