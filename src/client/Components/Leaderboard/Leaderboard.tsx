import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { subscribeToTopScores } from '../../../firebase/firebase-api';
import { Box, Divider, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardHeader from './LeaderboardHeader';
import KoFiWidget from '../KoFiWidget';
import LeaderboardUserCard from './LeaderboardUserCard';
import Logo from '../../../assets/svg/carabinerLogoSVG.svg';
import { useColorScheme } from '@mui/material';

export interface Score {
  id: string;
  totalScore: number;
  username: string;
}

function Leaderboard() {
  const { user } = useAuth();
  const [topScores, setTopScores] = useState<Score[]>([]);
  const [error, setError] = useState<string>('');

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // need to pass to widget
  // difficult to change widget background dynamically
  const { mode } = useColorScheme();

  useEffect(() => {
    const unsubscribe = subscribeToTopScores(
      (scores) => {
        setTopScores(scores as Score[]);
      },
      (error) => {
        setError(error.message);
        console.error(error);
      }
    );

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, [user?.email]);

  if (error) {
    return (
      <Typography>
        Whoops, something went wrong. Please try refreshing the page!
      </Typography>
    );
  }

  return (
    <Box
      width={isMobile ? '90vw' : '27rem'}
      min-height={isMobile ? '48rem' : '67vh'}
      textAlign={'center'}
      sx={{
        background: theme.palette.background.default,
        padding: '24px',
        marginTop: '4px',
        border: `3px solid ${
          theme.palette.mode === 'dark'
            ? theme.palette.primaryIceBlue.main // dark mode
            : theme.palette.primaryPink.main // light mode
        }`,
        borderRadius: '25px',
      }}
    >
      <Typography
        variant={'h4'}
        fontFamily={'Lalezar'}
        color={
          theme.palette.mode === 'dark'
            ? theme.palette.primaryIceBlue.main // dark mode
            : theme.palette.primaryPink.main // light mode
        }
        textTransform={'uppercase'}
        textAlign={'center'}
        gutterBottom={false}
      >
        Leaderboard
      </Typography>
      {/* Use <img /> if not using svg */}
      {/* <img src={Logo} style={{ height: '50px', alignSelf: 'center' }} />  */}
      <Logo aria-hidden="true" />
      <LeaderboardHeader label="Your Current Score:" />
      <LeaderboardUserCard />
      <Divider
        sx={{
          backgroundColor: theme.palette.primaryPink.main,
          margin: theme.spacing(2, 8, 1),
        }}
      />
      <LeaderboardHeader label="Current Top 10 Players:" />
      {topScores.map((row, index) => {
        return (
          <LeaderboardCard
            key={index}
            score={row}
            index={index}
            userId={user?.uid}
          />
        );
      })}

      <div
        style={{
          display: 'flex',
          paddingTop: theme.spacing(2),
        }}
      >
        <KoFiWidget mode={mode} />
      </div>
    </Box>
  );
}

export default Leaderboard;
