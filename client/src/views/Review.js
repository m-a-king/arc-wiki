import * as React from 'react';
import { Box } from '@mui/material';
import { StarBorder, Notes } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import ReviewInfo from '../components/product/ReviewInfo';
import Comments from "../components/product/Comments";

export default function Review() {
  return (
    <Box sx={{ flex: 1 }}>
      {/* Title */}
      <ViewTitle IconComponent={StarBorder} title="리뷰 상세" />

      {/* Review info */}
      <ReviewInfo />

      {/* Title */}
      <ViewTitle IconComponent={Notes} title="리뷰 댓글" />

      {/* Comments */}
      <Comments />
    </Box>
  );
}