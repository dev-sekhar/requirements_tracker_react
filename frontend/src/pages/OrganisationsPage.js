//organisationopages.js
import React, { useState, useEffect } from "react";
import { Container, Chip, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Button from "../components/Button";
import styles from "./styles/OrganisationsPage.module.css";

const OrganisationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tenantId = location.state?.tenantId || 1;

  const [organisations, setOrganisations] = useState([]);
  const [tenantName, setTenantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  // Define table columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "organizationOwner",
      headerName: "Owner",
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (row) => (
        <Chip
          label={row.status || "Active"}
          color={getStatusColor(row.status)}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      valueGetter: (row) => (
        <>
          <IconButton onClick={() => handleEditClick(row.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch tenant details
        const tenantResponse = await api.get(`/api/tenants/${tenantId}`);
        setTenantName(tenantResponse.data.name);

        // Fetch organisations
        const orgResponse = await api.get("/api/organisations", {
          params: { tenantId },
        });
        setOrganisations(orgResponse.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantId]);

  const handleCreateClick = () => {
    navigate("/organisations/create", { state: { tenantId } });
  };

  const handleEditClick = (organisationId) => {
    navigate(`/organisations/edit/${organisationId}`, {
      state: { tenantId },
    });
  };

  const handleDeleteClick = async (organisationId) => {
    try {
      await api.delete(`/api/organisations/${organisationId}`);
      setOrganisations((prev) => prev.filter(org => org.id !== organisationId));
    } catch (error) {
      console.error('Error deleting organisation:', error);
    }
  };

  const handleViewDeletedClick = () => {
    console.log('Navigating to deleted organisations with tenantId:', tenantId);
    console.log('Tenant Name:', tenantName);
    navigate('/organisations/deleted', { 
      state: { 
        tenantId, 
        tenantName 
      } 
    });
  };

  return (
    <Container className={styles.container}>
      <PageHeader
        title={`Organisations - ${tenantName}`}
      />

      <div className={styles.tableWrapper}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <Table data={organisations} columns={columns} />
            
            <Box className={styles.buttonContainer}>
              <Button 
                variant="primary"
                onClick={handleViewDeletedClick}
              >
                View Deleted Organisations
              </Button>
              <Button 
                variant="primary"
                onClick={handleCreateClick}
              >
                Create New Organisation
              </Button>
            </Box>
          </>
        )}
      </div>
    </Container>
  );
};

export default OrganisationsPage;
