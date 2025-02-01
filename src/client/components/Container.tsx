import React from 'react';
import Board from '../components/game_elements/board';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material/';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from '../components/leaderboard/leaderboard';
import DarkBG from '../../assets/background/Background_V2.png';
import LightBG from '../../assets/background/Background_V2_Light.png';

export default function Container() {
  const theme = useTheme();

  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${
          theme.palette.mode === 'dark' ? DarkBG : LightBG
        })`,
        backgroundRepeat: 'repeat',
        backgroundSize: '750px 750px',
        backgroundPosition: 'top left',
      }}
    >
      <Header />
      <Box
        display="flex"
        gap={2}
        justifyContent={'center'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Board />
        <Leaderboard />
      </Box>
    </Box>
  );
}
