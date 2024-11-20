import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles/SearchField.module.css';

const SearchField = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  size = "small",
  fullWidth = false,
  ...props
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      fullWidth={fullWidth}
      className={`${styles.searchField} ${className}`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className={styles.searchIcon} />
          </InputAdornment>
        ),
        className: styles.searchInput
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: '#0F0D46',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0F0D46',
          }
        }
      }}
      {...props}
    />
  );
};

export default SearchField; 