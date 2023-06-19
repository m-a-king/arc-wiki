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
          삭제 
          </Button>
        )}
        
        {/* Add */}
        {useAdd && (
          <Button
            startIcon={<InsertDriveFileOutlined />}
            onClick={openModal}
          >
          등록 
          </Button>
        )}
      </Box>
    </GridToolbarContainer>
  );
}

export default function ProductTable({
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
        className='custom-data-grid'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
          sorting: {
            sortModel: [{ field: 'createDate', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[25]}
        getRowId={(row) => row.idx}
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
        sx={{
          '& .MuiDataGrid-cell': {
            p: 0,
          },
        }}
      />
    </div>
  );
}