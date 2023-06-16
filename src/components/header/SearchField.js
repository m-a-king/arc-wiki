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
          '& .MuiFormLabel-root': {
            color: '#ccc',
            fontSize: '.875rem',
          }
        }}
      >
        <Grow in={openSearch}>
          <TextField
            variant="standard"
            color="secondary"
            size="small"
            label="키워드 검색"
            value={searchText}
            sx={{
              mt: '-0.75rem',
              ml: 2,
              '& .MuiInputBase-root': {
                  color: 'common.white',
                  fontSize: '.875rem',
              },
              '& .MuiInputBase-root:before, & .MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before': {
                  borderBottom: '1px solid #ccc',
              },
            }}
            onChange={(e) => setSearchText(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Grow>
        <IconButton sx={{ ml: 1 }} onClick={handleSearchClick}>
          <Search color="secondary" />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}