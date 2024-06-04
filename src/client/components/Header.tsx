import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BurgerMenu from './menu';
import User from './user';
import PresentedByInCo from '../../assets/svg/PresentedByInCo.svg';
import Unofficial from '../../assets/svg/Unofficial.svg';

interface NavBarProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const NavBar = React.forwardRef(function (
  { toggleTheme, darkMode }: NavBarProps,
  ref
) {
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
      py={2}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Unofficial />
      <Toolbar>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography
            variant="h1"
            fontFamily={'Lalezar'}
            color="primary"
            textTransform={'uppercase'}
            sx={{
              fontSize: '3rem',
            }}
          >
            Lesbians Who Tech Bingo!
          </Typography>
          <PresentedByInCo />
        </Box>
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
      <BurgerMenu
        handleClose={handleClose}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        anchorEl={anchorEl}
        open={open}
      />
      <User />
    </Box>
  );
});

export default NavBar;
