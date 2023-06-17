import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import ItemTabs from '../components/tab/ItemTabs';

export default function ProductInfo() {
  const image = [
    {id: 1, color: 'red', url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'},
    {id: 2, color: 'blue', url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'},
    {id: 3, color: 'green', url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45'},
  ];
  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  return (
    <Box>
      {/* Image */}
      <ItemTabs images={image} />
      
      {/* Information */}
      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.calories}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.fat}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}