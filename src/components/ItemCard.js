import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import ItemTabs from './ItemTabs';
import { Button, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

export default function ItemCard({ item }) {
  const [scrap, setScrap] = useState(item.scrap);

  const handleScrapToggle = () => {
    setScrap(!scrap);
  };

  return (
    <Card
      variant=""
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Images */}
      <ItemTabs item={item} />

      <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
        {/* Title */}
        <Button href="/product" variant="text" color="inherit" size="small">
          {item.title}
        </Button>

        {/* Scrap */}
        <IconButton onClick={handleScrapToggle}>
          {scrap ? (
            <FavoriteIcon sx={{ color: pink[500] }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: pink[500] }} />
          )}
        </IconButton>

        {/* Price */}
        <Typography variant="caption" display="block" gutterBottom>
          {item.price}
        </Typography>
      </CardContent>
    </Card>
  );
}