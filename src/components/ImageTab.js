import * as React from 'react';
import Tab from '@mui/material/Tab';

export default function ImageTab(props) {
  const { image } = props;

  return (
    <Tab
      sx={{ minWidth: 0 }}
      {...props}
      label={
        <img
          src={`${image.url}?w=48&fit=crop&auto=format`}
          srcSet={`${image.url}?w=48&fit=crop&auto=format&dpr=2 2x`}
          alt={image.color}
          loading="lazy"
        />
      }
    />
  );
}