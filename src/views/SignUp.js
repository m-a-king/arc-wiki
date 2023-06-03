import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    nickname: '',
    email: '',
    allowExtraEmails: false,
  });

  const [formError, setFormError] = useState({
    id: false,
    password: false,
    name: false,
    nickname: false,
    email: false,
    allowExtraEmails: false,
  });

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
      setSnackbarOpen(true);
      
      setTimeout(() => {
        navigate('/signin');
      }, 500);
      
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
        {/* Title */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        
        {/* Form */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Id */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="id"
                label="Id"
                name="id"
                autoComplete="given-name"
                inputProps={{ maxLength: 50 }}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.id}
                helperText={submitted && formError.id && 'Id is required'}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{ maxLength: 50 }}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.password}
                helperText={
                  submitted &&
                  formError.password &&
                  (!formData.password
                    ? 'Password is required'
                    : formData.password.length < 8 && 'Password must be at least 8 characters')
                }
              />
            </Grid>

            {/* Name */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="username"
                inputProps={{ maxLength: 50 }}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.name}
                helperText={submitted && formError.name && 'Name is required'}
              />
            </Grid>

            {/* Nickname */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
                inputProps={{ maxLength: 50 }}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.nickname}
                helperText={submitted && formError.nickname && 'Nickname is required'}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputProps={{ maxLength: 100 }}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.email}
                helperText={
                  submitted &&
                  formError.email &&
                  (!formData.email
                    ? 'Email is required'
                    : !isValidEmail(formData.email) && 'Invalid email address')
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
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
              {submitted && formError.allowExtraEmails && (
                <FormHelperText>Acceptance is required</FormHelperText>
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
            Sign Up
          </Button>

          {/* Sign in */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Sign up success"
        autoHideDuration={500}
        key={'snackbar'}
      />
    </Container>
  );
}