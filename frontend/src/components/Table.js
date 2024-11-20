import React, { useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel
} from '@mui/material';
import styles from './styles/Table.module.css';

const Table = ({ data = [], columns = [] }) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  console.log('Table data:', data);
  console.log('Table columns:', columns);

  if (!data || data.length === 0) {
    console.log('No data available');
    return null;
  }

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (data, order, orderBy) => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle date fields
      if (orderBy === 'createdAt' || orderBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue === null) return order === 'asc' ? 1 : -1;
      if (bValue === null) return order === 'asc' ? -1 : 1;

      if (typeof aValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    });
  };

  const sortedData = sortData(data, order, orderBy);

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <MuiTable className={styles.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
                key={column.field}
                className={styles.tableHeader}
                sortDirection={orderBy === column.field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.field}
                  direction={orderBy === column.field ? order : 'asc'}
                  onClick={() => handleSort(column.field)}
                  className={styles.sortLabel}
                >
                  {column.headerName}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow 
              key={index}
              className={styles.tableRow}
              hover
            >
              {columns.map((column) => (
                <TableCell key={`${index}-${column.field}`}>
                  {column.valueGetter ? column.valueGetter(row) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
