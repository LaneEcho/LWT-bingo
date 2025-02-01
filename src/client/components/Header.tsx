import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import BurgerMenu from './menu';
import User from './user';
import PresentedGayme from '../../assets/svg/gayme/PresentedGayme.svg';
import PresentedGaymeSmall from '../../assets/svg/gayme/PresentedGaymeSmall.svg';
import PresentedGaymeLight from '../../assets/svg/gayme/PresentedGaymeLight.svg';
import PresentedGaymeLightSmall from '../../assets/svg/gayme/PresentedGaymeLightSm.svg';

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
      gap={5}
      py={1}
      px={isMobile ? 2 : ''}
      width="100vw"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ backgroundColor: 'transparent', zIndex: 99 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        justifyContent={'space-between'}
        zIndex={-5}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Typography
          variant="h1"
          fontFamily={'Lalezar'}
          color={theme.palette.primary.main}
          textTransform={'uppercase'}
          align="center"
          zIndex={-10}
        >
          Big Gayme Bingo
        </Typography>

        {isMobile ? (
          mode === 'dark' ? (
            <PresentedGaymeSmall aria-hidden="true" />
          ) : (
            <PresentedGaymeLightSmall aria-hidden="true" />
          )
        ) : mode === 'dark' ? (
          <PresentedGayme aria-hidden="true" />
        ) : (
          <PresentedGaymeLight aria-hidden="true" />
        )}
      </Box>

      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        // alignSelf={'flex-start'}
      >
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
