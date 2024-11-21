import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from './index';
import PropTypes from 'prop-types';

const THEME_MODE_KEY = 'themeMode';

const ColorModeContext = createContext({ 
  toggleColorMode: () => {}, 
  mode: 'light' 
});

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    if (savedMode) {
      return savedMode;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const systemMode = e.matches ? 'dark' : 'light';
      if (!localStorage.getItem(THEME_MODE_KEY)) {
        setMode(systemMode);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem(THEME_MODE_KEY, newMode);
          return newMode;
        });
      },
      mode
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider; 