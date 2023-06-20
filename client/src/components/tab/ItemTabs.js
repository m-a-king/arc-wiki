import * as React from 'react';
import { useState } from 'react';
import { Tab } from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';

export default function ItemTabs({
  colors,
  mainWidth,
  subWidth,
  value,
  setValue,
}) {
  // Define initial rows state
  const [innerValue, setInnerValue] = useState('0');

  return (
    <TabContext value={value ? value : innerValue}>
      {colors.map((color, index) => (
        <TabPanel key={index} value={index.toString()} sx={{ p: 0 }}>
          <img
            src={color.image}
            alt={color.title}
            loading="lazy"
            style={{ width: `${mainWidth}px` }}
          />
        </TabPanel>
      ))}

      <TabList
        textColor="inherit"
        indicatorColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(e, newValue) => value ? setValue(newValue) : setInnerValue(newValue)}
        sx={{ my: 2 }}
      >
        {colors.map((color, index) => (
          <Tab
            key={index}
            value={index.toString()}
            sx={{ minWidth: 0, p: 1 }}
            label={
              <img
                src={color.image}
                alt={color.title}
                loading="lazy"
                style={{ width: `${subWidth}px` }}
              />
            }
          ></Tab>
        ))}
      </TabList>
    </TabContext>
  );
}