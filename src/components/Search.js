import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function Search() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    if (openSearch) {
      console.log(searchText);
    }
    setOpenSearch(!openSearch);
  };

  const handleClickAway = () => {
    setSearchText('');
    setOpenSearch(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Grow in={openSearch}>
          <TextField
            variant="standard"
            size="small"
            label="Search"
            value={searchText}
            sx={{ ml: 2 }}
            onChange={(e) => setSearchText(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Grow>
        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}