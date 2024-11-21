import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getTenantFromSubdomain } from './utils/tenant';
import api from './utils/axios';
import OrganisationsPage from './pages/OrganisationsPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import logger from './utils/logger';
import CreateOrganisationPage from './pages/CreateOrganisationPage';
import { ThemeProvider } from './theme/ThemeProvider';
import EditOrganisationPage from './pages/EditOrganisationPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const subdomain = getTenantFromSubdomain();
        logger.info('Detected subdomain:', subdomain);

        if (subdomain) {
          const response = await api.get(`/api/tenants/by-subdomain/${subdomain}`);
          logger.info('Loaded tenant:', response.data);
          setTenant(response.data);
        }
      } catch (error) {
        logger.error('Error loading tenant:', error);
        setError(error.response?.data?.error || 'Failed to load tenant');
      } finally {
        setLoading(false);
      }
    };

    loadTenant();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <div>Loading...</div>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <div>Error: {error}</div>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        {tenant ? (
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/organisations" element={
                <ErrorBoundary>
                  <OrganisationsPage tenant={tenant} />
                </ErrorBoundary>
              } />
              <Route path="/organisations/create" element={<CreateOrganisationPage tenant={tenant} />} />
              <Route path="/organisations/:id/edit" element={
                <ErrorBoundary>
                  <EditOrganisationPage tenant={tenant} />
                </ErrorBoundary>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
