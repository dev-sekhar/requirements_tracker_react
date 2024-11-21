import React from 'react';
import { TextField as MuiTextField, useTheme } from '@mui/material';
import styles from './styles/TextField.module.css';

const TextField = ({ 
  label,
  name,
  value,
  onChange,
  required = false,
  error = false,
  helperText = '',
  type = 'text',
  className = '',
  ...props
}) => {
  const theme = useTheme();
  
  return (
    <MuiTextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      helperText={helperText}
      type={type}
      fullWidth
      variant="outlined"
      className={`${styles.textField} ${className}`}
      sx={{
        '& .MuiInputBase-input': {
          color: theme.palette.text.primary,
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
          '& fieldset': {
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
          },
        },
        '& .MuiInputLabel-root': {
          color: theme.palette.text.secondary,
        },
      }}
      {...props}
    />
  );
};

export default TextField; 