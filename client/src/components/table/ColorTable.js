import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function ColorTable({ rows }) {
  const columns = [
    {
      field: 'id',
      headerName: '번호',
      flex: 1,
      filterable: false,
    },
    {
      field: 'title',
      headerName: '색상',
      flex: 1,
    },
    {
      field: 'image',
      headerName: '이미지',
      flex: 1,
      filterable: false,
      renderCell: (params) => (
        <img
          src={URL.createObjectURL(params.value)}
          alt={params.row.color}
          loading="lazy"
          height="40"
        />
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5]}
    />
  );
}