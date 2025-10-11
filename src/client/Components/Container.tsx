import React from 'react';
import Board from './Game_Elements/Board';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material/';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from './Leaderboard/Leaderboard';
import DarkBG from '../../assets/background/PBR_BG_Dark.png';
import LightBG from '../../assets/background/PBR_BG_Light.png';

export default function Container() {
  const theme = useTheme();

  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  const isLandscape: boolean = useMediaQuery('(orientation: landscape)');

  const isTablet: boolean = useMediaQuery(theme.breakpoints.down('lg'));

  const isLandscapeMobile: boolean = isLandscape && isTablet;

  return (
    <Box
      height={'100vh'}
      width={'100wv'}
      display="flex"
      flexDirection="column"
      alignItems={'center'}
      overflow={'auto'}
      sx={{
        backgroundColor: theme.palette.background.default,
        // commenting this out so it is easy to update background image in the future
        backgroundImage: `url(${
          theme.palette.mode === 'dark' ? DarkBG : LightBG
        })`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${isMobile ? '350px 350px' : '750px 750px'}`,
        backgroundPosition: 'top left',
        overflowY: 'auto',
        paddingX: '1rem',
      }}
    >
      <Header />
      <Box
        display="flex"
        gap={2}
        justifyContent={'center'}
        /* UNCOMMENT FOR LEADERBOARD NEXT TO BOARD */
        // alignItems={isMobile || isLandscapeMobile ? 'center' : 'flex-start'}
        // flexDirection={isMobile || isLandscapeMobile ? 'column' : 'row'}
        alignItems={'center'} // leaderboard below board all screen sizes
        flexDirection={'column'} // leaderboard below board all screen sizes
      >
        <Board />
        <Leaderboard />
      </Box>
    </Box>
  );
}
