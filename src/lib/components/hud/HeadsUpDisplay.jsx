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
  BugReport,
  QueryStatsRounded,
  FullscreenRounded,
  FullscreenExitRounded,
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
  // const defaultHeight = 100
  const hudRef = React.useRef(null)
  const [
    width,
    setWidth
  ] = React.useState(0)
  const [
    height,
    setHeight
  ] = React.useState()


  const [ isFullscreen, setIsFullscreen ] = React.useState(false)

  const handleFullScreen = (event) => {
    console.log('toggling hud')
    if (isFullscreen) {
      hudRef.current.style.height = '10vh'
    } else {
      hudRef.current.style.height = '30vh'
    }
    setIsFullscreen(!isFullscreen)


  }


  return (
    <Stack
      id={'hud'}
      direction={'row'}
      ref={hudRef}
      style={{
        height: `15vh`,
        padding: '1px',

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
              <Stack>
                <Box
                id={'hud-chip-bar'}
                >
                  {/*
                  TODO: remove the test element on completion of the HUD component(s)
                  */}


                  <Tooltip
                    title={'Go To DarkPhoton.com'}
                  >
                    <IconButton>
                      <img
                          src={'/images/logo.png'}
                          alt={'logo'}
                          height={50}
                          width={50}

                        />
                    </IconButton>
                  </Tooltip>


                  <Tooltip
                    title={'Stats'}
                  >
                    <IconButton>
                      <QueryStatsRounded />
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
              </Stack>


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
            <Stack>
              <Box
              id={'hud-chip-bar'}
              >


                <Tooltip
                    title={'Go To DarkPhoton.com'}
                >
                  <IconButton>
                    <img
                        src={'/images/logo.png'}
                        alt={'logo'}
                        height={50}
                        width={50}

                      />
                  </IconButton>
                </Tooltip>
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
            </Stack>


          </Slide>

        )
      }




    </Stack>

  )
}