import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/board';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useTheme, Switch } from '@mui/material';
import NavBar from './components/nav';

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
        <NavBar toggleTheme={toggleTheme} darkMode={darkMode}></NavBar>
        <Board />
      </div>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
