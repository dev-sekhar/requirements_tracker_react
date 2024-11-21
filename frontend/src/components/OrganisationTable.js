import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Table from './Table';
import { Button, Typography, Chip } from '@mui/material';

function OrganisationTable({ tenantId, tenantName }) {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        console.log('Fetching organisations for tenant:', tenantId);
        const response = await axios.get('/organisations', {
          params: { tenantId: tenantId },
        });
        console.log('Organizations with their statuses:', 
          response.data.map(org => ({
            id: org.id,
            name: org.name,
            status: org.status
          }))
        );
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

  // Status configurations broken down by type
  const statusConfigs = {
    active: {
      color: '#00B69B',          // Green text
      backgroundColor: '#E6F6F4', // Light green background
      borderColor: '#00B69B',     // Green border
      label: 'Active'
    },
    
    inactive: {
      color: '#FF4842',          // Red text
      backgroundColor: '#FFE7E6', // Light red background
      borderColor: '#FF4842',     // Red border
      label: 'Inactive'
    },
    
    deleted: {
      color: '#637381',          // Grey text
      backgroundColor: '#F4F6F8', // Light grey background
      borderColor: '#637381',     // Grey border
      label: 'Deleted'
    }
  };

  // Status chip styling function with logging
  const getStatusConfig = (status) => {
    console.log('getStatusConfig called with status:', status);
    
    const lowercaseStatus = status?.toLowerCase();
    console.log('Lowercase status:', lowercaseStatus);

    switch (lowercaseStatus) {
      case 'active':
        console.log('Matching ACTIVE case');
        return {
          color: '#00B69B',
          backgroundColor: '#E6F6F4',
          borderColor: '#00B69B',
          label: 'Active'
        };
      case 'inactive':
        console.log('Matching INACTIVE case');
        return {
          color: '#FF4842',
          backgroundColor: '#FFE7E6',
          borderColor: '#FF4842',
          label: 'Inactive'
        };
      case 'deleted':
        console.log('Matching DELETED case');
        return {
          color: '#637381',
          backgroundColor: '#F4F6F8',
          borderColor: '#637381',
          label: 'Deleted'
        };
      default:
        console.log('No status match found, using default');
        return {
          color: '#637381',
          backgroundColor: '#F4F6F8',
          borderColor: '#637381',
          label: status || 'Unknown'
        };
    }
  };

  // Column definition with logging
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
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (row) => {
        console.log('Rendering status chip for:', {
          id: row.id,
          status: row.status,
          lowercaseStatus: row.status?.toLowerCase()
        });

        const statusConfig = getStatusConfig(row.status);
        console.log('Status config applied:', statusConfig);

        return (
          <Chip
            label={statusConfig.label}
            sx={{
              color: statusConfig.color,
              backgroundColor: statusConfig.backgroundColor,
              border: `1px solid ${statusConfig.borderColor}`,
              fontWeight: 'bold',
              fontSize: '0.75rem',
              height: '24px',
              '&.MuiChip-root': {
                borderRadius: '6px',
              }
            }}
          />
        );
      },
      align: 'center',
      headerAlign: 'center'
    }
  ];

  return (
    <div>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : organisations.length > 0 ? (
        <>
          {console.log('Rendering table with organisations:', organisations)}
          <Table columns={columns} data={organisations} />
        </>
      ) : (
        <div>
          {console.log('No organisations found for tenant:', tenantName)}
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