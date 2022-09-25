import React from 'react';

/*
Colors
*/
import * as Colors from '@mui/material/colors'

/*
Structure
*/
import {
  Stack,
  Box,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';

/*
Transoformations
 */
import {
  Slide
} from '@mui/material';

/*
Icons
*/
import {
  Info,
  BugReport,
  QueryStatsRounded,
  FullscreenRounded,
  FullscreenExitRounded,
  DragHandle,
  Public,
  TouchApp,
  Star,
} from '@mui/icons-material'

/*
TODO: research how to utilize FontAwesome at a project level
*/

export function HeadsUpDisplay({
  controls = {},
  galaxy = [],
  scaledGalaxy = {},
  activeBodies = [],
  ...props
}) {
  const defaultHeight = 100
  const hudRef = React.useRef(null)
  const dragRef = React.useRef(null)
  const [ width, setWidth ] = React.useState(0)
  const [ height, setHeight ] = React.useState()


  const [ isFullscreen, setIsFullscreen ] = React.useState(false)

  const handleFullScreen = (event) => {
    setIsFullscreen(!isFullscreen)
    console.log('toggled hud')
    if (isFullscreen) {
      hudRef.current.style.height = '10vh'
    } else {
      hudRef.current.style.height = '50vh'
    }
  }


  return (
    <Stack
      id={'hud'}
      direction={'row'}
      ref={hudRef}
      style={{
        height: `${height || defaultHeight}px`,
        padding: '25px',

      }}
    >
      {isFullscreen
        ? (

          <Slide
            direction={'right'}
            in={isFullscreen}
            mountOnEnter
            unmountOnExit
            container={hudRef.current}
            >
              <Box
              id={'hud-chip-bar'}
              >
                {/*
                TODO: remove the test element on completion of the HUD component(s)
                */}
                <span>Full Screen</span>

                <IconButton>
                <img
                    src={'/images/logo.png'}
                    alt={'logo'}
                    height={50}
                    width={50}

                  />
                </IconButton>
                <Tooltip
                  title={'General Orrery Info'}
                >
                  <IconButton>
                    <Info />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={'Collapse HUD'}
                >
                  <IconButton onClick={(e) => { handleFullScreen(e) }}>
                    <FullscreenExitRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={'Debug'}
                >
                  <IconButton>
                    <BugReport />
                  </IconButton>
                </Tooltip>





                <Chip
                  icon={<Star/>}
                  label={`stars: ${scaledGalaxy.stars.length}`}
                />
                <Chip
                  icon={<Public/>}
                  label={`planets: ${scaledGalaxy.planets.length}`}
                />
                <Chip
                  icon={<TouchApp/>}
                  label={`active: ${activeBodies.length}`}
                />
              </Box>
          </Slide>

        )
        : (
          <Slide
            direction={'left'}
            in={true}
            mountOnEnter
            unmountOnExit
            container={hudRef.current}
          >
            <Box
            id={'hud-chip-bar'}
            >


              <IconButton>
                <img
                    src={'/images/logo.png'}
                    alt={'logo'}
                    height={50}
                    width={50}

                />
              </IconButton>
              <Tooltip
                title={'Stats'}
              >
                <IconButton>
                  <QueryStatsRounded />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={'Open HUD'}
              >
                <IconButton onClick={(e) => { handleFullScreen(e) }}>
                  <FullscreenRounded />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={'Debug'}
              >
                <IconButton>
                  <BugReport />
                </IconButton>
              </Tooltip>
              <Chip
                icon={<Star/>}
                label={`stars: ${scaledGalaxy.stars.length}`}
              />
              <Chip
                icon={<Public/>}
                label={`planets: ${scaledGalaxy.planets.length}`}
              />
              <Chip
                icon={<TouchApp/>}
                label={`active: ${activeBodies.length}`}
              />
            </Box>
          </Slide>

        )
      }


      <Tooltip
        title={'Drag to resize'}
      >
        <IconButton
            ref={dragRef}
            draggable={true}
            className={'orrery-draggable'}
            id={'hud-drag-handle'}
            size={'small'}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              justifySelf: 'center',
              top: height - 34,
              right: width * 0.5,
              zIndex: 100,
            }}
            sx={{
              position: 'absolute',
              top: height * 0.9,
              right: width * 0.5,
              zIndex: 100,
              color: Colors.grey[900]
            }}
            // onDragStart={dragStartHandler}
            // onDragEnd={dragStopHandler}

          >
            <DragHandle />
        </IconButton>
      </Tooltip>

    </Stack>

  )
}