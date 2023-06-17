import * as React from 'react';
import {
  Box,
  Container,
  Link,
  Typography,
} from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'grey.400' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/m-a-king/arc-wiki">
        arc-wiki
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer>
      <Box
        component="footer"
        sx={{
          bgcolor: 'rgba(0, 0, 0, .5)',
          color: 'common.white',
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body1">
            ARC'WIKI
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </footer>
  );
}