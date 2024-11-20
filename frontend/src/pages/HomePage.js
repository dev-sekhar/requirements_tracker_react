import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Paper
} from '@mui/material';
import CustomButton from '../components/Button';
import PageHeader from "../components/PageHeader";
import styles from './styles/HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const tenantId = 1;

  const handleOrganisationsClick = () => {
    navigate('/organisations', { state: { tenantId } });
  };

  return (
    <Container className={styles.container}>
      <PageHeader 
        title="Requirements Tracker"
        showButton={false}
      />
      <Paper className={styles.paper} elevation={3}>
        <div className={styles.welcomeBox}>
          <Typography 
            variant="h6" 
            className={styles.subtitle}
          >
            Your central hub for managing requirements and organizations
          </Typography>
        </div>
        
        <Typography 
          variant="body1" 
          className={styles.description}
        >
          Select an option from the menu above to get started, or use the button below to view organizations.
        </Typography>

        <CustomButton 
          variant="primary"
          size="large"
          onClick={handleOrganisationsClick}
        >
          View Organisations
        </CustomButton>
      </Paper>
    </Container>
  );
};

export default HomePage;