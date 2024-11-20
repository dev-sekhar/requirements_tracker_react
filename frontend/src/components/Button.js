import React from "react";
import { Button as MuiButton } from "@mui/material";
import styles from "./styles/Button.module.css";

const CustomButton = ({ 
  onClick, 
  children, 
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[size]} ${className}`;

  const buttonStyles = {
    bgcolor: variant === "primary" ? "#0F0D46" : "transparent",
    color: variant === "primary" ? "#ffffff" : "#0F0D46",
    border: variant === "secondary" ? "1px solid #0F0D46" : "none",
    whiteSpace: "nowrap",
    minWidth: "fit-content",
    width: "auto",
    "&:hover": {
      bgcolor: variant === "primary" ? "#0a0933" : "rgba(15, 13, 70, 0.04)",
    },
    "&.MuiButton-root": {
      bgcolor: variant === "primary" ? "#0F0D46" : "transparent",
      whiteSpace: "nowrap",
      minWidth: "fit-content",
      width: "auto",
      "&:hover": {
        bgcolor: variant === "primary" ? "#0a0933" : "rgba(15, 13, 70, 0.04)",
      }
    }
  };

  return (
    <MuiButton
      className={buttonClasses}
      onClick={onClick}
      variant={variant === "primary" ? "contained" : "outlined"}
      disableElevation
      sx={buttonStyles}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default CustomButton;
