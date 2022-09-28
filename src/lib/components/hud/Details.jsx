import React from 'react';
import {
  Stack,
  Box,
  // Tooltip,
  // IconButton,
} from '@mui/material';

export function Details({
  activeBodies=[]
}) {
  return (
    <Stack>
      {
        activeBodies.length && activeBodies.length > 0
        ? (
          <Box>{activeBodies.length} active</Box>
        )
        : (
          <Box>none active</Box>
        )
      }
    </Stack>
  )
}