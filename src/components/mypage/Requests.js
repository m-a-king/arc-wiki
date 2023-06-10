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
      field: 'requestContent',
      headerName: 'Request content',
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
    { id: 1, productName: 'Snow', requestContent: 'Jon', state: 'READY', createDate: '2023-06-10 00:00:01' },
    { id: 2, productName: 'Lannister', requestContent: 'Cersei', state: 'READY', createDate: '2023-06-10 00:00:02' },
    { id: 3, productName: 'Lannister', requestContent: 'Jaime', state: 'REJECT', createDate: '2023-06-10 00:00:03' },
    { id: 4, productName: 'Stark', requestContent: 'Arya', state: 'REJECT', createDate: '2023-06-10 00:00:04' },
    { id: 5, productName: 'Targaryen', requestContent: 'Daenerys', state: 'ACCEPT', createDate: '2023-06-10 00:00:05' },
    { id: 6, productName: 'Melisandre', requestContent: 'making', state: 'ACCEPT', createDate: '2023-06-10 00:00:06' },
    { id: 7, productName: 'Clifford', requestContent: 'Ferrara', state: 'READY', createDate: '2023-06-10 00:00:07' },
    { id: 8, productName: 'Frances', requestContent: 'Rossini', state: 'READY', createDate: '2023-06-10 00:00:08' },
    { id: 9, productName: 'Roxie', requestContent: 'Harvey', state: 'READY', createDate: '2023-06-10 00:00:09' },
  ]);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleAddNewRequest = (newRequest) => {
    newRequest.id = rows.length + 1;
    newRequest.state = 'READY';
    newRequest.createDate = '2023-06-10 00:00:10';
    setRows((prevRows) => [...prevRows, newRequest]);
  };
  
  return (
    <Box sx={{ py: 8 }}>
      {/* Table */}
      <DataTable
        columns={columns}
        rows={rows}
        setRows={setRows}
        useDelete={false}
        useAdd={true}
        openModal={openModal}
      />

      {/* Modal */}
      <RequestModal
        open={open}
        onClose={closeModal}
        onAddNewRequest={handleAddNewRequest}
        title="Add request"
      />
    </Box>
  );
}