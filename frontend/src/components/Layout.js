import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, styled } from '@mui/material';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '100%',
  overflowX: 'hidden',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  maxWidth: '100%',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  maxWidth: '100%',
}));

const Layout = ({ children }) => {
  return (
    <LayoutRoot>
      <HeaderSection>
        <Header />
      </HeaderSection>
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutRoot>
  );
};

export default Layout;
