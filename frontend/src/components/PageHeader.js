import { Box, Typography, Button, styled } from '@mui/material';

const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const HeaderActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const PageHeader = ({ title, buttonText, onButtonClick, showButton = false }) => {
  return (
    <HeaderContainer>
      <HeaderRow>
        <Typography variant="h5" component="h1">
          {title}
        </Typography>
        {showButton && (
          <HeaderActions>
            <Button
              variant="contained"
              color="primary"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </HeaderActions>
        )}
      </HeaderRow>
    </HeaderContainer>
  );
};

export default PageHeader; 