import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
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
    content: '',
  });
  
  // Define form error state
  const [formError, setFormError] = useState({
    content: false,
  });
  
  // Function to handle form close
  useEffect(() => {
    setFormData({
      content: '',
    });
    
    setSubmitted(false);
  }, [onClose]);

  // Function to handle form change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to validate form
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

  // Function to handle form submit
  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
  
    if (validateForm()) {
      setSubmitted(false);
  
      try {
        // 1. 폼 데이터에 리뷰 인덱스 추가
        formData.reviewIdx = idx;
  
        // 2. 댓글 생성 요청
        const response = await HTTP.post('/api/comment', formData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        console.log(response.data);
        onClose();
      } catch (error) {
        console.error(error);
        // 3. 에러 응답의 에러 메시지를 알림으로 표시
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
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </CommonModal>
  );
}