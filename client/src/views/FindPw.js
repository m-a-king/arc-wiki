import * as React from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import ResetPw from '../components/ResetPw';
import HTTP from '../apiClient';

export default function FindPw() {
  const [submitted, setSubmitted] = useState(false);
  const [reset, setReset] = useState(false);
  
  // Define initial form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
  });
  
  // Define form error state
  const [formError, setFormError] = React.useState({
    id: false,
    name: false,
    email: false,
  });
  
  // Function to handle form change
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to check if email is valid
  const isValidEmail = email => {
    const re = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
      }
    }

    // Check email
    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = true;
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
        const response = await HTTP.post('/api/findPw', formData);
        console.log(response.data);
        
        setReset(true);
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {reset ? (
          <>
            <ResetPw id={formData.id} />
          </>
        ) : (
          <>
            {/* Title */}
            <ViewTitle IconComponent={LockOutlined} title="비밀번호 찾기" />

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
                  
                {/* Name */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="이름"
                    name="name"
                    inputProps={{ maxLength: 50 }}
                    onChange={handleChange}
                    onBlur={validateForm}
                    error={submitted && formError.name}
                    helperText={submitted && formError.name && '이름은 필수항목 입니다.'}
                  />
                </Grid>
                  
                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    inputProps={{ maxLength: 100 }}
                    onChange={handleChange}
                    onBlur={validateForm}
                    error={submitted && formError.email}
                    helperText={
                      submitted &&
                      formError.email &&
                      (!formData.email
                        ? '이메일은 필수항목 입니다.'
                        : !isValidEmail(formData.email) && '유효하지 않은 이메일 입니다.')
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
                비밀번호 찾기
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
          </>
        )}
    </Container>
  );
}