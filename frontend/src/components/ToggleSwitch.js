import React from 'react';
import { 
  FormControlLabel, 
  Switch,
  Box,
  styled 
} from '@mui/material';
import PropTypes from 'prop-types';
import Label from './Label';
import styles from './styles/ToggleSwitch.module.css';

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  '& .MuiFormControlLabel-label': {
    marginRight: theme.spacing(1),
  },
  '&.MuiFormControlLabel-labelPlacementEnd .MuiFormControlLabel-label': {
    marginRight: 0,
    marginLeft: theme.spacing(1),
  },
  '&:hover': {
    opacity: 0.9,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

const ToggleSwitch = ({ 
  checked, 
  onChange, 
  labelOn, 
  labelOff,
  disabled = false,
  size = 'medium',
  color = 'primary',
  placement = 'start',
  className,
  labelVariant = 'body2',
  labelColor = 'textSecondary'
}) => {
  return (
    <Box className={className}>
      <StyledFormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            size={size}
            color={color}
          />
        }
        label={
          <Label
            text={checked ? labelOn : labelOff}
            variant={labelVariant}
            color={labelColor}
            disabled={disabled}
          />
        }
        labelPlacement={placement}
        className={styles.switchControl}
      />
    </Box>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  labelOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  placement: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
  className: PropTypes.string,
  labelVariant: PropTypes.string,
  labelColor: PropTypes.string
};

export default ToggleSwitch; 