import * as React from 'react';
import { Box } from '@mui/material';
import { ShoppingCartOutlined, StarBorder } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import ProductInfo from '../components/product/ProductInfo';
import Reviews from "../components/product/Reviews";

export default function Product() {
  return (
    <Box sx={{ flex: 1 }}>
      {/* Title */}
      <ViewTitle IconComponent={ShoppingCartOutlined} title="상품 상세" />

      {/* Product info */}
      <ProductInfo />

      {/* Title */}
      <ViewTitle IconComponent={StarBorder} title="상품 리뷰" />

      {/* Reviews */}
      <Reviews />
    </Box>
  );
}