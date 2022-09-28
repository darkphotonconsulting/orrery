import React from 'react';
import { Leva } from 'leva'
/*
Colors
*/
import * as Colors from '@mui/material/colors'

/*
Structure
*/
import {
  AppBar,
  Toolbar,
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

export function Menu({
  controls = {},
  galaxy = [],
  scaledGalaxy = {},
  activeBodies = [],
  detailsPanelRef = {},
  setDetailsPanelExpanded = () => {},
  detailsPanelExpanded = false,
  handleDetailsPanelExpanded = () => {},
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


  // const [ isFullscreen, setIsFullscreen ] = React.useState(false)
  // const [ isDetailsPanelOpen, setIsDetailsPanelOpen ] = React.useState(false)

  const handleFullScreen = (event) => {
    setDetailsPanelExpanded(!detailsPanelExpanded)
    console.log('panel height: ', detailsPanelRef.current.style.height)
    console.log('panel state: ', detailsPanelExpanded)
    // if (detailsPanelExpanded) {
    //   detailsPanelRef.current.hidden = false
    //   detailsPanelRef.current.style.height = '100px'
    //   detailsPanelRef.current.style['background-color'] = 'red'
    // } else {
    //   detailsPanelRef.current.hidden = true
    //   detailsPanelRef.current.style.display = 'none'
    //   detailsPanelRef.current.style.height = '0vh'
    // }


    // if (isFullscreen === true) {

    //   hudRef.current.style.height = '30vh'
    //   console.log({
    //     event: 'toggled-hud',
    //     isFullscreen,
    //     hudRef
    //   })
    // } else {
    //   hudRef.current.style.height = '64px'
    //   console.log({
    //     event: 'toggled-hud',
    //     isFullscreen,
    //     hudRef
    //   })
    // }
    // setIsFullscreen(!isFullscreen)
  }

  return (
    <Stack
      id={'hud'}
      direction={'row'}
      ref={hudRef}
      sx={{
        flexGrow: 1,

        padding: '2px',
      }}
    >
      <AppBar
        position={'static'}
        sx={{
          bgcolor: 'grey.900'
        }}
      >
        <Leva>
          fill={false}
          collapsed={true}
          hideTitleBar={true}
          oneLineLabels={true}
        </Leva>
        <Toolbar>
          {/* Home Site */}
          <Tooltip
            title={'DarkPhotonWorks.com'}
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
          {/* Orrery Statistics */}
          <Tooltip
            title={'Stats'}
          >
            <IconButton>
              <QueryStatsRounded />
            </IconButton>
          </Tooltip>
          {/* Toggle FullScreen HUD */}
          <Tooltip
            title={'Collapse HUD'}
          >
            <IconButton onClick={(e) => { handleDetailsPanelExpanded(e, detailsPanelExpanded) }}>
              <FullscreenExitRounded />
            </IconButton>
          </Tooltip>
          {/* Show Debug Messages */}
          <Tooltip
            title={'Debug'}
          >
            <IconButton>
              <BugReport />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

    </Stack>

  )
}