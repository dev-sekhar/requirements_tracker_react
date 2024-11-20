import React, { useState } from "react";
import { Container, Paper, TextField, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/Button";
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
    <Container className={styles.container}>
      <PageHeader 
        title="Create New Organisation"
        buttonText="Back to Organisations"
        buttonVariant="secondary"
        onButtonClick={() => navigate('/organisations', { state: { tenantId } })}
      />
      
      <Paper className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Box className={styles.formField}>
            <TextField
              fullWidth
              label="Organisation Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={Boolean(error)}
            />
          </Box>

          <Box className={styles.formField}>
            <TextField
              fullWidth
              label="Organisation Owner"
              name="organizationOwner"
              value={formData.organizationOwner}
              onChange={handleChange}
              required
              error={Boolean(error)}
            />
          </Box>

          {error && (
            <Box className={styles.error}>
              {error}
            </Box>
          )}

          <Box className={styles.actions}>
            <CustomButton
              type="button"
              variant="secondary"
              onClick={() => navigate('/organisations', { state: { tenantId } })}
              disabled={loading}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              Create Organisation
            </CustomButton>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateOrganisationPage;
