import * as React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { useAuth } from '../../authContext';

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
            sx={{ ml: 2 }}
          >
            마이페이지
          </Button>

          {/* Log out */}
          <Button
            variant="text"
            color="inherit"
            size="small"
            sx={{ ml: 2 }}
            onClick={() => logout()}
          >
            로그아웃
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
            sx={{ ml: 2 }}
          >
            회원가입
          </Button>

          {/* Sign in */}
          <Button
            href="/signin"
            variant="text"
            color="inherit"
            size="small"
            sx={{ ml: 2 }}
          >
            로그인
          </Button>
        </>
      )}
    </Box>
  );
}