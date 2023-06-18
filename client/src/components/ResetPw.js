import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Snackbar,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import ViewTitle from './ViewTitle';
import HTTP from '../apiClient';

export default function ResetPw({ id }) {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Define initial form state
  const [formData, setFormData] = useState({
    id: id,
    password: '',
    passwordCheck: '',
  });
  
  // Define form error state
  const [formError, setFormError] = React.useState({
    id: false,
    password: false,
    passwordCheck: false,
  });
  
  // Function to handle form change
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
      }
    }

    // Check password
    if (formData.password && formData.password.length < 8) {
      errors.password = true;
    }

    // Check password confirmation
    if (formData.password !== formData.passwordCheck) {
      errors.passwordCheck = true;
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);
      
      try {
        const response = await HTTP.put('/api/findPw', formData);
        console.log(response.data);

        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {/* Title */}
      <ViewTitle IconComponent={LockOutlined} title="비밀번호 재설정" />

      {/* Form */}
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              helperText={
                submitted &&
                formError.password &&
                (!formData.password
                  ? '비밀번호는 필수항목 입니다.'
                  : formData.password.length < 8 && '비밀번호는 영문 기준 8자 이상 입니다.')
              }
            />
          </Grid>

          {/* Password check */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="passwordCheck"
              label="비밀번호 확인"
              type="password"
              id="passwordCheck"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.passwordCheck}
              helperText={
                submitted &&
                formError.passwordCheck &&
                (!formData.passwordCheck
                  ? '비밀번호 확인은 필수항목 입니다.'
                  : formData.password !== formData.passwordCheck && '비밀번호와 일치하지 않습니다.')
              }
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
          비밀번호 재설정
        </Button>
              
        {/* Controll */}
        <Grid container>
          {/* Forgot id */}
          <Grid item xs>
            <Link href="/findid" variant="body2">
              아이디 찾기
            </Link>
          </Grid>

          {/* Sign in */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ display: 'inline' }}>
              이미 계정이 있으신가요?
            </Typography>
            <Link href="/signin" variant="body2" sx={{ ml: 1 }}>
              로그인
            </Link>
          </Box>
        </Grid>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="비밀번호 재설정에 성공하였습니다."
        autoHideDuration={1000}
        key={'snackbar'}
      />
    </>
  );
}