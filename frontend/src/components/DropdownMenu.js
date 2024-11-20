import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styles from "./styles/DropdownMenu.module.css";

function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Organisations', path: '/organisations' }
  ];

  return (
    <div className={styles.menu}>
      <IconButton onClick={handleClick} className={styles.menuButton}>
        <MenuIcon className={styles.menuIcon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "auto",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem 
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;
