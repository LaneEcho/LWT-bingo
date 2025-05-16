import React, { FunctionComponent } from 'react';
import { Card, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Score } from './Leaderboard';

interface LeaderboardCardProps {
  index?: number;
  score: Score;
  userId?: string;
  // Used to show current user's score
  rank?: number | string;
}

// this component makes up the name displays on the leaderboard

const LeaderboardCard: FunctionComponent<LeaderboardCardProps> = ({
  index,
  score,
  userId,
  rank,
}) => {
  const theme = useTheme();

  return (
    <Card
      key={index}
      sx={[
        getRowColor(index + 1),
        { borderRadius: '10px' },
        {
          border:
            score?.id === userId
              ? `4px solid ${theme.palette.primaryPurple.main}`
              : undefined,
        },
        { fontWeight: score?.id === userId || !!rank ? 'bold' : undefined },
        rank && {
          backgroundColor: `${theme.palette.primaryPurple.main}`,
          color: `${theme.palette.common.white}`,
        },
      ]}
    >
      <Grid
        container
        sx={{
          padding: theme.spacing(0.5, 1),
        }}
      >
        <Grid flex={2}>{rank ?? index + 1 ?? ''}</Grid>

        <Grid flex={6} sx={{ textOverflow: 'ellipsis' }}>
          {score?.username ?? '...'}
        </Grid>
        <Grid
          alignItems={'flex-end'}
          flex={4}
          textAlign={'right'}
          marginLeft={2}
        >
          {isNaN(score.totalScore) ? 0 : score.totalScore}
        </Grid>
      </Grid>
    </Card>
  );

  function getRowColor(index: number) {
    // array of colors that will change depending on color mode
    // currently they are the same but this gives us flexibility
    let colors = [];

    theme.palette.mode === 'dark'
      ? (colors = [
          theme.palette.primaryPink.main,
          theme.palette.primaryIceBlue.main,
        ])
      : (colors = [
          theme.palette.primaryPink.main,
          theme.palette.primaryIceBlue.main,
        ]);

    // Cycle through colors for other positions.
    // Overkill for just two colors, but leaving in case we decide to add a third or more in the future.
    return {
      backgroundColor: colors[(index - 1) % colors.length],
      color: `${theme.palette.common.black}`,
    };
  }
};

export default LeaderboardCard;
