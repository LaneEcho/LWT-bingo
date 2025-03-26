import React from 'react';
import Board from './Game_Elements/Board';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material/';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from './Leaderboard/Leaderboard';
// import DarkBG from '../../assets/background/Background_V2.png';
// import LightBG from '../../assets/background/Background_V2_Light.png';

export default function Container() {
  const theme = useTheme();

  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      height={'100vh'}
      width={'100wv'}
      display="flex"
      flexDirection="column"
      alignItems={'center'}
      sx={{
        backgroundColor: theme.palette.background.default,
        // commenting this out so it is easy to update background image in the future
        // backgroundImage: `url(${
        //   theme.palette.mode === 'dark' ? DarkBG : LightBG
        // })`,
        // backgroundRepeat: 'repeat',
        // backgroundSize: `${isMobile ? '350px 350px' : '750px 750px'}`,
        // backgroundPosition: 'top left',
        // overflowY: 'auto',
        // padding: '1rem',
      }}
    >
      <Header />
      <Box
        display="flex"
        gap={2}
        justifyContent={'center'}
        alignItems={'flex-start'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Board />
        <Leaderboard />
      </Box>
    </Box>
  );
}
