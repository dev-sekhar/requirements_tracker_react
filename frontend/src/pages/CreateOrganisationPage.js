import React, { useState } from 'react';
import { Container, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import PageHeader from '../components/PageHeader';
import TextField from '../components/TextField';
import Button from '../components/Button';

const CreateOrganisationPage = ({ tenant }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    organizationOwner: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await api.post(`/api/tenants/${tenant.id}/organisations`, {
        ...formData,
        createdBy: 'system',
        status: 'Active'
      });
      navigate('/organisations');
    } catch (error) {
      console.error('Error creating organisation:', error);
      if (error.response?.data?.code === 'DUPLICATE_NAME') {
        setError(`An organization named "${formData.name}" already exists for this tenant`);
      } else {
        setError('Failed to create organization. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <PageHeader title={`Create New Organisation - ${tenant?.name || ''}`} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Organisation Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <TextField
          label="Organisation Owner"
          name="organizationOwner"
          value={formData.organizationOwner}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'flex-end',
          mt: 2 
        }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/organisations')}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="contained"
          >
            Create Organisation
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrganisationPage;
