import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import DataTable from '../DataTable';
import RequestModal from '../modal/RequestModal';

export default function Requests() {
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
      field: 'requestTitle',
      headerName: 'Request title',
      flex: 2,
      renderCell: (params) => (
        <Button
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
      field: 'state',
      headerName: 'State',
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: 
            params.value === 'REJECT'
              ? 'red'
              : params.value === 'ACCEPT'
              ? 'green'
              : 'inherit',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'createDate',
      headerName: 'Create date',
    },
  ];
  
  const [rows, setRows] = useState([
    { id: 1, productName: 'Snow', requestTitle: 'Jon', state: 'READY', createDate: '2023-06-10' },
    { id: 2, productName: 'Lannister', requestTitle: 'Cersei', state: 'READY', createDate: '2023-06-10' },
    { id: 3, productName: 'Lannister', requestTitle: 'Jaime', state: 'REJECT', createDate: '2023-06-10' },
    { id: 4, productName: 'Stark', requestTitle: 'Arya', state: 'REJECT', createDate: '2023-06-10' },
    { id: 5, productName: 'Targaryen', requestTitle: 'Daenerys', state: 'ACCEPT', createDate: '2023-06-10' },
    { id: 6, productName: 'Melisandre', requestTitle: 'making', state: 'ACCEPT', createDate: '2023-06-10' },
    { id: 7, productName: 'Clifford', requestTitle: 'Ferrara', state: 'READY', createDate: '2023-06-10' },
    { id: 8, productName: 'Frances', requestTitle: 'Rossini', state: 'READY', createDate: '2023-06-10' },
    { id: 9, productName: 'Roxie', requestTitle: 'Harvey', state: 'READY', createDate: '2023-06-10' },
  ]);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  
  return (
    <Box sx={{ py: 8 }}>
      <DataTable
        columns={columns}
        rows={rows}
        setRows={setRows}
        useDelete={false}
        useAdd={true}
        openModal={openModal}
      />
      <RequestModal
        open={open}
        onClose={closeModal}
        title="Modal Title"
      />
    </Box>
  );
}