import React, { useState } from 'react';
import { render } from 'react-dom';

import Board from './components/board';

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
} from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="app">
        <Typography
          variant="h1"
          color="primary"
          style={{
            fontSize: '5rem',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Lesbians Who Tech Bingo!
        </Typography>
        <Board />
        <Button
          className="toggleButton"
          onClick={toggleTheme}
          variant="outlined"
          style={{ marginTop: '2px' }}
          size="small"
        >
          {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
    </ThemeProvider>
  );
}

render(<App />, document.querySelector('#root'));
