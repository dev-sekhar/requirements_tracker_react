import React, { useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import PageHeader from '../components/PageHeader';
import Form from '../components/Form';
import styles from './styles/CreateOrganisationPage.module.css';

const CreateOrganisationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tenantId = location.state?.tenantId;

  const [formData, setFormData] = useState({
    name: '',
    organizationOwner: ''
  });

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
      console.log('Submitting form data:', {
        ...formData,
        tenantId,
        createdBy: 'system'
      });

      const response = await api.post('/api/organisations', {
        ...formData,
        tenantId,
        createdBy: 'system'
      });

      console.log('Create response:', response.data);
      navigate('/organisations', { state: { tenantId } });
    } catch (error) {
      console.error('Error creating organisation:', error);
    }
  };

  const formFields = [
    {
      name: 'name',
      label: 'Organisation Name',
      value: formData.name,
      onChange: handleChange,
      required: true
    },
    {
      name: 'organizationOwner',
      label: 'Organisation Owner',
      value: formData.organizationOwner,
      onChange: handleChange,
      required: true
    }
  ];

  return (
    <Container className={styles.pageContainer}>
      <PageHeader title="Create New Organisation" />
      <Form
        onSubmit={handleSubmit}
        onCancel={() => navigate('/organisations', { state: { tenantId } })}
        fields={formFields}
        submitButtonText="Create Organisation"
        cancelButtonText="Cancel"
      />
    </Container>
  );
};

export default CreateOrganisationPage;
