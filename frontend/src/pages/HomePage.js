import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  useTheme
} from '@mui/material';
import Button from '../components/Button';
import PageHeader from "../components/PageHeader";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const tenantId = 1;

  const handleOrganisationsClick = () => {
    navigate('/organisations', { state: { tenantId } });
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <PageHeader 
        title="Requirements Tracker"
        showButton={false}
      />
      
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          maxWidth: 600,
          width: '100%',
          mt: 4,
          backgroundColor: theme => theme.palette.background.paper,
          boxShadow: theme => theme.shadows[3]
        }}
      >
        <Box 
          sx={{
            textAlign: 'center',
            mb: 2
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              color: theme => theme.palette.text.secondary,
              mb: 2
            }}
          >
            Your central hub for managing requirements and organizations
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          sx={{
            mb: 3,
            textAlign: 'center',
            color: theme => theme.palette.text.primary
          }}
        >
          Select an option from the menu above to get started, or use the button below to view organizations.
        </Typography>

        <Button 
          variant="contained"
          size="large"
          onClick={handleOrganisationsClick}
          sx={{
            minWidth: 200,
            fontWeight: 500
          }}
        >
          View Organisations
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage;