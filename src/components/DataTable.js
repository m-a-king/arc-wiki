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

function CustomToolbar({
  rows,
  selectedRows,
  setRows,
  useDelete,
  useAdd,
  openModal,
}) {
  const del = () => {
    const newRows = rows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setRows(newRows);
    console.log("Delete", selectedRows);
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
            disabled={selectedRows.length === 0}
          >
          Delete 
          </Button>
        )}
        
        {/* Add */}
        {useAdd && (
          <Button
            startIcon={<InsertDriveFileOutlined />}
            onClick={openModal}
          >
          Add 
          </Button>
        )}
      </Box>
    </GridToolbarContainer>
  );
}

export default function DataTable({
  columns,
  rows,
  setRows,
  useDelete,
  useAdd,
  openModal
}) {
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
          sorting: {
            sortModel: [{ field: 'createDate', sort: 'desc' }],
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
            rows,
            selectedRows,
            setRows,
            useDelete,
            useAdd,
            openModal,
          },
        }}
        checkboxSelection={useDelete}
        disableRowSelectionOnClick={!useDelete}
        density="comfortable"
      />
    </div>
  );
}