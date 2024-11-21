//organisationopages.js
import React, { useState, useEffect } from "react";
import { Container, Chip, IconButton, Box, styled, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import ErrorMessage from '../components/ErrorMessage';
import ToggleSwitch from '../components/ToggleSwitch';
import logger from "../utils/logger";

const PageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 3),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(3),
}));

const OrganisationsPage = ({ tenant }) => {
  const navigate = useNavigate();
  
  const [organisations, setOrganisations] = useState([]);
  const [filteredOrganisations, setFilteredOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: '30%'
    },
    {
      field: "organizationOwner",
      headerName: "Owner",
      width: '30%'
    },
    {
      field: "status",
      headerName: "Status",
      width: '20%',
      cellRenderer: (row) => (
        <Chip
          label={row.status}
          color={row.status === 'Deleted' ? 'error' : 'success'}
          size="small"
        />
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: '20%',
      cellRenderer: (row) => (
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          justifyContent: 'flex-end'
        }}>
          <Tooltip title="Edit">
            <span>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(row.id);
                }}
                disabled={row.status === 'Deleted'}
                color="primary"
                sx={{
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton 
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row.id);
                }}
                disabled={row.status === 'Deleted'}
                color="error"
                sx={{
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )
    }
  ];

  const fetchOrganisations = async () => {
    try {
      setLoading(true);
      logger.info(`Fetching organizations for tenant: ${tenant.id}`);
      
      const response = await api.get(`/api/tenants/${tenant.id}/organisations`);
      const allOrganisations = response.data;
      setOrganisations(allOrganisations);
      
      // Initial filtering
      filterOrganisations(allOrganisations, showActiveOnly);
      setError(null);
    } catch (err) {
      logger.error('Error fetching organisations:', err);
      setError('Failed to load organisations');
    } finally {
      setLoading(false);
    }
  };

  const filterOrganisations = (orgs, activeOnly) => {
    if (activeOnly) {
      const filtered = orgs.filter(org => org.status !== 'Deleted');
      logger.info(`Filtered ${orgs.length} organisations to ${filtered.length} active records`);
      setFilteredOrganisations(filtered);
    } else {
      logger.info('Showing all organisations');
      setFilteredOrganisations(orgs);
    }
  };

  useEffect(() => {
    if (tenant) {
      fetchOrganisations();
    }
  }, [tenant]);

  // Apply filtering when showActiveOnly changes
  useEffect(() => {
    filterOrganisations(organisations, showActiveOnly);
  }, [showActiveOnly, organisations]);

  const handleCreateClick = () => {
    navigate('/organisations/create');
  };

  const handleEdit = (organisationId) => {
    navigate(`/organisations/${organisationId}/edit`);
  };

  const handleDelete = async (organisationId) => {
    try {
      logger.info(`Deleting organisation ${organisationId}`);
      await api.delete(`/api/tenants/${tenant.id}/organisations/${organisationId}`);
      logger.info('Organisation deleted successfully');
      // Refresh the organisations list
      fetchOrganisations();
    } catch (err) {
      logger.error('Error deleting organisation:', err);
      setError('Failed to delete organisation');
    }
  };

  const handleToggleChange = (event) => {
    const newValue = event.target.checked;
    logger.info(`Toggling active-only filter: ${newValue}`);
    setShowActiveOnly(newValue);
  };

  return (
    <PageContainer>
      <PageHeader 
        title={`Organisations - ${tenant?.name || ''}`}
        showButton={true}
        buttonText="Create Organisation"
        onButtonClick={handleCreateClick}
      />
      <ErrorMessage message={error} />
      <FilterContainer>
        <ToggleSwitch
          checked={showActiveOnly}
          onChange={handleToggleChange}
          labelOn="Showing Active Records"
          labelOff="Showing All Records"
          placement="start"
          color="primary"
        />
      </FilterContainer>
      {loading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : filteredOrganisations.length === 0 ? (
        <EmptyState>
          <Typography variant="h6" color="textSecondary">
            No organisations found
          </Typography>
        </EmptyState>
      ) : (
        <Table 
          data={filteredOrganisations}
          columns={columns}
        />
      )}
    </PageContainer>
  );
};

export default OrganisationsPage;
