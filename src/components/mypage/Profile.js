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
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >        
        {/* Form */}
        <Box component="form" noValidate autocomplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Id */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="id"
                label="Id"
                name="id"
                inputProps={{ maxLength: 50 }}
                value={formData.id}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.id}
                helperText={submitted && formError.id && 'Id is required'}
                InputProps={{
                  readOnly: !editMode,
                }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} style={{ display: editMode ? 'block' : 'none' }}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
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
                inputProps={{ maxLength: 50 }}
                value={formData.name}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.name}
                helperText={submitted && formError.name && 'Name is required'}
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
                label="Nickname"
                name="nickname"
                inputProps={{ maxLength: 50 }}
                value={formData.nickname}
                onChange={handleChange}
                onBlur={validateForm}
                error={submitted && formError.nickname}
                helperText={submitted && formError.nickname && 'Nickname is required'}
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
                label="Email Address"
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
                    ? 'Email is required'
                    : !isValidEmail(formData.email) && 'Invalid email address')
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
                Cancel
              </Button>

              {/* Submit */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Edit
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
                Edit
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
        message="Edit success"
        autoHideDuration={500}
        key={'snackbar'}
      />
    </Container>
  );
}