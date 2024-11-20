import React, { useState, useEffect } from 'react';
import { Container, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import styles from './styles/DeletedOrganisationsPage.module.css';

const DeletedOrganisationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tenantId = location.state?.tenantId;
  const tenantName = location.state?.tenantName;
  
  const [deletedOrganisations, setDeletedOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Location state:', location.state); // Debug log

  useEffect(() => {
    const fetchDeletedOrganisations = async () => {
      try {
        console.log('Fetching deleted organisations for tenantId:', tenantId);
        setLoading(true);
        const response = await api.get('/api/organisations/deleted', {
          params: { tenantId }
        });
        console.log('API Response:', response.data);
        setDeletedOrganisations(response.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching deleted organisations:', error);
        setError('Failed to fetch deleted organisations');
      } finally {
        setLoading(false);
      }
    };

    if (tenantId) {
      fetchDeletedOrganisations();
    }
  }, [tenantId]);

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name' 
    },
    { 
      field: 'organizationOwner', 
      headerName: 'Owner' 
    },
    { 
      field: 'status', 
      headerName: 'Status',
      valueGetter: (row) => (
        <Chip 
          label={row.status}
          color="error"
          size="small"
        />
      )
    }
  ];

  return (
    <Container className={styles.container}>
      <PageHeader 
        title={`Organisations - ${tenantName || 'Unknown Tenant'} (Deleted)`}
        buttonText="Back to Organisations"
        onButtonClick={() => navigate('/organisations', { state: { tenantId } })}
      />
      
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <Table 
          data={deletedOrganisations}
          columns={columns}
        />
      )}
    </Container>
  );
};

export default DeletedOrganisationsPage; 