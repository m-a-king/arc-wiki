import * as React from 'react';
import {
  Box,
  Container,
  Link,
  Typography,
} from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
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
          py: 3,
          px: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
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