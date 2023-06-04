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
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

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
      }, 500);

      console.log({
        ...formData,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Title */}
      <ViewTitle IconComponent={LockOutlinedIcon} title="Sign in" />

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
              autoComplete="current-password"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.password}
              helperText={submitted && formError.password && 'Password is required'}
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
          Sign In
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
              Forgot id
            </Link>
          </Grid>

          {/* Forgot password */}
          <Grid item>
            <Link href="/findpw" variant="body2">
              Forgot password
            </Link>
          </Grid>

          {/* Sign up */}
          <Grid item>
            <Link href="/signup" variant="body2">
              Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Sign in success"
        autoHideDuration={500}
        key={'snackbar'}
      />
    </Container>
  );
}