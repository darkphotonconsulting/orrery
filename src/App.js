
import React from 'react'
import {  Canvas } from '@react-three/fiber'
import { CelestialBodies } from './lib/data/CelestialBodies.js'
import { CelestialBodyScaler } from './lib/tools/Scalers.js'
import {
  OrthographicCamera,
  BakeShadows,
  ContactShadows,
  Environment,
  OrbitControls,
  Effects,
  Stars
} from '@react-three/drei';

import './styles.css'

import { Sphere } from './lib/components/Sphere.jsx'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      camera: {
        fov: 75,
        near: 10,
        far: 100,
        position: [0, 10, 10],
        shadows: true,
      },
      transformation: {
        scaler: 'linear',
        scale: 0.5,
        base: 2,
        rangeMinimum: 1,
        rangeMaximum: 100,
      },
      galaxy: {
        pristene: [],
        scaled: []
      }
    }

  }

  async componentDidMount () {
    fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        const json = response.json()
        return json
      })
      .then(async (json) => {
        const { bodies } = json
        const galaxyTool = new CelestialBodies({ bodies })
        const scaleTool = new CelestialBodyScaler()

        if (this.state.transformation.scaler === 'linear') {
          const galaxy = await galaxyTool.list()
          const scaledGalaxy = scaleTool.linearTransformation({
            bodies: galaxy,
            rangeMinimum: this.state.transformation.rangeMinimum,
            rangeMaximum: this.state.transformation.rangeMaximum
          })
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: galaxy,
              scaled: scaledGalaxy
            }
          }))
        }


        if (this.state.transformation.scaler === 'sqrt') {
          const galaxy = await galaxyTool.list()
          const scaledGalaxy = scaleTool.sqrtTransformation({
            bodies: galaxy,
            rangeMinimum: this.state.transformation.rangeMinimum,
            rangeMaximum: this.state.transformation.rangeMaximum
          })
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: galaxy,
              scaled: scaledGalaxy
            }
          }))
        }

        if (this.state.transformation.scaler === 'log') {
          const galaxy = await galaxyTool.list()
          const scaledGalaxy = scaleTool.logTransformation({
            bodies: galaxy,
            base: this.state.transformation.base
          })
          this.setState((state) => ({
            ...state,
            galaxy: {
              pristene: galaxy,
              scaled: scaledGalaxy
            }
          }))
        }


      })


  }

  render() {
    // const celestial = new CelestialBodies()
    // const planets = await celestial.planets()
    return (
      <Canvas
        // concurrent={true}
        camera={
          {
            fov: this.state.camera.fov,
            near: this.state.camera.near,
            far: this.state.camera.far,
            position: this.state.camera.position,
            shadows: this.state.camera.shadows,
          }
        }
      >
      <React.Suspense>
        {/* <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={1.0} radius={1} />
        </Effects> */}
        <color attach="background" args={['#15151a']} />
        <fog attach="fog" args={['#202030', 10, 25]} />
        <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />
        {/* <perspectiveCamera

        /> */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          {
            (() => {
              if (this.state?.galaxy?.scaled?.length > 0) {
                const sol = this.state.galaxy.scaled.find((body) => body.bodyType === 'Star')
                console.log('using sun data: ',sol)
                return (
                    <Sphere
                    // baseColor={'hotpink'}
                    wireFrame={false}
                    useSpotLight={true}
                    useAmbientLight={true}
                    baseColor={'orange'}
                    // wireFrame={true}
                    // useSpotLight={true}
                    // useAmbientLight={true}
                    meshPositionX={0}
                    meshPositionY={0}
                    meshPositionZ={0}
                    radius={sol.equaRadius / 2}
                  />
                )
              }

            })()
          }
          {/* <Sphere
            baseColor={'hotpink'}
            wireFrame={true}
            useSpotLight={true}
            useAmbientLight={true}

          /> */}
          {/* <Environment preset="sunset" background /> */}
          <OrbitControls/>
      </React.Suspense>


        {/* <Sphere/> */}
      </Canvas>
    )
  }
}

// createRoot(document.getElementById('root')).render(<App/>)
