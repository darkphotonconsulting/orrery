import React from 'react';

import {
  Canvas,
} from '@react-three/fiber';
import {
  CelestialBodies
} from './lib/data/CelestialBodies.js';

import {
  CelestialBodyScaler
} from './lib/tools/Scalers.js';

import {
  Loader,
} from '@react-three/drei';

// TODO: incorporate the physics engine proprely
// import {
//   Physics,
// } from "@react-three/cannon";

import * as THREE from 'three';

import './styles.css';

import {
  Star
} from './lib/components/objects/Star.jsx'

import {
  PlanetGroup
} from './lib/components/objects/PlanetGroup.jsx'


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

                  <PlanetGroup
                    planets={scaledGalaxy.planets}
                    stars={scaledGalaxy.stars}
                    showOrbital={true}
                  />
                </React.Suspense>

              </Canvas>
              <Loader/>
            </>
          </div>
        </div>




  )
}