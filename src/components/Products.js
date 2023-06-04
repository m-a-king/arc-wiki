import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItemCard from './ItemCard';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import SortingOptions from '../components/SortingOptions';
import { useState } from 'react';

export default function Products() {
  const items = [
    { id: 1, title: 'title1', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 2, title: 'title2', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 3, title: 'title3', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 4, title: 'title4', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 5, title: 'title5', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 6, title: 'title6', price: '₩1,000', scrap: true, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 7, title: 'title7', price: '₩1,000', scrap: false, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
    { id: 8, title: 'title8', price: '₩1,000', scrap: false, images: [
      {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
      {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
      {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
    ]},
  ];
  const [sortOption, setSortOption] = useState('default');
  
  const handleOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Box sx={{ pt: 3, pb: 8 }}>
      {/* Grid info */}
      <Grid container alignItems="end" spacing={2} marginBottom={2}>
        {/* Total */}
        <Grid item>
          <Typography variant="subtitle1" sx={{ mb: 1}}>{items.length} items</Typography>
        </Grid>

        {/* Sort */}
        <Grid item>
          <SortingOptions
            selectedOption={sortOption}
            onOptionChange={handleOptionChange}
          />
        </Grid>
      </Grid>

      {/* Grid */}
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} md={3}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3
        }}
      >
        <Pagination count={3} shape="rounded" />
      </Box>
    </Box>
  );
}