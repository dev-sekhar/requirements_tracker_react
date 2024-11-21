import { createTheme } from '@mui/material/styles';

// Define common properties
const commonProperties = {
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    // ... other typography variants
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '24px',
          '@media (max-width: 600px)': {
            padding: '16px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
          minWidth: 120,
        },
      },
    },
    // ... other component overrides
  },
};

// Define theme settings for light and dark modes
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#0F0D46',
            light: '#3f3d6d',
            dark: '#0a0933',
            contrastText: '#fff',
          },
          secondary: {
            main: '#1976d2',
            light: '#4791db',
            dark: '#115293',
            contrastText: '#fff',
          },
          error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
          },
          background: {
            default: '#f8f9fa',
            paper: '#fff',
          },
          text: {
            primary: '#1a1a1a',
            secondary: '#666666',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          // Dark mode
          primary: {
            main: '#7986cb',
            light: '#9fa8da',
            dark: '#5c6bc0',
            contrastText: '#000',
          },
          secondary: {
            main: '#64b5f6',
            light: '#90caf9',
            dark: '#42a5f5',
            contrastText: '#000',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
            tableHeader: '#2d2d2d',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            tableHeader: '#fff',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.background.tableHeader 
            : theme.palette.grey[100],
          '& .MuiTableCell-head': {
            color: theme.palette.mode === 'dark' 
              ? theme.palette.text.tableHeader 
              : theme.palette.text.primary,
            fontWeight: 'bold',
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
          minWidth: 120,
          // Add specific styles for contained buttons
          '&.MuiButton-contained': {
            backgroundColor: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#9fa8da' : '#3f3d6d',
            },
          },
          // Add specific styles for outlined buttons
          '&.MuiButton-outlined': {
            borderColor: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
            color: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
            '&:hover': {
              borderColor: theme.palette.mode === 'dark' ? '#9fa8da' : '#3f3d6d',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(121, 134, 203, 0.04)' : 'rgba(15, 13, 70, 0.04)',
            },
          },
          // Add specific styles for text buttons
          '&.MuiButton-text': {
            color: theme.palette.mode === 'dark' ? '#7986cb' : '#0F0D46',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(121, 134, 203, 0.04)' : 'rgba(15, 13, 70, 0.04)',
            },
          },
        }),
      },
    },
  },
});

// Create theme instance
export const createAppTheme = (mode) => {
  return createTheme({
    ...commonProperties,
    ...getDesignTokens(mode),
  });
};

export default createAppTheme; 