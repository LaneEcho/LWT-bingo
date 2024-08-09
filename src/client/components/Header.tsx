import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import BurgerMenu from './menu';
import User from './user';
import PresentedByInCo from '../../assets/svg/PresentedByInCo.svg';
import PresentedByInCoSmall from '../../assets/svg/PresentedByInCoSmall.svg';
import Unofficial from '../../assets/svg/Unofficial.svg';
import UnofficialSmall from '../../assets/svg/UnofficialSmall.svg';

interface HeaderProps {
  toggleTheme?: () => void;
  darkMode?: boolean;
}

const Header = React.forwardRef(function (
  { toggleTheme, darkMode }: HeaderProps,
  ref
) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      gap={isMobile ? 0 : 4}
      py={1}
      px={isMobile ? 2 : ''}
      width="100vw"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
    >
      {isMobile ? <UnofficialSmall /> : <Unofficial />}

      <Box
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        justifyContent={'space-between'}
        zIndex={-5}
      >
        <Typography
          variant="h1"
          fontFamily={'Lalezar'}
          color="primary"
          textTransform={'uppercase'}
          align="center"
        >
          Lesbians Who Tech Bingo!
        </Typography>

        {isMobile ? <PresentedByInCoSmall /> : <PresentedByInCo />}
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
