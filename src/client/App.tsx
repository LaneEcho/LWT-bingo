import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/game_elements/board';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';
import { lightTheme } from './Theme';
// import { darkTheme } from './Theme';
import { Box, useTheme } from '@mui/material/';
import Header from './components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from './components/leaderboard';
import { AuthProvider } from './context/AuthContext';

import { Button } from '@mui/material/';

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

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  console.log('mode', mode);
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
  // const [darkMode, setDarkMode] = useState<boolean>(initialState());

  // const { mode, setMode } = useColorScheme();
  // console.log('color mode', mode);

  const theme = lightTheme;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(isMobile);

  const toggleTheme = (): void => {
    // setDarkMode(!darkMode);
    // setMode(mode === 'light' ? 'dark' : 'light');
    // localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <CssVarsProvider theme={theme}>
      <ModeToggle />
      <AuthProvider>
        <CssBaseline />
        <Header toggleTheme={ModeToggle} />
        <Box
          display="flex"
          width="100vw"
          gap={2}
          justifyContent={'center'}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Board darkMode={darkMode} />
          <Leaderboard />
        </Box>
      </AuthProvider>
    </CssVarsProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
