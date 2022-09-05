import React from 'react';
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { CelestialBodies } from './lib/data/CelestialBodies.js';
import { CelestialBodyScaler } from './lib/tools/Scalers.js';
import {
  OrthographicCamera,
  PerspectiveCamera,
  BakeShadows,
  ContactShadows,
  Environment,
  OrbitControls,
  Effects,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

import './styles.css';

import { Sphere, Star, Planet } from './lib/components/Sphere.jsx';

export class App extends React.Component {
  #defaultScaler = 'log'
  #defaultScale = 0.5
  #defaultBase = 2
  #defaultRangeMinimum = 1
  #defaultRangeMaximum = 1000
  #defaultNear = .0001
  #defaultFar = 100000
  #defaultPosition = [0,0,0]
  #defaultFov = 75

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
        // console.log('testBody', bodies[0])
        const galaxyTool = new CelestialBodies({ bodies });
        // console.log('testBody2', galaxyTool.bodies[0])
        const scaleTool = new CelestialBodyScaler();

        if (this.state.transformation.scaler === 'linear') {
          console.log(`using linear scaler`)
          const galaxy = galaxyTool.list();
          const scaledGalaxy = scaleTool.linearTransformation({
            bodies: galaxy,
            rangeMinimum: this.state.transformation.rangeMinimum,
            rangeMaximum: this.state.transformation.rangeMaximum
          });
          this.setState((state) => ({
            ...state,

            galaxy: {
              // bodies,
              pristene: galaxy,
              scaled: scaledGalaxy
            }
          }));
        }

        if (this.state.transformation.scaler === 'sqrt') {
          console.log(`using sqrt scaler`)
          const galaxy = await galaxyTool.list();
          const scaledGalaxy = scaleTool.sqrtTransformation({
            bodies: galaxy,
            rangeMinimum: this.state.transformation.rangeMinimum,
            rangeMaximum: this.state.transformation.rangeMaximum
          });
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: galaxy,
              scaled: scaledGalaxy
            }
          }));
        }

        if (this.state.transformation.scaler === 'log') {
          console.log(`using log scaler`)
          const galaxy = await galaxyTool.list();
          const planets = await galaxyTool.planets();
          const stars = await galaxyTool.stars();
          const scaledGalaxy = scaleTool.logTransformation({
            bodies: galaxy,
            // base: this.state.transformation.base
          });
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: galaxy,
              scaled: scaledGalaxy,
              planets: planets,
              stars: stars
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
            fov={this.state.camera.fov}
            near={this.state.camera.near}
            far={this.state.camera.far}
            aspect={this.state.scene.aspect.ratio}
          >
            {/* render our sun - sol/soleil */}

            {(() => {
              if (this.state?.galaxy?.pristene?.length > 0) {
                const sol = this.state.galaxy.pristene.find(
                  (body) => body.bodyType === 'Star'
                );
                console.log('using sun data: ', sol);
                return (
                  <Star
                    // baseColor={'hotpink'}
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
                    radius={sol.equaRadius * 10**-5}
                    // radius={10}
                  />
                );
              }
            })()}

            {(() => {
              if (this.state?.galaxy?.planets?.length > 0) {

                this.state?.galaxy?.planets.map((planet, index) => {
                  console.log('using planet data: ', planet);
                  return (
                    <Planet
                    key={`planet-${index}`}
                    wireFrame={false}
                    useSpotLight={false}
                    useAmbientLight={true}
                    baseColor={'#f0f0f0'}
                    meshPositionX={25}
                    meshPositionY={0}
                    meshPositionZ={0}
                    radius={planet.equaRadius}
                    />
                  )
                })
              }
            })()}

          </perspectiveCamera>
            {/* render our planets */}

          {/* <Sphere
            baseColor={'hotpink'}
            wireFrame={true}
            useSpotLight={true}
            useAmbientLight={true}

          /> */}
          {/* <Environment preset="sunset" background /> */}
          <OrbitControls />
        </React.Suspense>

        {/* <Sphere/> */}
      </Canvas>
    );
  }
}

// createRoot(document.getElementById('root')).render(<App/>)
