import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import ProductTable from '../ProductTable';
import ItemTabs from '../tab/ItemTabs';

export default function Scraps() {
  const columns = [
    {
      field: 'images',
      headerName: 'images',
      flex: 1,
      filterable: false,
      renderCell: (params) => <ItemTabs images={params.value} />,
    },
    {
      field: 'title',
      headerName: 'title',
      flex: 1,
      renderCell: (params) => (
        <Box>
          {/* Title */}
          <Button
            href="/product"
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
          
          {/* Scrap */}
          <IconButton onClick={() => handleScrapToggle(params.id)}>
            {params.row.scrap ? (
              <Favorite sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorder sx={{ color: pink[500] }} />
            )}
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'scrap',
      headerName: 'scrap',
      flex: 1,
      cellClassName: 'custom-hide-cell',
    },
    {
      field: 'price',
      headerName: 'price',
      flex: 1,
      renderCell: (params) => <Box>{params.value}</Box>,
    },
  ];

  const [rows, setRows] = useState([
    {
      id: 1, title: 'title1', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 2, title: 'title2', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 3, title: 'title3', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 4, title: 'title4', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 5, title: 'title5', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 6, title: 'title6', price: '₩1,000', scrap: true,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 7, title: 'title7', price: '₩1,000', scrap: false,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 8, title: 'title8', price: '₩1,000', scrap: false,
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
  ]);

  const handleScrapToggle = (id) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, scrap: !row.scrap } : row
      )
    );
  };
    
  return (
    <Box>
      <ProductTable
        columns={columns}
        rows={rows}
        useDelete={false}
        useAdd={false}
      />
    </Box>
  );
}