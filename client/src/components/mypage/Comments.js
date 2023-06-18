import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import DataTable from '../table/DataTable';

export default function Comments() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      filterable: false,
    },
    {
      field: 'productName',
      headerName: 'Product name',
      flex: 1,
    },
    {
      field: 'reviewTitle',
      headerName: 'Review title',
      flex: 1,
      renderCell: (params) => (
        <Button
          href="/review"
          variant="text"
          color="primary"
          size="small"
          sx={{
            minWidth: 0,
            padding: '4px 0',
          }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: 'comment',
      headerName: 'Comment',
      flex: 2,
    },
    {
      field: 'createDate',
      headerName: 'Create date',
      width: 120,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.getFullYear()
          + '-' + (date.getMonth() + 1)
          + '-' + date.getDate();
      },
    },
  ];
  
  const [rows, setRows] = useState([
    { id: 1, productName: 'Snow', reviewTitle: 'Snow', comment: 'Jon', createDate: '2023-06-10 00:00:01' },
    { id: 2, productName: 'Lannister', reviewTitle: 'Lannister', comment: 'Cersei', createDate: '2023-06-10 00:00:02' },
    { id: 3, productName: 'Lannister', reviewTitle: 'Lannister', comment: 'Jaime', createDate: '2023-06-10 00:00:03' },
    { id: 4, productName: 'Stark', reviewTitle: 'Stark', comment: 'Arya', createDate: '2023-06-10 00:00:04' },
    { id: 5, productName: 'Targaryen', reviewTitle: 'Targaryen', comment: 'Daenerys', createDate: '2023-06-10 00:00:05' },
    { id: 6, productName: 'Melisandre', reviewTitle: 'Melisandre', comment: 'making', createDate: '2023-06-10 00:00:06' },
    { id: 7, productName: 'Clifford', reviewTitle: 'Clifford', comment: 'Ferrara', createDate: '2023-06-10 00:00:07' },
    { id: 8, productName: 'Frances', reviewTitle: 'Frances', comment: 'Rossini', createDate: '2023-06-10 00:00:08' },
    { id: 9, productName: 'Roxie', reviewTitle: 'Roxie', comment: 'Harvey', createDate: '2023-06-10 00:00:09' },
  ]);
  
  return (
    <Box>
      <DataTable        
        columns={columns}
        rows={rows}
        setRows={setRows}
        useDelete={true}
        useAdd={false}
      />
    </Box>
  );
}