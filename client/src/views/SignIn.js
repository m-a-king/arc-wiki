import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../authContext';
import ViewTitle from '../components/ViewTitle';

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [formError, setFormError] = React.useState({
    id: false,
    password: false,
  });
  
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errors = {};

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);
      setSnackbarOpen(true);
      
      setTimeout(() => {
        login();
        navigate('/');
      }, 1000);

      console.log({
        ...formData,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Title */}
      <ViewTitle IconComponent={LockOutlined} title="로그인" />

      {/* Form */}
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Id */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.id}
              helperText={submitted && formError.id && '아이디는 필수항목 입니다.'}
            />
          </Grid>
          
          {/* Password */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.password}
              helperText={submitted && formError.password && '비밀번호는 필수항목 입니다.'}
            />
          </Grid>
        </Grid>
        
        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          로그인
        </Button>
        
        {/* Controll */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
          }}
        >
          {/* Forgot id */}
          <Grid item>
            <Link href="/findid" variant="body2">
              아이디 찾기
            </Link>
          </Grid>

          {/* Forgot password */}
          <Grid item>
            <Link href="/findpw" variant="body2">
              비밀번호 찾기
            </Link>
          </Grid>

          {/* Sign up */}
          <Grid item>
            <Link href="/signup" variant="body2">
              회원가입
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="로그인에 성공하였습니다."
        autoHideDuration={1000}
        key={'snackbar'}
      />
    </Container>
  );
}