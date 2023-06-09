import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  Star,
  StarBorder,
  StarHalf,
} from '@mui/icons-material';
import DataTable from '../DataTable';

export default function Reviews() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      filterable: false,
    },
    {
      field: 'reviewImage',
      headerName: 'Review image',
      flex: 1,
      filterable: false,
      renderCell: (params) => 
        <img
          src={`${params.value}?w=100&fit=crop&auto=format`}
          srcSet={`${params.value}?w=100&fit=crop&auto=format&dpr=2 2x`}
          alt={params.row.reviewTitle}
          loading="lazy"
        />,
    },
    {
      field: 'productName',
      headerName: 'Product name',
      flex: 1,
    },
    {
      field: 'reviewTitle',
      headerName: 'Review title',
      flex: 2,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Title */}
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
          
          {/* Content */}
          <Typography variant="caption">
            { params.row.reviewContent }
          </Typography>
        </Box>
      ),
    },
    {
      field: 'reviewScore',
      headerName: 'Review score',
      renderCell: (params) => {
        const reviewScore = params.value;
        const fullStars = Math.floor(reviewScore);
        const halfStar = reviewScore % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        return (
          <Box>
            {[...Array(fullStars)].map((x, i) =>
              <Star key={i} sx={{ fontSize: 15 }} />
            )}
            {halfStar === 1 &&
              <StarHalf sx={{ fontSize: 15 }} />
            }
            {[...Array(emptyStars)].map((x, i) =>
              <StarBorder key={i} sx={{ fontSize: 15 }} />
            )}
          </Box>
        );
      },
    },
    {
      field: 'createDate',
      headerName: 'Create date',
    },
  ];
  
  const [rows, setRows] = useState([
    { id: 1, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Snow', reviewTitle: 'Snow', reviewContent: 'Jon', reviewScore: 4.5, createDate: '2023-06-10' },
    { id: 2, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Lannister', reviewTitle: 'Lannister', reviewContent: 'Cersei', reviewScore: 5, createDate: '2023-06-10' },
    { id: 3, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Lannister', reviewTitle: 'Lannister', reviewContent: 'Jaime', reviewScore: 4, createDate: '2023-06-10' },
    { id: 4, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Stark', reviewTitle: 'Stark', reviewContent: 'Arya', reviewScore: 4, createDate: '2023-06-10' },
    { id: 5, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Targaryen', reviewTitle: 'Targaryen', reviewContent: 'Daenerys', reviewScore: 3, createDate: '2023-06-10' },
    { id: 6, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Melisandre', reviewTitle: 'Melisandre', reviewContent: 'making', reviewScore: 3, createDate: '2023-06-10' },
    { id: 7, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Clifford', reviewTitle: 'Clifford', reviewContent: 'Ferrara', reviewScore: 2, createDate: '2023-06-10' },
    { id: 8, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Frances', reviewTitle: 'Frances', reviewContent: 'Rossini', reviewScore: 2, createDate: '2023-06-10' },
    { id: 9, reviewImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', productName: 'Roxie', reviewTitle: 'Roxie', reviewContent: 'Harvey', reviewScore: 0, createDate: '2023-06-10' },
  ]);
  
  return (
    <Box sx={{ py: 8 }}>
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