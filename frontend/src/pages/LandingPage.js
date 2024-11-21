import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Box 
} from '@mui/material';
import api from '../utils/axios';
import logger from '../utils/logger';
import { getFullTenantUrl } from '../utils/tenant';

const LandingPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await api.get('/api/tenants');
        setTenants(response.data);
      } catch (err) {
        logger.error('Error fetching tenants:', err);
        setError('Failed to load tenants');
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const handleTenantClick = (subdomain) => {
    const tenantUrl = getFullTenantUrl(subdomain);
    logger.info('Navigating to tenant:', tenantUrl);
    window.location.href = tenantUrl;
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading tenants...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Requirements Tracker
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Select a tenant to continue:
        </Typography>
      </Box>

      <Paper elevation={2}>
        <List>
          {tenants.map((tenant) => (
            <ListItem 
              key={tenant.id}
              button 
              onClick={() => handleTenantClick(tenant.subdomain)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText 
                primary={tenant.name}
                secondary={`Subdomain: ${tenant.subdomain}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {tenants.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No tenants available.
        </Typography>
      )}
    </Container>
  );
};

export default LandingPage; 