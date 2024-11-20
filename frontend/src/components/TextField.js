import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
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
      InputLabelProps={{
        className: styles.label
      }}
      InputProps={{
        className: styles.input
      }}
      {...props}
    />
  );
};

export default TextField; 