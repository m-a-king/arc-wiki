import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ViewTitle({ IconComponent, title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <IconComponent />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </Box>
  );
}