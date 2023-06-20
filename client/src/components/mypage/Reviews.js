import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Rating,
  Typography,
} from '@mui/material'
import DataTable from '../table/DataTable';
import Stores from '../../stores';
import HTTP from '../../apiClient';

export default function Reviews() {
  const { authStore } = Stores();

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
      const response = authStore.isAdmin() ? await HTTP.get('/api/reviews') : await HTTP.get('/api/mypage/reviews', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  }, [authStore]);

  // mounted
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

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