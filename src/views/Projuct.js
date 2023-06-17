import * as React from 'react';
import { Box } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import ProductInfo from '../components/ProductInfo';
import Reviews from "../components/mypage/Reviews";

export default function Product() {
  return (
    <Box sx={{ flex: 1 }}>
      {/* Title */}
      <ViewTitle IconComponent={ShoppingCartOutlined} title="상품 상세" />

      {/* Product info */}
      <ProductInfo />

      {/* Reviews */}
      <Reviews />
    </Box>
  );
}