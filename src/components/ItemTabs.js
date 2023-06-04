import * as React from 'react';
import { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImageTab from './ImageTab';

export default function ItemTabs({ item }) {
  const [value, setValue] = useState(item.images[0]?.id.toString());

  return (
    <TabContext value={value}>
      {item.images.map((image) => (
        <TabPanel key={image.id} value={image.id.toString()} sx={{ p: 0 }}>
          <img
            src={`${image.url}?w=248&fit=crop&auto=format`}
            srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={image.color}
            loading="lazy"
          />
        </TabPanel>
      ))}

      <TabList
        textColor="inherit"
        indicatorColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(e, newValue) => setValue(newValue)}
      >
        {item.images.map((image) => (
          <ImageTab key={image.id} value={image.id.toString()} image={image} />
        ))}
      </TabList>
    </TabContext>
  );
}