import * as React from 'react';
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import DataTable from '../table/DataTable';
import HTTP from '../../apiClient';

export default function Comments() {  
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
          href={`/product/${params.row.review.product.idx}`}
          variant="text"
          color="primary"
          size="small"
          sx={{ width: 'fit-content' }}
        >
          {params.row.review.product.title}
        </Button>
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
            href={`/review/${params.row.review.idx}`}
            variant="text"
            color="primary"
            size="small"
            sx={{ width: 'fit-content' }}
          >
            {params.row.review.title}
          </Button>
        </Box>
      ),
    },
    {
      field: 'content',
      headerName: '댓글',
      flex: 2,
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
  
  const fetchComments = async () => {
    try {
      const response = await HTTP.get('/api/comments');
      setRows(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  // mounted
  useEffect(() => {
    fetchComments();
  }, []);

  const deleteRows = async (selectedRows) => {
    try {
      const response = await HTTP.delete('/api/comments', {
        data: {
          idxs: selectedRows
        }
      });
      
      if (response.status === 200) {
        fetchComments();
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