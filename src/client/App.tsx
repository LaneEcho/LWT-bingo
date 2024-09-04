import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import Board from './components/game_elements/board';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import { mainTheme } from './Theme';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material/';
import Header from './components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from './components/leaderboard/leaderboard';
import { AuthProvider } from './context/AuthContext';
import ToggleSwitch from './components/UI_Elements/Switch';

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

  const darkMode = mode === 'dark';

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (prefersDark) {
      setMode('dark');
    }
  }, [prefersDark, setMode]);

  return (
    <ToggleSwitch
      checked={!darkMode}
      onChange={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
        localStorage.setItem('darkMode', (!prefersDark).toString());
      }}
      sx={{
        position: 'absolute',
        top: '50px',
        right: isMobile ? '20px' : '50px',
      }}
    />
  );
}

function App() {
  const theme = mainTheme;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            alignItems={isMobile ? 'center' : 'flex-start'}
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Board />
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
