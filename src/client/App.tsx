import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/game_elements/board';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './Theme';
import { darkTheme } from './Theme';
import { Box, useTheme } from '@mui/material/';
import Header from './components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from './components/leaderboard';
import { AuthProvider } from './context/AuthContext';

function initialState() {
  if (localStorageAvailable()) {
    const theme: string = localStorage.getItem('darkMode');

    if (theme) {
      return JSON.parse(theme);
    } else {
      const userPrefers: boolean = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      localStorage.setItem('darkMode', String(userPrefers));
      return userPrefers;
    }
  }
  // probably want to return something if there is not local storage access idk
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(initialState());

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleTheme = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthProvider>
        <CssBaseline />
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <Box
          display="flex"
          width="100vw"
          gap={2}
          justifyContent={'center'}
          flexDirection={isMobile ? 'column' : 'row'} // start with this
        >
          <Board darkMode={darkMode} />
          <Leaderboard />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
