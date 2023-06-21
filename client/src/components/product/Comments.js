import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
} from '@mui/material';
import DataTable from '../table/DataTable';
import CommentModal from '../modal/CommentModal';
import HTTP from '../../apiClient';

export default function Comments() {
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
      field: 'content',
      headerName: '댓글',
      flex: 1,
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
  
  const fetchComments = useCallback(async () => {
    try {
      const response = await HTTP.get(`/api/comments/${idx}`);
      setRows(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  }, [idx]);

  // mounted
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Define initial open state
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    fetchComments();
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
      <CommentModal
        open={open}
        onClose={closeModal}
        title="댓글 등록"
      />
    </Box>
  );
}