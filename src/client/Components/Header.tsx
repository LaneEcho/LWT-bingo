import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import BurgerMenu from './Menu';
import User from './User';
import Unofficial from '../../assets/svg/unofficial.svg';
import UnofficialSmall from '../../assets/svg/unofficialSmall.svg';
import PresentedByInCo from '../../assets/svg/presentedByInCo.svg';
import PresentedByInCoSmall from '../../assets/svg/presentedByInCoSmall.svg';

interface HeaderProps {
  toggleTheme?: () => void;
}

const Header = React.forwardRef(function ({ toggleTheme }: HeaderProps, ref) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();

  const mode = theme.palette.mode;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isMobileSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      gap={isMobile ? 1 : 5}
      py={1}
      px={isMobile ? 2 : ''}
      width="100vw"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ backgroundColor: 'transparent', zIndex: 99 }}
    >
      {isMobile ? (
        <UnofficialSmall aria-hidden="true" />
      ) : (
        <Unofficial aria-hidden="true" />
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        justifyContent={isMobile ? 'flex-start' : 'space-between'}
        zIndex={-5}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Typography
          variant="h1"
          fontFamily={'Lalezar'}
          color={theme.palette.primaryPink.main}
          textTransform={'uppercase'}
          align="center"
          zIndex={-10}
          // keeping in case we re-name the game
          // sx={{
          //   fontSize: {
          //     xs: '2rem',
          //     sm: '4rem',
          //     md: '4rem',
          //     lg: '5rem',
          //     xl: '6rem',
          //   },
          // }}
        >
          Lesbians Who Tech Bingo
        </Typography>

        {isMobile ? (
          <PresentedByInCoSmall aria-hidden="true" />
        ) : (
          <PresentedByInCo aria-hidden="true" />
        )}
      </Box>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu-button"
          aria-controls={open ? 'menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ color: theme.palette.background.secondary }} />
        </IconButton>
        <BurgerMenu
          handleClose={handleClose}
          toggleTheme={toggleTheme}
          anchorEl={anchorEl}
          open={open}
        />
        <User />
      </Box>
    </Box>
  );
});

export default Header;
