import React from 'react';
import { Leva } from 'leva'


/*
format
*/
import {
  Container,
  // Stack,
  Box
} from '@mui/material';

/* typography and iconography */
import {
  Typography
} from '@mui/material';

/* key components */
import {
  AppBar,
  Toolbar,
  // Chip,
  Tooltip,
  IconButton,
} from '@mui/material';

/*
transofmrations
 */
// import {
//   Slide
// } from '@mui/material';

/*
Icons
*/
import {
  BugReport,
  QueryStatsRounded,
  FullscreenExitRounded,
  FullscreenRounded,
} from '@mui/icons-material'

/*
TODO: research how to utilize FontAwesome at a project level
*/

export function Menu({
  theme = {},
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

  const hudRef = React.useRef(null)
  const [
    width,
    setWidth
  ] = React.useState(0)
  const [
    height,
    setHeight
  ] = React.useState()




  return (

      <AppBar
        position={'static'}
      >
        <Leva>
          fill={false}
          collapsed={true}
          hideTitleBar={true}
          oneLineLabels={true}
        </Leva>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Home Site */}
            <Typography>Orrery</Typography>

            {/* Controls */}
            <Box>
              <Tooltip
                title={'Website'}
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
                title={detailsPanelExpanded ? 'Collapse Details' : 'Expand Details'}
              >
                <IconButton onClick={(e) => { handleDetailsPanelExpanded(e, !detailsPanelExpanded) }}>
                  {
                    detailsPanelExpanded ? <FullscreenExitRounded /> : <FullscreenRounded />
                  }
                  {/* <FullscreenExitRounded /> */}
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
            </Box>

          </Toolbar>
        </Container>
      </AppBar>



  )
}