import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Table from "../components/Table";
import CustomButton from "../components/Button";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import styles from "./styles/OrganisationsPage.module.css";

const OrganisationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenantId = location.state?.tenantId || 1;
  const currentUser = "abc";
  const [organisations, setOrganisations] = useState([]);
  const [tenantName, setTenantName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch tenant details first
        const tenantResponse = await api.get(`/api/tenants/${tenantId}`);
        setTenantName(tenantResponse.data.name);

        // Then fetch organisations
        const orgResponse = await api.get('/api/organisations', {
          params: { tenantId }
        });
        setOrganisations(orgResponse.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className={styles.container}>
      <PageHeader 
        title={tenantName ? `Organisations - ${tenantName}` : 'Organisations'}
        buttonText="Create New Organisation"
        onButtonClick={() => navigate('/organisations/create', { 
          state: { 
            tenantId,
            currentUser 
          } 
        })}
      >
        <SearchField
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search organisations..."
          className={styles.searchField}
        />
      </PageHeader>
      
      {organisations.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No organisations found for {tenantName}</p>
          <CustomButton 
            variant="primary"
            size="medium"
            onClick={() => navigate('/organisations/create', { 
              state: { 
                tenantId,
                currentUser 
              } 
            })}
          >
            Create New Organisation
          </CustomButton>
        </div>
      ) : (
        <Table 
          data={organisations} 
          columns={columns} 
        />
      )}
    </Container>
  );
};

export default OrganisationsPage;
