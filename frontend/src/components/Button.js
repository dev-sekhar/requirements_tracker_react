import React from 'react';
import { Button as MuiButton, useTheme } from '@mui/material';

const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <MuiButton
      variant={variant}
      color={color}
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 120,
        px: 3,
        py: 1,
        ...(variant === 'contained' && {
          backgroundColor: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
          color: theme.palette.mode === 'dark' ? '#000' : '#fff',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#9fa8da' : '#3f3d6d',
          },
        }),
        ...(variant === 'outlined' && {
          borderColor: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
          color: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
          '&:hover': {
            borderColor: theme.palette.mode === 'dark' ? '#9fa8da' : '#3f3d6d',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(121, 134, 203, 0.04)' : 'rgba(15, 13, 70, 0.04)',
          },
        }),
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
