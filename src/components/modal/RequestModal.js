import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
} from '@mui/material';
import CommonModal from './CommonModal';

export default function RequestModal({
  open,
  onClose,
  onAddNewRequest,
  title,
}) {  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    requestContent: '',
  });
  const [formError, setFormError] = useState({
    productName: false,
    requestContent: false,
  });
  
  useEffect(() => {
    setSubmitted(false);
    setFormData({ productName: '', requestContent: '' });
  }, [onClose]);

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

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);
      onAddNewRequest(formData);
      onClose();
      
      console.log({
        ...formData,
      });
    }
  };

  return (
    <CommonModal
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      title={title}
    >
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* Product name */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="productName"
              label="Product name"
              name="productName"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.productName}
              helperText={submitted && formError.productName && 'Product name is required'}
            />
          </Grid>

          {/* Request content */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={5}
              id="requestContent"
              label="Request content"
              name="requestContent"
              inputProps={{ maxLength: 500 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.requestContent}
              helperText={submitted && formError.requestContent && 'Request content is required'}
            />
          </Grid>
        </Grid>
      </Box>
    </CommonModal>
  );
}