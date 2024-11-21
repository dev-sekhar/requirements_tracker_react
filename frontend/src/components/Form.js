import React from 'react';
import { Box, Paper, Button, styled } from '@mui/material';
import TextField from './TextField';
import styles from './styles/Form.module.css';

const FormWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    maxWidth: '90%',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 600,
  },
}));

const FormContent = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    gap: theme.spacing(2),
    '& > button': {
      width: '100%',
    },
  },
}));

const Form = ({ 
  onSubmit, 
  onCancel,
  fields,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  className = ''
}) => {
  return (
    <FormWrapper className={`${styles.formWrapper} ${className}`} elevation={0}>
      <FormContent onSubmit={onSubmit} className={styles.form}>
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
        
        <ButtonContainer>
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
        </ButtonContainer>
      </FormContent>
    </FormWrapper>
  );
};

export default Form; 