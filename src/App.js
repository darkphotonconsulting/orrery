
import React from 'react'
import {  Canvas } from '@react-three/fiber'

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
      fov: 75,
      near: 0.1,
      far: 1000,
      position: [0, 0, 5],
      shadows: true,
    }
  }

  render() {
    return (
      <Canvas
        camera={
          {
            fov: this.state.fov,
            near: this.state.near,
            far: this.state.far,
            position: this.state.position,
            shadows: this.state.shadows,
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
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sphere
            baseColor={'hotpink'}
            wireFrame={true}
            useSpotLight={true}
            useAmbientLight={true}

          />
          {/* <Environment preset="sunset" background /> */}
          <OrbitControls/>
      </React.Suspense>


        {/* <Sphere/> */}
      </Canvas>
    )
  }
}

// createRoot(document.getElementById('root')).render(<App/>)
