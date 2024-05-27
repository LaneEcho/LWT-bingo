import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack, List, ListItem } from '@mui/material';
import { FocusTrap } from '@mui/base/FocusTrap';

type HowToPlayProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const HowToPlay = React.forwardRef(function ({ close }: HowToPlayProps, ref) {
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
    <FocusTrap open>
      <Box
        tabIndex={-1}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40vw',
          height: '60vh',
          bgcolor: 'background.paper',
          padding: '1.5rem',
          borderRadius: '8px',
          overflow: 'scroll',
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
            align="center"
            gutterBottom
          >
            How To Play #LWT Bingo
          </Typography>
          <List>
            <ListItem>
              Similar to classic Bingo, the goal is to mark squares on your
              board to achieve a winning pattern. However, we reimagined to game
              to have a #LWT twist!
            </ListItem>
            <ListItem>
              You can play one board at a time. Each board has 25 playable
              squares in a 5x5 square. The middle square is a free space!
            </ListItem>
            <ListItem>
              Each square has a phrase, visual, or experience that might occur
              during the #LWTSummit. If you see or hear that thing happen, click
              on that square on your board to mark it!
            </ListItem>
            <ListItem>
              Once you have enough squares marked to match a winning pattern,
              you can click the "submit board" button to get a score, or keep
              playing to try to match more complicated patterns for more points!
            </ListItem>
            <ListItem>
              Points: Single line, any direction = 25 points # = 80 points "L" =
              45 points "W" = 85 points "T" = 45 points "Blackout" (all the
              squares!) = 125 points!
            </ListItem>
            <ListItem>
              When you submit your board, you have the option to submit your
              email (so we can keep your scores tracked together) and the
              display name you would like to use for the leaderboard.
            </ListItem>
            <ListItem>
              After you submit, reset your board and play again!
            </ListItem>
            <ListItem>
              You can reset your board at any time if you want a fresh start,
              but any marked squares you have will also be reset.
            </ListItem>
          </List>
          <Button
            variant="contained"
            size="small"
            className="resetButton"
            onClick={handleClick}
          >
            Let's Play
          </Button>
        </Stack>
      </Box>
    </FocusTrap>
  );
});

export default HowToPlay;
