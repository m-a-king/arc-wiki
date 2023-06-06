import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchField() {
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
          <Search />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}