import React, { useState } from 'react';
import { render } from 'react-dom';

import Board from './components/board';
import Alert from '@mui/material/Alert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  useTheme,
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

  const theme = useTheme();

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
        {/* <Typography
          variant="subtitle1"
          paragraph
          color={theme.palette.primary.dark}
          style={{
            // fontSize: '5rem',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          How to play: Click on a square when you've encountered it during the
          conference.
        </Typography> */}
        <Alert
          variant="filled"
          iconMapping={{
            success: <PriorityHighIcon fontSize="inherit" />,
          }}
          style={{
            justifyContent: 'center',
            backgroundColor: darkMode ? 'var(--hot-pink)' : 'var(--neon-blue)',
            color: darkMode ? '#fff' : '#000',
          }}
        >
          Warning! Do not refresh the page or you will lose your progress!
        </Alert>
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
