import React, { useState, useEffect } from "react";
import { 
  Container, 
  Paper, 
  TextField, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/Button";
import styles from "./styles/CreateOrganisationPage.module.css";  // Reuse the same styles

const EditOrganisationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const tenantId = location.state?.tenantId || 1;
  const currentUser = location.state?.currentUser || "abc";
  
  const [formData, setFormData] = useState({
    name: '',
    organizationOwner: '',
    status: 'Active'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/organisations/${id}`);
        const { name, organizationOwner, status } = response.data;
        setFormData({ name, organizationOwner, status: status || 'Active' });
      } catch (error) {
        console.error('Error fetching organisation:', error);
        setError('Failed to fetch organisation details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisation();
  }, [id]);

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

    try {
      await api.put(`/api/organisations/${id}`, {
        ...formData,
        modifiedBy: currentUser
      });

      navigate('/organisations', { state: { tenantId } });
    } catch (error) {
      console.error('Error updating organisation:', error);
      setError(
        error.response?.data?.error || 
        'Failed to update organisation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <PageHeader 
        title="Edit Organisation"
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

          <Box className={styles.formField}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
                required
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className={styles.formField}>
            <CustomButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </CustomButton>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditOrganisationPage; 