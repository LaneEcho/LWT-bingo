import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import localStorageAvailable from '../util/localStorageAvail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useColorScheme } from '@mui/material/styles';
import { mainTheme } from './theme';
import Container from './Components/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthProvider } from './context/authContext'; // incorrect case
import ToggleSwitch from './Components/UI_Elements/Switch';

// this function sets the initial state for the theme
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

// this component returns a toggle switch to toggle the theme
// theme preference is stored in local storage
function ModeToggle() {
  const prefersDark: boolean = initialState();

  const { mode, setMode } = useColorScheme();

  const darkMode: boolean = mode === 'dark';

  const theme = createTheme({
    cssVariables: true,
  });

  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (prefersDark) {
      setMode('dark');
    }
  }, [prefersDark, setMode]);

  return (
    <ToggleSwitch
      checked={!darkMode}
      onChange={() => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('darkMode', (!prefersDark).toString());
      }}
      sx={{
        position: 'absolute',
        top: isMobile ? '20px' : '50px',
        right: isMobile ? '20px' : '50px',
        zIndex: 999,
      }}
    />
  );
}

function App() {
  const theme = mainTheme;

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <ModeToggle />
        <Container />
      </AuthProvider>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
