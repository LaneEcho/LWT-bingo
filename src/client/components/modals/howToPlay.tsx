import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

type HowToPlayProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const HowToPlay: React.FC<HowToPlayProps> = ({ close }) => {
  const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close((prevOpenHowTo) => !prevOpenHowTo);
    }
  };

  const handleClick = () => {
    close((prevOpenHowTo) => !prevOpenHowTo);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vw',
        bgcolor: 'background.paper',
        padding: '1.5rem',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          gutterBottom
        >
          How To Play #LWT Bingo
        </Typography>
        <Typography variant="body1" gutterBottom>
          Similar to classic Bingo, the goal is to mark squares on your board to
          achieve a winning pattern. However, we reimagined to game to have a
          #LWT twist!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can play one board at a time. Each board has 25 playable squares
          in a 5x5 square. The middle square is a free space!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Each square has a phrase, visual, or experience that might occur
          during the #LWTSummit. If you see or hear that thing happen, click on
          that square on your board to mark it!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Once you have enough squares marked to match a winning pattern, you
          can click the "submit board" button to get a score, or keep playing to
          try to match more complicated patterns for more points!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Points: Single line, any direction = 25 points # = 80 points "L" = 45
          points "W" = 85 points "T" = 45 points "Blackout" (all the squares!) =
          125 points!
        </Typography>
        <Typography variant="body1" gutterBottom>
          When you submit your board, you have the option to submit your email
          (so we can keep your scores tracked together) and the display name you
          would like to use for the leaderboard.
        </Typography>
        <Typography variant="body1" gutterBottom>
          After you submit, reset your board and play again!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can reset your board at any time if you want a fresh start, but
          any marked squares you have will also be reset.
        </Typography>
        <Button
          variant="contained"
          size="small"
          className="resetButton"
          onClick={handleClick}
          sx={{}}
        >
          Let's Play
        </Button>
      </Stack>
    </Box>
  );
};

export default HowToPlay;
