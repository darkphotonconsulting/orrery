import React from 'react';
import * as Colors from '@mui/material/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlanetMoon,
  faPi,
  faLocationCrosshairs,
  faWeightHanging,
  faRocketLaunch,
  faPersonFalling,
} from '@fortawesome/pro-duotone-svg-icons'

import '@fortawesome/fontawesome-pro/css/all.css'
/*
  📝 Formatting
*/
import {
  Stack,
  Box,
  Paper,
} from '@mui/material';


import {
  Typography,
} from '@mui/material';




/*
  🎥 animation & transitions
*/
import {
  // TransitionGroup,
  Slide
} from '@mui/material';

/*
  🗝 key components
*/
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
} from '@mui/material';


function Selections({
  theme = {},
  activeBodies = [],
  galaxy = {},
  scene = {},
}) {

  const [ sceneDetails, setSceneDetails ] = React.useState({
  })

  React.useEffect(() => {

    const collector = {}
    /*
    TODO: resolve `Warning: Maximum update depth exceeded`

    */
    for (const body of activeBodies) {
      const bodyType = body.bodyType.toLowerCase()
      const name = body.englishName.toLowerCase()
      if (!collector[name]) {
        collector[name] = {
          ...body,
          pos: {
            x: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.x,
            z: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.z,
            y: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.y,
          },
          rot: {
            x: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._x,
            z: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._z,
            y: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._y,
          }
        }
      } else {
        collector[name] = {
          ...body,
          pos: {
            x: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.x,
            z: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.z,
            y: scene.getObjectByName(`${bodyType}-mesh-${name}`).position.y,
          },
          rot: {
            x: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._x,
            z: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._z,
            y: scene.getObjectByName(`${bodyType}-mesh-${name}`).rotation._y,
          }
        }
      }
    }
    setSceneDetails(collector)

  }, [scene, activeBodies, sceneDetails])
  return (
  <Stack
    id={'selections'}
    direction={'row'}
    mx={2}
    spacing={4}
    sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'flex-start',
      overflow: 'auto',
      padding: '5px',
    }}
  >

    <Box
      display={'flex'}
    >
      <Paper
        sx={{
          backgroundColor: Colors.grey[900],
        }}
      >
        <List>
          {/*
            TODO: this needs to be installed and imported 🤨, it is not a default component
            <TransitionGroup> */
          }
            {activeBodies.map((body, index) => {
              // console.log('body', body)
              const name = body.englishName.toLowerCase()
              const type = body.bodyType.toLowerCase()
              // const details = sceneDetails[name]
              let pos = {
                x: 0,
                y: 0,
                z: 0,
              }
              let pristene = {}

              if (sceneDetails[name]) {
                pos = sceneDetails[name].pos
              }

              /* display real-world values */
              if (type === 'star') {
                pristene = galaxy.stars.find((star) => star.englishName.toLowerCase() === name)
              }

              if (type === 'planet') {
                pristene = galaxy.planets.find((planet) => planet.englishName.toLowerCase() === name)
              }

              // console.log(pristene)

              return (

                <Slide in={true} key={`transition-slide-${body.englishName.toLowerCase()}`}>
                  <ListItem key={`details-selected-${body.englishName.toLowerCase()}`}>
                    <ListItemText>
                      <Card
                        sx={{
                          backgroundColor: Colors.grey[800],
                          padding: '5px',
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar>
                              <FontAwesomeIcon icon={faPlanetMoon} />
                            </Avatar>
                          }
                          title={body.englishName}
                          subheader={type}
                        />
                        <CardContent>
                          <Stack direction={'row'} spacing={2}>
                            <Box>
                              <Chip
                                icon={<FontAwesomeIcon icon={faPi} />}
                                label={`radius: ${pristene.equaRadius}`}
                              />

                            </Box>
                            <Box>
                              <Chip
                                icon={<FontAwesomeIcon icon={faWeightHanging}/>}
                                label={`mass: ${pristene.massValue * Math.pow(10, pristene.massExponent)} Kg`}
                              />
                            </Box>
                            <Box>
                              <Chip
                                icon={<FontAwesomeIcon icon={faLocationCrosshairs} />}
                                label={`x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)}`}
                              />
                            </Box>
                            <Box>
                              <Chip
                                icon={<FontAwesomeIcon icon={faPersonFalling} />}
                                label={`gravity: ${pristene.gravity}`}
                              />
                            </Box>
                            <Box>
                              <Chip
                                icon={<FontAwesomeIcon icon={faRocketLaunch} />}
                                label={`escape: ${pristene.escape}`}
                              />
                            </Box>

                          </Stack>



                        </CardContent>

                      </Card>
                    </ListItemText>
                  </ListItem>
                </Slide>

              )
            })}
          {/*
            👀 see the TODO above...
            </TransitionGroup>
          */}
        </List>
      </Paper>
    </Box>
  </Stack>
  )

}
export function Details({
  theme={},
  activeBodies=[],
  galaxy = {},
  scene={},
}) {

  return (
    <Stack
      id={'details'}
      direction={'column'}
    >
      <Selections activeBodies={activeBodies} scene={scene} galaxy={galaxy}/>
    </Stack>
  )
}