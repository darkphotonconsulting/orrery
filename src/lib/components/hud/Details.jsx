import React from 'react';

/*
  📝 Formatting
*/
import {
  Stack,
  Box,
  Paper,
} from '@mui/material';

/*
 ✍🏼 typography & iconography
*/
import {
  Typography,
} from '@mui/material';

/* 🎥 animation & transitions */
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
} from '@mui/material';
function Selections({
  theme = {},
  activeBodies = []
}) {
  return (
  <Stack
    id={'selections'}
    direction={'row'}
    mx={2}
    spacing={4}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'flex-start',
      overflow: 'auto',
      padding: '5px',
    }}
  >
    <Paper>
      <Typography>Selections {activeBodies.length}</Typography>
    </Paper>

    <Box
      display={'flex'}
    >
      <Paper>
        <List>
          {/*
            TODO: this needs to be installed and imported 🤨, it is not a default component
            <TransitionGroup> */
          }
            {activeBodies.map((body, index) => {
              return (

                <Slide in={true} key={`transition-slide-${body.englishName.toLowerCase()}`}>
                  <ListItem key={`details-selected-${body.englishName.toLowerCase()}`}>
                    <ListItemText>{body.englishName} - {body.bodyType}</ListItemText>
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
  activeBodies=[]
}) {

  return (
    <Stack
      id={'details'}
    >
      <Selections activeBodies={activeBodies} />
    </Stack>
  )
}