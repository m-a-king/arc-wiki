import * as React from 'react';
import { Box } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import Scraps from "../components/mypage/Scraps";

export default function Products() {

  return (
    <Box sx={{ flex: 1 }}>
      {/* Title */}
      <ViewTitle IconComponent={ShoppingCartOutlined} title="상품 목록" />
      
      {/* Scraps */}
      <Scraps />
    </Box>
  );
}