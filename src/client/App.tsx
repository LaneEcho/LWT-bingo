import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/board';

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  useTheme,
} from '@mui/material';

function initialState(): boolean {
  if (localStorageAvailable()) {
    const theme: string = localStorage.getItem('darkMode');

    if (theme) {
      return Boolean(theme);
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
  console.log(window.matchMedia('(prefers-color-scheme: dark)'));

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#E11774',
        dark: '#46A4DB',
        contrastText: '#fff',
      },
    },
  });

  const toggleTheme = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#05FFF4',
        dark: '#46A4DB',
        contrastText: '#000',
      },
    },
  });

  const theme = useTheme();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div
        className="app"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          style={{
            fontSize: '3rem',
            marginTop: '10px',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Lesbians Who Tech Bingo!
        </Typography>
        <Board />
        <div className="button container">
          <Button
            className="toggleButton"
            onClick={toggleTheme}
            variant="contained"
            size="small"
            style={{ display: 'inline-block' }}
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
