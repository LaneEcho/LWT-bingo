import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import NavMenu from './components/menu';
import Board from './components/board';

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  Stack,
  Switch,
  Button,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function initialState() {
  if (localStorageAvailable()) {
    // see if there is a key or if null
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
        <Stack direction="row" spacing={2}>
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontSize: '3rem',
              textAlign: 'center',
            }}
          >
            Lesbians Who Tech Bingo!
          </Typography>
          {/* <Button
            className="toggleButton"
            onClick={toggleTheme}
            variant="contained"
            size="small"
            startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </Button> */}
          <Switch
            checked={!darkMode}
            onChange={toggleTheme}
            id="darkmode_toggle"
            icon={
              <DarkModeIcon
                sx={{
                  backgroundColor: '#05FFF4',
                  color: '#121212',
                  borderRadius: '50%',
                  padding: '5px',
                }}
              />
            }
            checkedIcon={
              <LightModeIcon
                sx={{
                  backgroundColor: '#E11774',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '5px',
                }}
              />
            }
            // style={{ color: darkMode ? '#42a5f5' : '#FFA500' }} // Customize switch color
          />
          <NavMenu></NavMenu>
        </Stack>
        <Board />
      </div>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
