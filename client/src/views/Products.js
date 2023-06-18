import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import ItemTabs from '../components/tab/ItemTabs';
import ProductTable from '../components/table/ProductTable';
import ProductModal from '../components/modal/ProductModal';
import { Observer } from "mobx-react-lite";
import Stores from '../stores';

export default function Products() {
  const { authStore }  = Stores();

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      flex: 1,
      filterable: false,
      cellClassName: 'custom-hide-cell',
    },
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
        </Box>
      ),
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
      id: 1, title: 'title1', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 2, title: 'title2', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 3, title: 'title3', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 4, title: 'title4', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 5, title: 'title5', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 6, title: 'title6', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 7, title: 'title7', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
    {
      id: 8, title: 'title8', price: '₩1,000',
      images: [
        {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
        {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
        {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
      ]
    },
  ]);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Observer>{() => (
      <Box sx={{ flex: 1 }}>
        {/* Title */}
        <ViewTitle IconComponent={ShoppingCartOutlined} title="상품 목록" />
        
        {/* Products */}
        <ProductTable
          columns={columns}
          rows={rows}
          setRows={setRows}
          useDelete={false}
          useAdd={authStore.isAdmin()}
          openModal={openModal}
        />
      
        {/* Modal */}
        <ProductModal
          open={open}
          onClose={closeModal}
          title="상품 등록"
        />
      </Box>
    )}</Observer>
  );
}