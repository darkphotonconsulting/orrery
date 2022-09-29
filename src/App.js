import React from 'react';
import * as THREE from 'three';

import './styles.css';

// theme
// import * as Colors from '@mui/material/colors'
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material'



// format
import {
  Stack,
  Box
} from '@mui/material'

// transitions
import {
  Grow
} from '@mui/material'

/* TODO: investigate usage of StyledEngineProvider
  import {
    StyledEngineProvider
  } from '@mui/material/styles';
*/

// three-Fiber
import {
  Canvas,
} from '@react-three/fiber';

import {
  Loader,
} from '@react-three/drei';

/* TODO: use physics engine where appropriate
  import {
    Physics,
  } from "@react-three/cannon";
*/

/* data classes */
import {
  CelestialBodies
} from './lib/data/CelestialBodies.js';

import {
  CelestialBodyScaler
} from './lib/tools/Scalers.js';

/* functional components */
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

import {
  Menu
} from './lib/components/hud/Menu.jsx'

import {
  Details
} from './lib/components/hud/Details.jsx'

import {
  PlanetGroup
} from './lib/components/objects/PlanetGroup.jsx'

import {
  StarGroup
} from './lib/components/objects/StarGroup.jsx'





export function App({ ...props}) {
  const theme = createTheme({
    palette: {

      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    components: {

    }
  })
  console.log({
    event: 'set-theme',
    theme
  })
  const canvasRef = React.useRef(null)
  const sceneContainerRef = React.useRef(null)
  const detailsPanelRef = React.useRef(null)
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
      type: 'linear',
      min: 25,
      max: 100,
      base: 10,
      constant: 0.1
    },
    scene: {
      rotations: true,
      orbits: true,
      paths: true,
    }
  })
  const [activeBodies, setActiveBodies] = React.useState([

  ])
  const [ detailsPanelExpanded, setDetailsPanelExpanded ] = React.useState(false)

  const handleDetailsPanelExpanded = (event, expanded) => {


    setDetailsPanelExpanded(expanded)
    if (expanded) {

      console.log({
        event: 'show-details-panel',
        expanded,
        detailsPanelRef
      })

      detailsPanelRef.current.style.width = '100vw'
      detailsPanelRef.current.style.height = '20vh'
      detailsPanelRef.current.style.opacity = 1
      sceneContainerRef.current.style.height = '80vh'


    } else {
      console.log({
        event: 'hide-details-panel',
        expanded,
        detailsPanelRef
      })

      detailsPanelRef.current.style.width = '0'
      detailsPanelRef.current.style.height = '0'
      sceneContainerRef.current.style.height = '100vh'

    }

  }
  React.useEffect(() => {
    /* only request data if we need to */
    if (celestialBodies.length === 0) {
      fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
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

    /*
      👹 ATTENTION: the dependencies array is important here
        - elint warnings are ignored because we want to run this effect with these dependencies only
      ref: https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ controls, galaxy])


  const near = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    const min = Math.min(...axes)
    console.log({
      event: 'calculate-minimum-distance',
      min,
      max: Math.max(...axes)

    })
    return min
  }

  const far = (galaxy, types = ['Planet']) => {
    const bodies = Object.values(galaxy)
      .flat()
      .filter((body) => types.includes(body.bodyType))
    const axes = bodies.map((body) => body.semimajorAxis)
    const max = Math.max(...axes)
    console.log({
      event: 'calculate-maximum-distance',
      max,
      min: Math.min(...axes)

    })
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
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Stack
                direction="column"
                id={'orrery'}
              >

                {/*
                Menu Bar
                */}
                <Box
                  id={'headerContainer'}
                >

                    <Menu
                      id={'menuComponent'}
                      controls={controls}
                      galaxy={galaxy}
                      scaledGalaxy={scaledGalaxy}
                      activeBodies={activeBodies}
                      detailsPanelRef={detailsPanelRef}
                      setDetailsPanelExpanded={setDetailsPanelExpanded}
                      detailsPanelExpanded={detailsPanelExpanded}
                      handleDetailsPanelExpanded={handleDetailsPanelExpanded}
                      theme={theme}
                    />
                </Box>

                {/* Canvas (three-js) */}
                <Box
                  id={'canvasContainer'}
                  ref={sceneContainerRef}
                  style={{
                    /*
                    👨🏻‍🔧 -
                    the height is based on the value of the `detailsExpanded` state variable
                    */

                    width: '100vw',
                    height: '100vh',
                    flexGrow: 1,
                  }}
                >
                  {/* ThreeJS-Fiber Canvas */}
                  <>
                    <Canvas
                      id={'canvas'}
                      ref={canvasRef}
                      dpr={window.devicePixelRatio}
                      camera={{
                        position: [
                          10,
                          10,
                          10
                        ],
                        fov: 55,
                        near: 0.1,



                      }}

                    >
                      <React.Suspense fallback={null}>
                        {/*
                          space is "black"
                        */}
                        <color
                          attach='background' args={['#15151a']}
                        />

                        {/*
                          enable/disable mesh-level helpers
                        */}
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

                        {/* Scene Navigation */}
                        <Navigation/>
                        {/* Scene Camera */}
                        <Camera
                          fov={controls.camera.fov}
                        />
                        {/* Scene ControlPad */}
                        <ControlPad
                          setControls={setControls}
                        />
                        {/* Scene Lights (global) */}
                        <Lighting
                          intensity={controls.lighting.intensity}
                          color={controls.lighting.color}
                          ground={controls.lighting.ground}

                        />
                        {/* Scene Background */}
                        <Background
                          radius={500}
                          depth={50}
                          // depth={far(scaledGalaxy) * 10}
                        />
                        {/* Scene Stars */}
                        <StarGroup
                          stars={scaledGalaxy.stars}
                          planets={scaledGalaxy.planets}
                          activeBodies={activeBodies}
                          setActiveBodies={setActiveBodies}
                        />

                        {/* Scene Planets  */}
                        <PlanetGroup
                          planets={scaledGalaxy.planets}
                          stars={scaledGalaxy.stars}
                          showOrbital={controls.scene.paths}
                          animateAxialRotation={controls.scene.rotations}
                          animateOrbitalRotation={controls.scene.orbits}
                          activeBodies={activeBodies}
                          setActiveBodies={setActiveBodies}
                        />
                      </React.Suspense>

                    </Canvas>
                    {/* Load Screen */}
                    <Loader/>

                  </>

                </Box>
                {/* Scene Details */}
                <Grow in={detailsPanelExpanded}>
                  <Box
                    ref={detailsPanelRef}
                    id={'detailsContainer'}
                    width={'100%'}
                    // height={'inherit'}
                    sx={{
                      backgroundColor: 'primary.main',
                      zIndex: 100,
                      flexGrow: 1,
                      width: '100vw',
                      minWidth: '100vw',
                    }}
                  >
                          <Details
                            theme={theme}
                            id={'details'}
                            activeBodies={activeBodies}
                            {...props}
                          />

                  </Box>
                </Grow>

              </Stack>
            </ThemeProvider>
  )
}