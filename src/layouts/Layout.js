import '../assets/Style.scss';
import * as React from 'react';
import { useState } from 'react';
import { useLocation, Outlet } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
 } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Home from '../views/Home';

export default function Layout() {
  const defaultTheme = createTheme({
    typography: {
      fontFamily: [
        'Pretendard',
        '-apple-system',
        'Roboto',
        'sans-serif',
      ].join(','),
      fontSize: 15,
      fontWeightRegular: 200,
      fontWeightBold: 500,
    },
    palette: {
      primary: {
        main: '#000',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fff',
        contrastText: '#000',
      },
      common: {
        white: '#fff',
      },
    },
  });
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
          backgroundImage: 'url(/img/main_banner_left_01_230605.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header
          activeStep={activeStep}
          selectedSteps={selectedSteps}
        />
        <Box
            sx={{
              display: 'flex',
              flex: 1,
              bgcolor: location.pathname === "/mypage" ? 'common.white' : '',
            }}
        >
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
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}