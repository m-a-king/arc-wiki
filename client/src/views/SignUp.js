import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import HTTP from '../apiClient';

export default function SignUp() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Define initial form state
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    email: '',
    allowExtraEmails: false,
  });
  
  // Define form error state
  const [formError, setFormError] = useState({
    id: false,
    password: false,
    passwordCheck: false,
    name: false,
    nickname: false,
    email: false,
    allowExtraEmails: false,
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

    // Check password
    if (formData.password && formData.password.length < 8) {
      errors.password = true;
    }

    // Check password confirmation
    if (formData.password !== formData.passwordCheck) {
      errors.passwordCheck = true;
    }

    // Check email
    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = true;
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);
      
      try {
        // 1. '/api/signup' 엔드포인트에 폼 데이터를 전송하여 회원가입 요청
        const response = await HTTP.post('/api/signup', formData);
        console.log(response.data);
      
        // 2. 스낵바를 열고 1초 후에 '/signin' 경로로 이동
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      } catch (error) {
        console.error(error);
        // 3. 에러 응답의 에러 메시지를 알림으로 표시
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Title */}
      <ViewTitle IconComponent={LockOutlined} title="회원가입" />
        
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

          {/* Nickname */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="nickname"
              label="닉네임"
              name="nickname"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.nickname}
              helperText={submitted && formError.nickname && '닉네임은 필수항목 입니다.'}
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

          {/* Acceptance */}
          <Grid item xs={12}>
            <FormControl error={submitted && formError.allowExtraEmails}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="allowExtraEmails"
                    color="primary"
                    onChange={handleChange}
                    onBlur={validateForm}
                  />
                }
                label="개인정보 수집 및 활용에 동의합니다."
              />
              {submitted && formError.allowExtraEmails && (
                <FormHelperText>개인정보 수집 및 활용 동의는 필수항목 입니다.</FormHelperText>
              )}
            </FormControl>
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
          회원가입
        </Button>

        {/* Sign in */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ display: 'inline' }}>
            이미 계정이 있으신가요?
          </Typography>
          <Link href="/signin" variant="body2" sx={{ ml: 1 }}>
            로그인
          </Link>
        </Box>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="회원가입에 성공하였습니다."
        autoHideDuration={1000}
        key={'snackbar'}
      />
    </Container>
  );
}