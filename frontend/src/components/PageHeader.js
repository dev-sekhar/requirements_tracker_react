import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "./Button";
import styles from "./styles/PageHeader.module.css";

const PageHeader = ({ 
  title, 
  buttonText, 
  onButtonClick,
  children
}) => {
  return (
    <Box className={styles.pageHeader}>
      <Box className={styles.headerRow}>
        <Typography variant="h5" component="h1" className={styles.title}>
          {title}
        </Typography>
        <Box className={styles.headerActions}>
          {children}
          {buttonText && (
            <CustomButton
              variant="primary"
              size="medium"
              onClick={onButtonClick}
              className={styles.headerButton}
            >
              {buttonText}
            </CustomButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader; 