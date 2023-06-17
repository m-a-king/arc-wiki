import * as React from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material';

export default function MyPage() {
  const initialFormData = {
    id: 'making',
    password: '',
    passwordCheck: '',
    name: '조재중',
    nickname: '부재중',
    email: 'making@kumoh.co.kr',
  };
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState({
    id: false,
    password: false,
    passwordCheck: false,
    name: false,
    nickname: false,
    email: false,
  });

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    setSubmitted(false);
    setEditMode(false);
    setFormData(initialFormData);
  };

  const isValidEmail = email => {
    const re = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let errors = {};

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
      }
    }

    if (formData.password && formData.password.length < 8) {
      errors.password = true;
    }

    if (formData.password !== formData.passwordCheck) {
      errors.passwordCheck = true;
    }

    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = true;
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);
      setEditMode(false);
      setSnackbarOpen(true);
      
      setFormData(initialFormData);

      console.log({
        ...formData,
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >        
        {/* Form */}
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                value={formData.id}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.id}
                helperText={submitted && formError.id && '아이디는 필수항목 입니다.'}
                InputProps={{
                  readOnly: !editMode,
                }}
              />
            </Grid>

            {editMode ? (
              <>
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
                    value={formData.password}
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
              </>
            ) : (
              <></>
            )}
            
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                inputProps={{ maxLength: 50 }}
                value={formData.name}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.name}
                helperText={submitted && formError.name && '이름은 필수항목 입니다.'}
                InputProps={{
                  readOnly: !editMode,
                }}
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
                value={formData.nickname}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.nickname}
                helperText={submitted && formError.nickname && '닉네임은 필수항목 입니다.'}
                InputProps={{
                  readOnly: !editMode,
                }}
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
                value={formData.email}
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
                InputProps={{
                  readOnly: !editMode,
                }}
              />
            </Grid>
          </Grid>

          {editMode ? (
            <>
              {/* Cancel */}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancel}
              >
                취소
              </Button>

              {/* Submit */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                변경
              </Button>
            </>
          ) : (
            <>
              {/* Edit */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setEditMode(true)}
              >
                변경
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="프로필 변경에 성공하였습니다."
        autoHideDuration={1000}
        key={'snackbar'}
      />
    </Container>
  );
}