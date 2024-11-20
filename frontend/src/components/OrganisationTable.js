import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Table from './Table';
import { Button, Typography } from '@mui/material';

function OrganisationTable({ tenantId, tenantName }) {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        console.log('Sending request with tenantId:', tenantId);
        const response = await axios.get('/organisations', {
          params: { tenantId: tenantId },
        });
        setOrganisations(response.data || []);
      } catch (error) {
        console.error('Error fetching organisations:', error);
        setOrganisations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, [tenantId]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'organizationOwner', headerName: 'Owner' },
    { 
      field: 'createdAt', 
      headerName: 'Created At',
      valueGetter: (row) => formatDate(row.createdAt)
    },
    { 
      field: 'updatedAt', 
      headerName: 'Updated At',
      valueGetter: (row) => formatDate(row.updatedAt)
    }
  ];

  return (
    <div>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : organisations.length > 0 ? (
        <Table columns={columns} data={organisations} />
      ) : (
        <div>
          <Typography variant="h6">
            No organisations found for tenant: {tenantName}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log('Redirect to create organisation form')}
          >
            Create Organisation
          </Button>
        </div>
      )}
    </div>
  );
}

export default OrganisationTable; 