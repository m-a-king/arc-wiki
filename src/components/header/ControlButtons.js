import * as React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { useAuth } from '../../AuthContext';

export default function ControlButtons() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
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
  );
}