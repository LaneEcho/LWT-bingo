import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { subscribeToTopScores } from '../../firebase/firebase-api';
import { Box, Card, Grid, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

function Leaderboard() {
  const { user } = useAuth();
  const [topScores, setTopScores] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = subscribeToTopScores(
      (scores) => {
        setTopScores(scores);
      },
      (error) => {
        setError(error.message);
        console.error(error);
      }
    );

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, [user?.email]);

  const theme = useTheme();

  function getRowColor(index: number) {
    // TODO: Use theme colors...
    const colors = [
      '#46A4DB', // Blue
      '#D03574', // Pink
      '#93C356', // Light Green
      '#5ABCC9', // Light Blue
      '#693E92', // Purple
    ];

    // Cycle through colors for other positions
    return {
      backgroundColor: colors[(index - 1) % colors.length],
      color: '#000000',
    };
  }

  if (error) {
    return (
      <Typography>
        Whoops, something went wrong. Please try refreshing the page!
      </Typography>
    );
  }

  return (
    <Box
      width="434px"
      height="75vh"
      sx={{ background: 'black', padding: '24px', borderRadius: '25px' }}
    >
      <Typography
        variant={'h4'}
        fontFamily={'Lalezar'}
        color="primary"
        textTransform={'uppercase'}
        textAlign={'center'}
        marginBottom={2}
      >
        Leaderboard
      </Typography>
      {topScores.map((row, index) => (
        <Card
          key={index}
          sx={[
            getRowColor(index + 1),
            { borderRadius: '10px  ' },
            { border: row?.id === user?.uid ? `4px solid #FAFF03` : undefined },
            { fontWeight: row?.id === user?.uid ? 'bold' : undefined },
          ]}
        >
          <Grid
            container
            sx={{
              padding: '4px 8px',
            }}
          >
            <Grid item flex={2}>
              {index + 1}
            </Grid>
            <Grid item flex={6}>
              {row?.username}
            </Grid>
            <Grid
              item
              alignItems={'flex-end'}
              flex={4}
              textAlign={'right'}
              marginLeft={2}
            >
              {row.totalScore}
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
}

export default Leaderboard;
