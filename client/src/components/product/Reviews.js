import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Rating,
  Typography,
} from '@mui/material';
import DataTable from '../table/DataTable';
import ReviewModal from '../modal/ReviewModal';
import HTTP from '../../apiClient';

export default function Reviews() {
  const { idx } = useParams();

  // Define initial columns state
  const columns = [
    {
      field: 'idx',
      headerName: '번호',
      width: 50,
      filterable: false,
    },
    {
      field: 'image',
      headerName: '이미지',
      width: 120,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title}
          loading="lazy"
          style={{ width: `100px` }}
        />
      ),
    },
    {
      field: 'title',
      headerName: '리뷰',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Title */}
          <Button
            href={`/review/${params.row.idx}`}
            variant="text"
            color="primary"
            size="small"
            sx={{ width: 'fit-content' }}
          >
            {params.value}
          </Button>
          
          {/* Content */}
          <Typography variant="caption" sx={{ pl: '0.25rem', pb: '0.25rem' }}>
            { params.row.content }
          </Typography>
        </Box>
      ),
    },
    {
      field: 'rating',
      headerName: '별점',
      width: 116,
      renderCell: (params) => {
        const rating = Number(params.value);
        return <Rating value={rating} size="small" readOnly />
      },
    },
    {
      field: 'user',
      headerName: '작성자',
      renderCell: (params) => (
        <Typography variant="body2">{params.value.nickname}</Typography>
      ),
    },
    {
      field: 'createDate',
      headerName: '등록일',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.getFullYear()
          + '-' + (date.getMonth() + 1)
          + '-' + date.getDate();
      },
    },
  ];
  
  // Define initial rows state
  const [rows, setRows] = useState([]);
  
  const fetchReviews = useCallback(async () => {
    try {
      // 1. 리뷰 정보 가져오기
      const response = await HTTP.get(`/api/reviews/${idx}`);
      setRows(response.data);
    } catch (error) {
      console.error(error);
      // 2. 에러 응답의 에러 메시지를 알림으로 표시
      alert(error.response.data.error);
    }
  }, [idx]);

  // mounted
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Define initial open state
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    fetchReviews();
  };
  
  return (
    <Box>
      <DataTable
        columns={columns}
        rows={rows}
        setRows={setRows}
        useDelete={false}
        useAdd={true}
        openModal={openModal}
      />
      
      {/* Modal */}
      <ReviewModal
        open={open}
        onClose={closeModal}
        title="리뷰 등록"
      />
    </Box>
  );
}