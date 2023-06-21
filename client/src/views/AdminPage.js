import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Tab,
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { PersonOutlineOutlined } from '@mui/icons-material';
import ViewTitle from '../components/ViewTitle';
import Profile from "../components/mypage/Profile";
import Reviews from "../components/adminpage/Reviews";
import Comments from "../components/adminpage/Comments";
import { reaction } from 'mobx';
import Stores from '../stores';

export default function AdminPage() {
  const navigate = useNavigate();
  const { authStore }  = Stores();

  useEffect(() => {
    const dispose = reaction(
      () => authStore.isLoggedIn(),
      (isLoggedIn) => {
        if (!isLoggedIn) {
          navigate("/signin");
        }
      }
    );

    return () => dispose();
  }, [authStore, navigate]);

  const [value, setValue] = useState('1');

  return (
    <Box sx={{ flex: 1 }}>
      {/* Title */}
      <ViewTitle IconComponent={PersonOutlineOutlined} title="관리자 페이지" />
      
      {/* Tab */}
      <TabContext value={value}>
        <TabList
          className='custom-tabs'
          textColor="inherit"
          indicatorColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ mb: 6 }}
        >
          <Tab label="프로필" value="1" />
          <Tab label="리뷰" value="2" />
          <Tab label="댓글" value="3" />
        </TabList>
        
        {/* Profile */}
        <TabPanel value="1" sx={{ p: 0 }}>
          <Profile />
        </TabPanel>
        
        {/* Review */}
        <TabPanel value="2" sx={{ p: 0 }}>
          <Reviews />
        </TabPanel>
        
        {/* Comments */}
        <TabPanel value="3" sx={{ p: 0 }}>
          <Comments />
        </TabPanel>
      </TabContext>
    </Box>
  );
}