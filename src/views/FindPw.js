import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Snackbar from '@mui/material/Snackbar';
import TextField from "@mui/material/TextField";
import ViewTitle from '../components/ViewTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function FindPw() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [formError, setFormError] = React.useState({
    id: false,
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
    <Container component="main" maxWidth="xs">
      {/* Title */}
      <ViewTitle IconComponent={LockOutlinedIcon} title="Find password" />
        
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
          Find password
        </Button>
        
        {/* Controll */}
        <Grid container>
          {/* Forgot id */}
          <Grid item xs>
            <Link href="/findid" variant="body2">
              Forgot id
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

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Please check your email"
        autoHideDuration={500}
        key={'snackbar'}
      />
    </Container>
  );
}