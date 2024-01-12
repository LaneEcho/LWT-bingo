import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Board from './components/board';

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  useTheme,
} from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
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
