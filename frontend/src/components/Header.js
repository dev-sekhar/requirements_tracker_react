import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../theme/ThemeProvider';
import DropdownMenu from './DropdownMenu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[1],
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 28,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const Header = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <HeaderTitle variant="h1">
          Requirements Tracker
        </HeaderTitle>
        <Box sx={{ flexGrow: 1 }} />
        <ActionContainer>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton 
              onClick={toggleColorMode} 
              color="inherit"
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <DropdownMenu />
        </ActionContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
