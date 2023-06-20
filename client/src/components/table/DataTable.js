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
  selectedRows,
  useDelete,
  deleteRows,
  useAdd,
  openModal,
}) {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <GridToolbarFilterButton />
      <Box>
        {/* Delete */}
        {useDelete && (
          <Button
            startIcon={<DeleteOutline />}
            onClick={deleteRows ? () => deleteRows(selectedRows) : null}
            disabled={selectedRows.length === 0}
            sx={{ mr: 1 }}
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

export default function DataTable({
  columns,
  rows,
  setRows,
  useDelete,
  deleteRows,
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
            selectedRows,
            useDelete,
            deleteRows,
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