import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
} from '@mui/material';
import DataTable from '../table/DataTable';
import Stores from '../../stores';
import HTTP from '../../apiClient';

export default function Comments() {
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
      // 1. 사용자가 관리자인 경우 모든 댓글을 조회
      //    일반 사용자인 경우 자신의 댓글을 조회
      const response = authStore.isAdmin()
        ? await HTTP.get('/api/comments')
        : await HTTP.get('/api/mypage/comments', {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          });
  
      // 2. 가져온 댓글을 상태 업데이트로 화면에 표시
      setRows(response.data);
    } catch (error) {
      console.error(error);
      // 3. 에러 응답의 에러 메시지를 알림으로 표시
      alert(error.response.data.error);
    }
  }, [authStore]);

  // mounted
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const deleteRows = async (selectedRows) => {
    try {
      // 1. 선택된 댓글 삭제
      const response = await HTTP.delete('/api/comments', {
        data: {
          idxs: selectedRows
        }
      });
      
      // 2. 삭제가 성공하면 댓글 목록을 다시 불러옴
      if (response.status === 200) {
        fetchComments();
      }
    } catch (error) {
      // 3. 오류 발생 시, 오류 메시지를 알림으로 표시
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