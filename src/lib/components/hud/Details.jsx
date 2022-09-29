import React from 'react';
import {
  Stack,
  Box,
  Paper,
  Typography,
  // Tooltip,
  // IconButton,
} from '@mui/material';

export function Details({
  activeBodies=[]
}) {
  return (
    <Stack
      sx={{
        backgroundColor: 'primary.main',
      }}
    >
      {
        activeBodies.length && activeBodies.length > 0
        ? (
          <Stack
            sx={{
              // backgroundColor: 'primary.main',
            }}
          >
            <Box>
              <Paper>
                <Typography>{activeBodies.length} active</Typography>
              </Paper>

            </Box>

          </Stack>
        )
        : (
          <Box
            sx={{
              // backgroundColor: 'primary.main',
            }}
          >
            <Paper>
              <Typography>0 active</Typography>
            </Paper>
          </Box>
        )
      }
    </Stack>
  )
}