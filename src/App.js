import React from 'react';
import * as THREE from 'three';

import './styles.css';

/*
  theme, fonts, colors
*/


import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material'


/*
  📝 Formatting
*/
import {
  Stack,
  Box
} from '@mui/material'

/*
  🎥 animation & transitions
*/
import {
  Grow
} from '@mui/material'

/*
 ✍🏼 typography & iconography
*/
import {
  Typography
} from '@mui/material'

import {
  DragHandleRounded
} from '@mui/icons-material'

/*
  🗝 key components
*/
import {
  IconButton,
  Tooltip
} from '@mui/material'

/*
  TODO: investigate usage of StyledEngineProvider
  import {
    StyledEngineProvider
  } from '@mui/material/styles';
*/

//
import {
  useThree,
  useFrame
} from '@react-three/fiber'
// three-Fiber
import {
  Canvas,
} from '@react-three/fiber';

import {
  Loader,
} from '@react-three/drei';

/* TODO: use the physics engine where appropriate
  import {
    Physics,
  } from "@react-three/cannon";
*/

/*
  📉 data classes
*/

import {
  enhancementData
} from './lib/data/EnhancementData.js'
import {
  CelestialBodies
} from './lib/data/CelestialBodies.js';

import {
  CelestialBodyScaler
} from './lib/tools/Scalers.js';

/*
  🗝 key components
*/
import {
  Navigation
} from './lib/components/scene/meta/Navigation.jsx'

import {
  Lighting
} from './lib/components/scene/meta/Lighting.jsx'

import {
  Background
} from './lib/components/scene/meta/Background.jsx'

import {
  ControlPad
} from './lib/components/scene/meta/ControlPad.jsx'

import {
  Camera
} from './lib/components/scene/meta/Camera.jsx'

import {
  Header
} from './lib/components/hud/Header.jsx'

import {
  Details
} from './lib/components/hud/Details.jsx'

import {
  PlanetGroup
} from './lib/components/objects/PlanetGroup.jsx'

import {
  StarGroup
} from './lib/components/objects/StarGroup.jsx'
// import { FramebufferTexture } from 'three';



function Internals({
  references=[],
  setCanvasScene={},
  canvasScene={},
}) {
  const { scene, gl } = useThree()
  scene.name = 'orrery'
  // gl.gammaOutput = true
  useFrame((state, delta) => {
    if (scene) {
      setCanvasScene(scene)
    }
  })
  console.log({
    event: 'load-internals',
    scene: scene,
    renderer: gl,
    references
  })

  // try using scene object to get nested objects
  //

  // for (const child of scene.children) {
  //   if (child.type === 'Group') {
  //     console.log({
  //       event: 'child-group',
  //       child: child
  //     })
  //   }
  // }
  return null
}

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

  // const { gl, scene } = useThree()
  console.log({
    event: 'app-load',
    time: new Date().toISOString(),
    // gl: gl,
    // scene: scene
  })

  console.log({
    event: 'set-theme',
    ...theme
  })

  /*
  references:
  */

  const canvasRef = React.useRef(null)
  const sceneContainerRef = React.useRef(null)
  const detailsPanelRef = React.useRef(null)
  const cameraRef = React.useRef(null)
  const navigationRef = React.useRef(null)
  // const controlPadRef = React.useRef(null)
  const lightingRef = React.useRef(null)
  const backgroundRef = React.useRef(null)
  const planetGroupRef = React.useRef(null)
  const starGroupRef = React.useRef(null)


  /*
    📀 state
  */
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
      position: [150, 150, 250],
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
      resolution: '4k'
    }
  })
  const [activeBodies, setActiveBodies] = React.useState([

  ])
  const [enhancedData, setEnhancedData] = React.useState({})

  const [ sceneReferenceCatalog, setSceneReferenceCatalog] = React.useState({
    meta: {
      camera: null,
      lighting: null,
      background: null,

    },
    celestialBodies: {
      stars: [],
      planets: [],
    },
  })

  const [ canvasScene, setCanvasScene ] = React.useState({

  })

  const [ detailsPanelExpanded, setDetailsPanelExpanded ] = React.useState(false)
  const [ detailsPanelSize, setDetailsPanelSize ] = React.useState(null)
  const [ canvasPanelSize, setCanvasPanelSize ] = React.useState(null)
  const [ draggablePosition, setDraggablePosition ] = React.useState(null)

  /*
    🛠 handlers
  */
  const handleDetailsPanelExpanded = (event, expanded) => {
    setDetailsPanelExpanded(expanded)
    if (expanded) {
      console.log({
        event: 'show-details-panel',
        expanded,
        detailsPanelRef
      })

      detailsPanelRef.current.style.width = '100vw'
      detailsPanelRef.current.style.height = '200px'
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


  const handleDetailsPanelInitialized = (event) => {
    const canvasContainer = document.getElementById('canvasContainer')
    const detailsContainer = document.getElementById('detailsContainer')
    setDetailsPanelSize(parseInt(detailsContainer.offsetHeight))
    setCanvasPanelSize(parseInt(canvasContainer.offsetHeight))
    setDraggablePosition(parseInt(event.clientY))
    console.log({
      event: 'dragging-details-panel'
    })
  }

  const handleDetailsPanelResize = (event) => {
    const canvasContainer = document.getElementById('canvasContainer')
    const detailsContainer = document.getElementById('detailsContainer')
    console.log({
      event: 'resize-details-panel',
      eventDetails: event,
      clientX: event.clientX,
      clientY: event.clientY,
      canvasHeight:  `${parseInt(canvasPanelSize) + parseInt( event.clientY - draggablePosition)}px`,
      detailsHeight:  `${detailsContainer.style.height}`,
    })

    canvasContainer.style.height = `${parseInt(canvasPanelSize) + parseInt( event.clientY - draggablePosition)}px`
    detailsContainer.style.height = `${parseInt(detailsPanelSize) - parseInt( event.clientY - draggablePosition)}px`
  }

  /* can we useFrame here? */
  // useFrame()
  // useFrame((state, delta) => {
  //   console.log(`winning?`)
  // })
  /* 💡 effects run when state changes */
  React.useEffect(() => {

    if (celestialBodies.length === 0) {
      /*
        fetch celestial bodies from API
      */
      fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((json) => {
        setCelestialBodies(json.bodies)
        setEnhancedData({
          ...enhancedData,
          ...enhancementData
        })
        const galaxyTool = new CelestialBodies({
          bodies: json.bodies,
        })
        /*
         🔪 chop up the data into groups
        */
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
    /*
      💡 scale celestial bodies based on controls state values
    */
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


  /*
    calculate nearness & farness for ThreeJS views and internal calculations
    - this currently does not work as expected
  */
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

  console.log({
    event: 'debug-canvas',
    canvas: canvasRef
  })

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

                    <Header
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
                      colorManagement={true}
                      gl2={true}
                      camera={{
                        position: [
                          10,
                          10,
                          15
                        ],
                        fov: 55,
                        near: 0.01,
                        far: 2000,
                      }}
                      onPointerMissed={(event) => {
                        console.log('pointer missed, clearing active bodies')
                        for (const body of activeBodies) {
                          const meshReference = body.meshRef.current
                          if (meshReference.children && meshReference.children.length > 0) {
                            meshReference.children.find((child) => child.type === 'AxesHelper').visible = false
                          }
                        }
                        setActiveBodies([])
                      }}

                    >
                      <React.Suspense fallback={null}>

                        {/*
                          space is "black"
                        */}
                        <color
                          attach='background' args={['#1E1E20']}
                        />
                        {/* Scene Lights (global) */}
                        <Lighting
                          lightingRef={lightingRef}
                          intensity={controls.lighting.intensity}
                          color={controls.lighting.color}
                          ground={controls.lighting.ground}
                          setSceneReferenceCatalog={setSceneReferenceCatalog}
                          sceneReferenceCatalog={sceneReferenceCatalog}

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

                        {/* Three.JS internals */}
                        <Internals
                          canvasScene={canvasScene}
                          setCanvasScene={setCanvasScene}
                          references={[
                            starGroupRef,
                            planetGroupRef
                          ]}
                        />
                        {/* Scene Navigation */}
                        <Navigation
                          navigationRef={navigationRef}
                          // ref={navigationRef}
                          // setSceneReferenceCatalog={setSceneReferenceCatalog}
                          // sceneReferenceCatalog={sceneReferenceCatalog}
                          activeBodies={activeBodies}
                        />
                        {/* Scene Camera */}
                        <Camera
                          // ref={cameraRef}
                          cameraRef={cameraRef}
                          controls={controls}
                          scaledGalaxy={scaledGalaxy}
                          fov={controls.camera.fov}
                        />
                        {/* Scene ControlPad */}
                        <ControlPad
                          // ref={controlPadRef}
                          setControls={setControls}
                        />

                        {/* Scene Background */}
                        <Background
                          // ref={backgroundRef}
                          backgroundRef={backgroundRef}
                          radius={500}
                          depth={50}
                          controls={controls}
                          scaledGalaxy={scaledGalaxy}
                          // depth={far(scaledGalaxy) * 10}
                        />
                        {/* Scene Stars */}
                        <StarGroup
                          // ref={starGroupRef}
                          starGroupRef={starGroupRef}
                          animateAxialRotation={controls.scene.rotations}
                          stars={scaledGalaxy.stars}
                          planets={scaledGalaxy.planets}
                          enhancements={enhancedData}
                          activeBodies={activeBodies}
                          setActiveBodies={setActiveBodies}
                          controls={controls}
                        />

                        {/* Scene Planets  */}
                        <PlanetGroup
                          // ref={planetGroupRef}
                          planetGroupRef={planetGroupRef}
                          planets={scaledGalaxy.planets}
                          stars={scaledGalaxy.stars}
                          enhancements={enhancedData}
                          showOrbital={controls.scene.paths}
                          animateAxialRotation={controls.scene.rotations}
                          animateOrbitalRotation={controls.scene.orbits}
                          activeBodies={activeBodies}
                          setActiveBodies={setActiveBodies}
                          controls={controls}
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
                    draggable={true}

                    sx={{
                      backgroundColor: 'primary.main',
                      zIndex: 100,
                      flexGrow: 1,
                      width: '100vw',
                      minWidth: '100vw',
                    }}
                  >
                          <Tooltip
                            title={'Resize Details'}
                          >
                            <IconButton
                              id={'resizeDetails'}
                              onClick={(e) => {handleDetailsPanelResize(e)}}
                              draggable={true}
                              onDragStart = {(e) => {handleDetailsPanelInitialized(e)}}
                              onDrag = {(e) => {handleDetailsPanelResize(e)}}
                              sx={{
                                position: 'fixed',
                                margin: 0,
                                left: '50%',
                                cursor: 'row-resize',
                              }}
                            >
                              <DragHandleRounded/>
                            </IconButton>
                          </Tooltip>

                          <Details
                            theme={theme}

                            id={'details'}
                            activeBodies={activeBodies}
                            galaxy={galaxy}
                            scene={canvasScene}
                            {...props}
                          />

                  </Box>
                </Grow>

              </Stack>
            </ThemeProvider>
  )
}