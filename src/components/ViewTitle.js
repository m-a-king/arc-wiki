import * as React from 'react';
import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';

export default function ViewTitle({ IconComponent, title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <IconComponent />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </Box>
  );
}