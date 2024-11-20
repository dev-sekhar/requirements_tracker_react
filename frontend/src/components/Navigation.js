import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Button color="inherit" onClick={handleMenuClick}>
          Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">
            Home
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
            Organisations
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation; 