import React, { useState, useEffect } from "react";
import { 
  Container, 
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import TextField from "../components/TextField";
import ErrorMessage from "../components/ErrorMessage";
import logger from "../utils/logger";

const EditOrganisationPage = ({ tenant }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
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
        logger.info(`Fetching organisation details for ID: ${id}`);
        const response = await api.get(`/api/tenants/${tenant.id}/organisations/${id}`);
        if (response.data) {
          setFormData({
            name: response.data.name,
            organizationOwner: response.data.organizationOwner,
            status: response.data.status || 'Active'
          });
          setError(null);
        }
      } catch (err) {
        logger.error('Error fetching organisation:', err);
        setError('Failed to load organisation details');
        if (err.response?.status === 404) {
          navigate('/organisations');
        }
      } finally {
        setLoading(false);
      }
    };

    if (tenant && id) {
      fetchOrganisation();
    }
  }, [tenant, id, navigate]);

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
      logger.info(`Updating organisation ${id}`);
      await api.put(`/api/tenants/${tenant.id}/organisations/${id}`, {
        ...formData,
        modifiedBy: 'system'
      });

      logger.info('Organisation updated successfully');
      navigate('/organisations');
    } catch (err) {
      logger.error('Error updating organisation:', err);
      if (err.response?.data?.code === 'DUPLICATE_NAME') {
        setError(`Organisation "${formData.name}" already exists for ${tenant.name}`);
      } else {
        setError('Failed to update organisation');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <PageHeader 
        title={`Edit Organisation - ${tenant?.name || ''}`}
        buttonText="Back to Organisations"
        buttonVariant="outlined"
        onButtonClick={() => navigate('/organisations')}
      />
      
      <ErrorMessage message={error} />
      
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mt: 3,
          backgroundColor: theme => theme.palette.background.paper
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Organisation Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            error={Boolean(error)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Organisation Owner"
            name="organizationOwner"
            value={formData.organizationOwner}
            onChange={handleChange}
            required
            disabled={loading}
            error={Boolean(error)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              required
              disabled={loading}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'flex-end',
            mt: 4,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/organisations')}
              disabled={loading}
              fullWidth={false}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth={false}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditOrganisationPage; 