import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BurgerMenu from './menu';

interface NavBarProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const NavBar = React.forwardRef(function ({
  toggleTheme,
  darkMode,
}: NavBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontSize: '3rem',
            }}
          >
            Lesbians Who Tech Bingo!
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu-button"
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ marginLeft: '2rem' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <BurgerMenu
        handleClose={handleClose}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        anchorEl={anchorEl}
        open={open}
      />
    </Box>
  );
});

export default NavBar;
