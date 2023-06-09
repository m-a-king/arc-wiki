import * as React from 'react';
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Rating,
  Typography,
} from '@mui/material'
import DataTable from '../table/DataTable';
import HTTP from '../../apiClient';

export default function Reviews() {
  // Define initial columns state
  const columns = [
    {
      field: 'idx',
      headerName: '번호',
      width: 50,
      filterable: false,
    },
    {
      field: 'product',
      headerName: '제품',
      flex: 1,
      filterable: false,
      renderCell: (params) => (
        <Button
          href={`/product/${params.value.idx}`}
          variant="text"
          color="primary"
          size="small"
          sx={{ width: 'fit-content' }}
        >
          {params.value.title}
        </Button>
      ),
    },
    {
      field: 'title',
      headerName: '리뷰',
      flex: 3,
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

  const fetchReviews = async () => {
    try {
      const response = await HTTP.get('/api/reviews');
      setRows(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  // mounted
  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteRows = async (selectedRows) => {
    try {
      const response = await HTTP.delete('/api/reviews', {
        data: {
          idxs: selectedRows
        }
      });
      
      if (response.status === 200) {
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  
  return (
    <Box>
      <DataTable
        columns={columns}
        rows={rows}
        setRows={setRows}
        useDelete={true}
        deleteRows={deleteRows}
        useAdd={false}
      />
    </Box>
  );
}