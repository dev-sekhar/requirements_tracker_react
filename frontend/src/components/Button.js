import React from 'react';
import { Button as MuiButton } from '@mui/material';
import styles from './styles/Button.module.css';

const Button = ({ children, variant = 'primary', onClick, className, ...props }) => {
  // Determine which style class to use based on variant
  const getButtonClass = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'primary':
      default:
        return styles.buttonPrimary;
    }
  };

  return (
    <MuiButton 
      className={`${styles.button} ${getButtonClass()} ${className || ''}`}
      onClick={onClick}
      disableElevation
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
