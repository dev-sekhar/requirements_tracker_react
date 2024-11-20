import React, { useState } from "react";
import { Container, Paper, TextField, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import styles from "./styles/CreateOrganisationPage.module.css";

const CreateOrganisationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tenantId = location.state?.tenantId || 1;
  const currentUser = location.state?.currentUser || "abc";
  
  const [formData, setFormData] = useState({
    name: '',
    organizationOwner: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = {
      name: formData.name,
      organizationOwner: formData.organizationOwner,
      tenantId: parseInt(tenantId),
      createdBy: currentUser
    };

    try {
      console.log('Submitting form data:', submitData);

      const response = await api.post('/api/organisations', submitData);

      console.log('Creation successful:', response.data);
      navigate('/organisations', { state: { tenantId } });
    } catch (error) {
      console.error('Error creating organisation:', error);
      setError(
        error.response?.data?.error || 
        'Failed to create organisation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.pageContainer}>
      <Paper className={styles.formWrapper} elevation={0}>
        <PageHeader 
          title="Create New Organisation"
        />
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Organisation Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <TextField
            label="Organisation Owner"
            name="organizationOwner"
            value={formData.organizationOwner}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Box className={styles.buttonContainer}>
            <Button 
              variant="primary"
              onClick={() => navigate('/organisations', { state: { tenantId } })}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              type="submit"
            >
              Create Organisation
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateOrganisationPage;
