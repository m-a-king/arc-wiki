import * as React from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';

export default function FindId() {
  const [submitted, setSubmitted] = useState(false);
  const [foundId, setFoundId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [formError, setFormError] = React.useState({
    name: false,
    email: false,
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

      const foundId = 'user123';
      setFoundId(foundId);

      console.log({
        ...formData,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Title */}
      <ViewTitle IconComponent={LockOutlined} title="Find id" />

      {foundId ? (
        <>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              {/* Found id */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Your ID has been found"
                  value={foundId}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            
            {/* Controll */}
            <Grid container sx={{ mt: 2 }}>
              {/* Forgot password */}
              <Grid item xs>
                <Link href="/findpw" variant="body2">
                  Forgot password
                </Link>
              </Grid>

              {/* Sign in */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already know an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
        ) : (
        <>
          {/* Form */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            </Grid>
              
            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Find id
            </Button>
            
            {/* Controll */}
            <Grid container>
              {/* Forgot password */}
              <Grid item xs>
                <Link href="/findpw" variant="body2">
                  Forgot password
                </Link>
              </Grid>

              {/* Sign in */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already know an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
}