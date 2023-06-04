import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SortingOptions({ selectedOption, onOptionChange }) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="sorting-options-label">Sort</InputLabel>
      <Select
        labelId="sorting-options-label"
        id="sorting-options"
        value={selectedOption}
        onChange={onOptionChange}
        label="Sort"
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="ascending">Price: Low to High</MenuItem>
        <MenuItem value="descending">Price: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
}