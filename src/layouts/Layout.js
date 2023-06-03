import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, Outlet } from "react-router-dom";
import { useState } from 'react';
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Home from '../views/Home';

export default function Layout() {
  const defaultTheme = createTheme();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([[], [], []]);

  const handleCardSelection = (stepIndex, cardId) => {
    const isSelected = selectedSteps[stepIndex].includes(cardId);
  
    if (isSelected) {
      setSelectedSteps(
        selectedSteps.map((step, index) =>
          index === stepIndex ? step.filter((id) => id !== cardId) : step
        )
      );
    } else {
      setSelectedSteps(
        selectedSteps.map((step, index) =>
          index === stepIndex ? [...step, cardId] : step
        )
      );
    }
  };

  const resetSelectedSteps = () => {
    setSelectedSteps((prev) => prev.map(() => []));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header
          activeStep={activeStep}
          selectedSteps={selectedSteps}
        />
        <Container
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
          maxWidth="lg"
        >
          {location.pathname === "/" ? (
            <Home
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              selectedSteps={selectedSteps}
              handleCardSelection={handleCardSelection}
              resetSelectedSteps={resetSelectedSteps}
            />
          ) : (
            <Outlet />
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}