import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles/Label.module.css';
import classNames from 'classnames';

const Label = ({ 
  text,
  variant = 'body2',
  color = 'textSecondary',
  required = false,
  disabled = false,
  tooltip,
  className,
  sx = {}
}) => {
  return (
    <Box 
      component="span" 
      className={classNames(
        styles.labelContainer,
        {
          [styles.disabled]: disabled,
          [styles.required]: required
        },
        className
      )}
      title={tooltip}
    >
      <Typography
        variant={variant}
        color={color}
        component="span"
        className={styles.label}
        sx={sx}
      >
        {text}
        {required && <span className={styles.requiredStar}>*</span>}
      </Typography>
    </Box>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2'
  ]),
  color: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  sx: PropTypes.object
};

export default Label; 