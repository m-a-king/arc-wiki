import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import StepperNavigation from '../components/StepperNavigation';
import Search from '../components/Search';
import ControlButtons from '../components/ControlButtons';

export default function Header({ activeStep, selectedSteps }) {
  const steps = ['Collections', 'Product modifiers', 'Product family'];
  const location = useLocation();

  return (
    <header>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
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
          {/* Search */}
          <Search />

          {/* SignUp, SignIn, MyPage, Logout */}
          <ControlButtons />
        </Box>
      </Toolbar>
    </header>
  );
}