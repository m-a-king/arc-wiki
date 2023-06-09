import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ViewTitle from '../components/ViewTitle';
import Profile from "../components/mypage/Profile";
import Scraps from "../components/mypage/Scraps";
import Reviews from "../components/mypage/Reviews";
import Comments from "../components/mypage/Comments";
import Requests from "../components/mypage/Requests";

export default function MyPage() {
  const [value, setValue] = useState('1');

  return (
    <Box sx={{ flex: 1, pt: 3 }}>
      {/* Title */}
      <ViewTitle IconComponent={PersonOutlineOutlinedIcon} title="My page" />
      
      {/* Tab */}
      <TabContext value={value}>
        <TabList
          className='custom-tabs'
          textColor="inherit"
          indicatorColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ mt: 3 }}
        >
          <Tab label="Profile" value="1" />
          <Tab label="Scrap" value="2" />
          <Tab label="Review" value="3" />
          <Tab label="Comment" value="4" />
          <Tab label="Request" value="5" />
        </TabList>
        
        {/* Profile */}
        <TabPanel value="1" sx={{ p: 0 }}>
          <Profile />
        </TabPanel>
        
        {/* Scrap */}
        <TabPanel value="2" sx={{ p: 0 }}>
          <Scraps />
        </TabPanel>
        
        {/* Review */}
        <TabPanel value="3" sx={{ p: 0 }}>
          <Reviews />
        </TabPanel>
        
        {/* Comments */}
        <TabPanel value="4" sx={{ p: 0 }}>
          <Comments />
        </TabPanel>
        
        {/* Request */}
        <TabPanel value="5" sx={{ p: 0 }}>
          <Requests />
        </TabPanel>
      </TabContext>
    </Box>
  );
}