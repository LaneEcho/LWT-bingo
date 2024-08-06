import React from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/game_elements/board';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import { mainTheme } from './Theme';
import { Box } from '@mui/material/';
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
  const prefersDark = initialState();

  const { mode, setMode } = useColorScheme();

  if (prefersDark) setMode('dark');

  // change this to toggle switch
  return (
    <Button
      size="small"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
        localStorage.setItem('darkMode', (!prefersDark).toString());
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
  const theme = mainTheme;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(isMobile);

  return (
    <CssVarsProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={'100vw'}
        >
          <Header />
          <ModeToggle />
          <Box
            display="flex"
            gap={2}
            justifyContent={'center'}
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Board darkMode={darkMode} />
            <Leaderboard />
          </Box>
        </Box>
      </AuthProvider>
    </CssVarsProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
