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
import Logo from '../../../assets/svg/Logo.svg';
import CarabinerLogo from '../logos/CarabinerLogo';

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
      sx={{
        background: theme.palette.background.default,
        padding: '24px',
        marginTop: '4px',
        border: `1px solid ${theme.palette.primaryPurple.main}`,
        borderRadius: '25px',
      }}
    >
      <Typography
        variant={'h4'}
        fontFamily={'Lalezar'}
        color="primary"
        textTransform={'uppercase'}
        textAlign={'center'}
        gutterBottom={false}
      >
        Leaderboard
      </Typography>
      <CarabinerLogo />
      <LeaderboardHeader label="Your Current Score:" color="primary" />
      <LeaderboardUserCard />
      <Divider
        sx={{
          backgroundColor: theme.palette.primary.main,
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
        <KoFiWidget />
      </div>
    </Box>
  );
}

export default Leaderboard;
