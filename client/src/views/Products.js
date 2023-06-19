import * as React from 'react';
import { useState, useEffect } from 'react';
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
import HTTP from '../apiClient';

export default function Products() {
  const { authStore }  = Stores();

  // Define initial columns state
  const columns = [
    {
      field: 'id',
      headerName: 'id',
      flex: 1,
      filterable: false,
      cellClassName: 'custom-hide-cell',
    },
    {
      field: 'colors',
      headerName: 'colors',
      flex: 1,
      filterable: false,
      cellClassName: 'custom-colors-cell',
      renderCell: (params) => <ItemTabs colors={params.value} />,
    },
    {
      field: 'title',
      headerName: 'title',
      flex: 1,
      cellClassName: 'custom-title-cell',
      renderCell: (params) => (
        <Box>
          {/* Title */}
          <Button
            href="/product"
            variant="text"
            color="primary"
            size="small"
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
      cellClassName: 'custom-price-cell',
      renderCell: (params) => (
        <Box>
          {new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(parseFloat(params.value))}
        </Box>
      ),
    },
  ];

  // Define initial rows state
  const [rows, setRows] = useState([]);

  // mounted
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await HTTP.get('/api/products');
      setRows(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  // Define initial open state
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    fetchProducts();
  };

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