import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Rating,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import CommonModal from './CommonModal';
import Stores from '../../stores';
import HTTP from '../../apiClient';

export default function ProductModal({
  open,
  onClose,
  title,
}) { 
  const { authStore } = Stores();
  const { idx } = useParams();

  const [submitted, setSubmitted] = useState(false);
  
  // Define initial form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0,
    image: '',
  });
  
  // Define form error state
  const [formError, setFormError] = useState({
    title: false,
    content: false,
    rating: false,
    image: false,
  });
  
  // Function to handle form close
  useEffect(() => {
    setFormData({
      title: '',
      content: '',
      rating: 0,
      image: '',
    });
    
    setSubmitted(false);
  }, [onClose]);

  // Function to handle form change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};

    for (const field in formData) {   
      if (field === 'rating') continue;

      if (!formData[field]) {
        errors[field] = true;
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submit
  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);

      try {
        const form = new FormData();
        
        form.append('productIdx', idx);
        form.append('title', formData.title);
        form.append('content', formData.content);
        form.append('rating', formData.rating);
        form.append('image', formData.image);
  
        const response = await HTTP.post('/api/review', form, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        onClose();
        
      } catch (error) {
        console.error(error);
        alert(error.response.data.error);
      }
    }
  };

  return (
    <CommonModal
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      title={title}
    >  
      {/* form */}
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {/* title */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                  제목
                  <span style={{ marginLeft: '.25rem', color: 'red' }}>*</span>
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="제목"
                    name="title"
                    inputProps={{ maxLength: 50 }}
                    onChange={handleChange}
                    onBlur={validateForm}
                    error={submitted && formError.title}
                    helperText={submitted && formError.title && '제목은 필수항목 입니다.'}
                  />
                </TableCell>
              </TableRow>

              {/* content */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                  내용
                  <span style={{ marginLeft: '.25rem', color: 'red' }}>*</span>
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={5}
                    id="content"
                    label="내용"
                    name="content"
                    inputProps={{ maxLength: 500 }}
                    onChange={handleChange}
                    onBlur={validateForm}
                    error={submitted && formError.content}
                    helperText={submitted && formError.content && '내용은 필수항목 입니다.'}
                  />
                </TableCell>
              </TableRow>

              {/* content */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                  별점
                </TableCell>
                <TableCell>
                  <Rating
                    name="rating"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>

              {/* content */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                  이미지
                  <span style={{ marginLeft: '.25rem', color: 'red' }}>*</span>
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    fullWidth
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    onBlur={validateForm}
                    error={submitted && formError.image}
                    helperText={submitted && formError.image && '이미지는 필수항목 입니다.'}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </CommonModal>
  );
}