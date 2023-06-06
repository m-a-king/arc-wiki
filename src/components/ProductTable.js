import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {
  DeleteOutline,
  InsertDriveFileOutlined,
} from '@mui/icons-material';

function CustomToolbar({ rows, useDelete, useAdd }) {
  const isDisabled = rows.length === 0;

  const del = () => {
    console.log("Delete", rows);
  };

  const add = () => {
    console.log("Add");
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <GridToolbarFilterButton />
      <Box>

      {/* Delete */}
      {useDelete && (
        <Button
          startIcon={<DeleteOutline />}
          onClick={del}
          disabled={isDisabled}
        >
        Delete 
        </Button>
      )}
      
      {/* Add */}
      {useAdd && (
        <Button
          startIcon={<InsertDriveFileOutlined />}
          onClick={add}
        >
        Add 
        </Button>
      )}
      </Box>
    </GridToolbarContainer>
  );
}

export default function ProductTable({ columns, rows, useDelete, useAdd }) {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        className='custom-data-grid'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(row) => {
          setSelectedRows(row);
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            rows: selectedRows,
            useDelete: useDelete,
            useAdd: useAdd,
          },
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            padding: 0,
          },
        }}
      />
    </div>
  );
}