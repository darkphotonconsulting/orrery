import React from 'react';
import { Leva } from 'leva'


/*
  📝 Formatting
*/
import {
  Container,
  Box
} from '@mui/material';

/*
 ✍🏼 typography & iconography
*/
import {
  Typography
} from '@mui/material'

import {
  BugReport,
  QueryStatsRounded,
  FullscreenExitRounded,
  FullscreenRounded,
} from '@mui/icons-material'

/*
  🗝 key components
*/
import {
  AppBar,
  Toolbar,
  // Chip,
  Tooltip,
  IconButton,
} from '@mui/material';


/*
TODO: research how to utilize FontAwesome at a project level
*/

export function Header({
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

            <Typography>Orrery</Typography>


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


              <Tooltip
                title={'Stats'}
              >
                <IconButton>
                  <QueryStatsRounded />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={detailsPanelExpanded ? 'Collapse Details' : 'Expand Details'}
              >
                <IconButton onClick={(e) => { handleDetailsPanelExpanded(e, !detailsPanelExpanded) }}>
                  {
                    detailsPanelExpanded ? <FullscreenExitRounded /> : <FullscreenRounded />
                  }

                </IconButton>
              </Tooltip>

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