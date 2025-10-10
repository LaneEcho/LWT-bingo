import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import User from './User';
import useMediaQuery from '@mui/material/useMediaQuery';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import BurgerMenu from './Menu';
// import Unofficial from '../../assets/svg/unofficial.svg';
// import UnofficialSmall from '../../assets/svg/unofficialSmall.svg';
// import PresentedByInCo from '../../assets/svg/presentedByInCo.svg';
// import PresentedByInCoSmall from '../../assets/svg/presentedByInCoSmall.svg';

interface HeaderProps {
  toggleTheme?: () => void;
}

const Header = React.forwardRef(function ({ toggleTheme }: HeaderProps, ref) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const open = Boolean(anchorEl);
  const theme = useTheme();
  const isDark: boolean = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLandscape: boolean = useMediaQuery('(orientation: landscape)');
  const isTablet: boolean = useMediaQuery(theme.breakpoints.down('lg'));
  const isLandscapeMobile: boolean = isLandscape && isTablet;

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box
      // gap={isMobile || isLandscapeMobile ? 1 : 5}
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
        justifyContent={isMobile ? 'flex-start' : 'space-between'}
        zIndex={-5}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Typography
          variant="h1"
          fontFamily="Staatliches"
          textTransform="uppercase"
          align="center"
          sx={{
            position: 'relative',
            display: 'inline-block',
            filter: 'drop-shadow(5px 5px 4px #03056B)',
            WebkitTextStroke: `${isMobile ? '.15px' : '.5px'} ${'#231f20'}`,
            // marginTop: `${isMobile ? '5px' : '.5px'}`,
            marginBottom: '5px',
          }}
        >
          <span
            style={{
              color: '#DAE3F8',
            }}
          >
            The People's Battle of Richmond
          </span>

          {/* top half color*/}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '55%',
              color: '#DF2634',
              overflow: 'hidden',
            }}
          >
            The People's Battle of Richmond
          </span>
        </Typography>

        <Typography
          variant="h2"
          fontFamily={'KC Neue Teeth, Poppins'}
          color={
            isDark
              ? theme.palette.secondary.contrastText
              : theme.palette.primary.main
          }
          align="center"
          zIndex={-10}
          sx={{
            WebkitTextStroke: `${isMobile ? '.25px' : '1px'} ${
              theme.palette.primary.main
            }`,
          }}
        >
          an online bingo game presented by
        </Typography>

        {/* {isMobile ? (
            <PresentedByInCoSmall aria-hidden="true" />
          ) : (
            <PresentedByInCo aria-hidden="true" />
          )} */}

        <Typography
          variant="h2"
          fontFamily={'KC Neue Teeth, Poppins'}
          color={
            isDark
              ? theme.palette.secondary.contrastText
              : theme.palette.primary.main
          }
          align="center"
          zIndex={-10}
          sx={{
            WebkitTextStroke: `${isMobile ? '.25px' : '1px'} ${
              isDark
                ? theme.palette.primary.main
                : theme.palette.primaryGray.main
            }`,
          }}
        >
          InCo. and River City Roller Derby
        </Typography>
      </Box>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {/* BURGER MENU - OPTIONAL */}
        {/* <IconButton
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
        /> */}
        <User />
      </Box>
    </Box>
  );
});

export default Header;
