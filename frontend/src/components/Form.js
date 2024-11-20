import React from 'react';
import { 
  Paper, 
  Box 
} from '@mui/material';
import Button from './Button';
import TextField from './TextField';
import styles from './styles/Form.module.css';

const Form = ({ 
  onSubmit, 
  onCancel,
  fields,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  className = ''
}) => {
  return (
    <Paper className={`${styles.formWrapper} ${className}`} elevation={0}>
      <form onSubmit={onSubmit} className={styles.form}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            error={field.error}
            helperText={field.helperText}
            type={field.type || 'text'}
          />
        ))}
        
        <Box className={styles.buttonContainer}>
          <Button 
            variant="primary"
            onClick={onCancel}
            type="button"
          >
            {cancelButtonText}
          </Button>
          <Button 
            variant="primary"
            type="submit"
          >
            {submitButtonText}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Form; 