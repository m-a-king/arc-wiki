import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import HTTP from '../../apiClient';

export default function ReviewInfo() {
  const { idx } = useParams();

  // Define initial review state
  const [review, setProduct] = useState({});
  
  const fetchReview = useCallback(async () => {
    try {
      const response = await HTTP.get(`/api/review/${idx}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  }, [idx]);

  // mounted
  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return (
    <Box sx={{ mb: 6 }}>
      {/* Image */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={review.image}
          alt={review.title}
          loading="lazy"
          style={{ maxWidth: `480px` }}
        />
      </Box>

      {/* Information */}
      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table>
          <TableBody>
            {/* title */}
            <TableRow>
              <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                제목
              </TableCell>
              <TableCell>
                {review.title}
              </TableCell>
            </TableRow>

            {/* content */}
            <TableRow>
              <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                내용
              </TableCell>
              <TableCell>
                {review.content}
              </TableCell>
            </TableRow>

            {/* rating */}
            <TableRow>
              <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                별점
              </TableCell>
              <TableCell>
                <Rating value={Number(review.rating)} size="small" readOnly />
              </TableCell>
            </TableRow>

            {/* user */}
            <TableRow>
              <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                작성자
              </TableCell>
              <TableCell>
                {review.user ? review.user.nickname : '-'}
              </TableCell>
            </TableRow>

            {/* create date */}
            <TableRow>
              <TableCell component="th" scope="row" sx={{ width: 120, fontWeight: 'bold' }}>
                작성일
              </TableCell>
              <TableCell>
                {new Date(review.createDate).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}