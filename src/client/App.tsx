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
  Modal,
  Box,
} from '@mui/material';

function App() {
  // dark mode
  const [darkMode, setDarkMode] = useState(false);
  // for modal
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Alert
          variant="filled"
          iconMapping={{
            success: <PriorityHighIcon />,
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
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            style={{ marginLeft: '.5rem', display: 'inline-block' }}
          >
            About Us
          </Button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              width: 300,
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: '8px',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

render(<App />, document.querySelector('#root'));
