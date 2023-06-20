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
      field: 'idx',
      headerName: '번호',
      flex: 1,
      filterable: false,
      cellClassName: 'custom-hide-cell',
    },
    {
      field: 'colors',
      headerName: '색상',
      flex: 1,
      filterable: false,
      cellClassName: 'custom-colors-cell',
      renderCell: (params) => (
        <ItemTabs
          colors={params.value}
          mainWidth={240}
          subWidth={35}
        />
      ),
    },
    {
      field: 'title',
      headerName: '제품명',
      flex: 1,
      cellClassName: 'custom-title-cell',
      renderCell: (params) => (
        <Box>
          {/* Title */}
          <Button
            href={`/product/${params.row.idx}`}
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
      headerName: '가격',
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
        <ViewTitle IconComponent={ShoppingCartOutlined} title="제품 목록" />
        
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
          title="제품 등록"
        />
      </Box>
    )}</Observer>
  );
}