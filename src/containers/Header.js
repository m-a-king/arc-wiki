import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Header({ activeStep, selectedSteps }) {
  const steps = ['Collections', 'Product modifiers', 'Product family'];
  const location = useLocation();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { isLoggedIn, logout } = useAuth();

  const handleSearchClick = () => {
    if (openSearch) {
      console.log(searchText);
    }
    setOpenSearch(!openSearch);
  };

  const handleClickAway = () => {
    setOpenSearch(false);
  };

  return (
    <header>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider' 
        }}
      >
        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <Button
            href="/"
            variant="text"
            color="inherit"
            size="small"
          >
            ARC'WIKI
          </Button>
        </Box>

        {/* Stepper */}
        {location.pathname === '/' && (
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              flex: 2,
              maxWidth: 'sm',
              py: 3,
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label + ' (' + selectedSteps[index].length + ')'}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {/* Controll */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            flex: 1,
            textAlign: 'right'
          }}
        >
          {/* Search */}
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Grow in={openSearch}>
                <TextField
                  variant="standard"
                  size="small"
                  label="Search"
                  value={searchText}
                  sx={{ ml: 2 }}
                  onChange={(e) => setSearchText(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Grow>
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </Box>
          </ClickAwayListener>
          
          {isLoggedIn ? (
            <>
              {/* My page */}
              <Button
                href="/mypage"
                variant="text"
                color="inherit"
                size="small"
              >
                My page
              </Button>
              
              {/* Log out */}
              <Button
                variant="text"
                color="inherit"
                size="small"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              {/* Sign up */}
              <Button
                href="/signup"
                variant="text"
                color="inherit"
                size="small"
              >
                Sign up
              </Button>
              
              {/* Sign in */}
              <Button
                href="/signin"
                variant="text"
                color="inherit"
                size="small"
              >
                Sign in
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </header>
  );
}