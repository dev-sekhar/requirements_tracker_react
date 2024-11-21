import React from 'react';
import { Alert, Box, styled } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles/ErrorMessage.module.css';
import classNames from 'classnames';

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.95rem',
  padding: theme.spacing(1.5, 2),
  animation: 'slideIn 0.3s ease-out',
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    padding: theme.spacing(1.25, 1.75),
  },
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const ErrorMessage = ({ message, severity = 'error', sx = {} }) => {
  if (!message) return null;

  return (
    <MessageContainer sx={sx}>
      <StyledAlert severity={severity}>
        {message}
      </StyledAlert>
    </MessageContainer>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  sx: PropTypes.object
};

export default ErrorMessage; 