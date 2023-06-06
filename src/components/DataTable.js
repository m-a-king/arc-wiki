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

export default function DataTable({ columns, rows, useDelete, useAdd }) {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
        density="comfortable"
        checkboxSelection
      />
    </div>
  );
}