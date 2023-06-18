import * as React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { Observer } from "mobx-react-lite";
import Stores from '../../stores';

export default function ControlButtons() {
  const { authStore }  = Stores();

  return (
    <Observer>{() => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {authStore.isLoggedIn() ? (
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
              onClick={() => authStore.logout()}
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
    )}</Observer>
  );
}