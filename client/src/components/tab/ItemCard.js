import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import ItemTabs from './ItemTabs';

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
            <Favorite sx={{ color: pink[500] }} />
          ) : (
            <FavoriteBorder sx={{ color: pink[500] }} />
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