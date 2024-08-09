import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BurgerMenu from './menu';
import User from './user';
import PresentedByInCo from '../../assets/svg/PresentedByInCo.svg';
import Unofficial from '../../assets/svg/Unofficial.svg';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { Icon } from '@mui/material';

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header = React.forwardRef(function (
  { toggleTheme, darkMode }: HeaderProps,
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
      gap={4}
      py={1}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Icon sx={{width:'35px',height:'35px'}}>
        {!darkMode ? (
          <LightModeIcon fontSize="large" htmlColor='#E11774'/>
          ) : (
          <DarkModeIcon fontSize="large" htmlColor='#0AFFF4' />
          )
        }
      </Icon>
      <DarkModeToggle
        mode={darkMode ? 'dark' : 'light'}
        size="sm"
        inactiveTrackColor="#0AFFF4"
        inactiveTrackColorOnHover="#2af7ee"
        inactiveTrackColorOnActive="#2af7ee"
        activeTrackColor="#E11774"
        activeTrackColorOnHover="#fc328f"
        activeTrackColorOnActive="#fc328f"
        inactiveThumbColor="#000000"
        activeThumbColor="#FFFFFF"
        onChange={toggleTheme}
      />

      <Unofficial />

      <Box
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
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
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        alignSelf={'flex-start'}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu-button"
          aria-controls={open ? 'menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ marginLeft: '2rem', marginRight: '5px' }}
        >
          <MenuIcon />
        </IconButton>
        <BurgerMenu
          handleClose={handleClose}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          anchorEl={anchorEl}
          open={open}
        />

        <User />
      </Box>
    </Box>
  );
});

export default Header;
