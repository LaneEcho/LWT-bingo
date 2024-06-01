import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import localStorageAvailable from "../util/localStorageAvail";
import Board from "./components/board";

import {
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  Stack,
  Switch,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Leaderboard from "./components/leaderboard";
import { AuthProvider } from "./context/AuthContext";
import GmailLogout from "./components/GmailLogout";

function initialState() {
  if (localStorageAvailable()) {
    // see if there is a key or if null
    const theme: string = localStorage.getItem("darkMode");

    if (theme) {
      return JSON.parse(theme);
    } else {
      const userPrefers: boolean = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      localStorage.setItem("darkMode", String(userPrefers));
      return userPrefers;
    }
  }
  // probably want to return something if there is not local storage access idk
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(initialState());
  console.log(window.matchMedia("(prefers-color-scheme: dark)"));

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#E11774", // Pink
        dark: "#46A4DB", // Blue
        contrastText: "#fff", // White
      },
      secondary: {
        main: "#92D050", // Light Green
        dark: "#FC000", // Yellow
        contrastText: "#575757", // Dark Grey
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#05FFF4", // Cyan
        dark: "#46A4DB", // Blue
        contrastText: "#000", // Black
      },
      secondary: {
        main: "#92D050", // Light Green
        dark: "#FC000", // Yellow
        contrastText: "#575757", // Dark Grey
      },
    },
  });

  const toggleTheme = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const theme = useTheme();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthProvider>
        <CssBaseline />
        <div
          className="app"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // TODO: Figure ths out, needed to be able to scroll to see leadebaord in small screen
            // height: "100vh",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontSize: "3rem",
                textAlign: "center",
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
                    backgroundColor: "#05FFF4",
                    color: "#121212",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              }
              checkedIcon={
                <LightModeIcon
                  sx={{
                    backgroundColor: "#E11774",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              }
              // style={{ color: darkMode ? '#42a5f5' : '#FFA500' }} // Customize switch color
            />
          </Stack>
          <div>
            <GmailLogout />
          </div>
          <Board />
        </div>
        <Leaderboard />
      </AuthProvider>
    </ThemeProvider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
