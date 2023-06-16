import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Toolbar,
 } from '@mui/material';
import Logo from '../components/header/Logo';
import StepperNavigation from '../components/header/StepperNavigation';
import SearchField from '../components/header/SearchField';
import ControlButtons from '../components/header/ControlButtons';

export default function Header({ activeStep, selectedSteps }) {
  const steps = ['Collections', 'Product modifiers', 'Product family'];
  const location = useLocation();

  return (
    <header>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          minHeight: 115,
          backgroundColor: 'rgba(0, 0, 0, .5)',
          color: 'common.white',
        }}
      >
        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <Logo />
        </Box>

        {/* Stepper */}
        {location.pathname === '/' && (
          <StepperNavigation
            steps={steps}
            activeStep={activeStep}
            selectedSteps={selectedSteps}
          />
        )}

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