import React from 'react';
import Board from '../components/game_elements/board';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material/';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import Leaderboard from '../components/leaderboard/leaderboard';

export default function Container() {
  const theme = useTheme();

  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        background: theme.palette.background.default,
        height: '100vh',
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
