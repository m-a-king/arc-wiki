import * as React from 'react';
import {
  Box,
  Toolbar,
 } from '@mui/material';
import Logo from '../components/header/Logo';
import StepperNavigation from '../components/header/StepperNavigation';
import SearchField from '../components/header/SearchField';
import ControlButtons from '../components/header/ControlButtons';

export default function Header() {
  return (
    <header>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          minHeight: 115,
          bgcolor: 'rgba(0, 0, 0, .5)',
          color: 'common.white',
        }}
      >
        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <Logo />
        </Box>

        {/* Stepper */}
        <StepperNavigation />

        {/* Control */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
            textAlign: 'right',
          }}
        >
          {/* Search field */}
          <SearchField />

          {/* SignUp, SignIn, MyPage, Logout */}
          <ControlButtons />
        </Box>
      </Toolbar>
    </header>
  );
}