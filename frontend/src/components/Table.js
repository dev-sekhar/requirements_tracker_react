import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Table = ({ data, columns }) => {
  return (
    <StyledTableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
                key={column.field}
                style={{ width: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.id || index}>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.cellRenderer 
                    ? column.cellRenderer(row)  // Call the cellRenderer with the row data
                    : row[column.field]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MuiTable>
    </StyledTableContainer>
  );
};

export default Table;
