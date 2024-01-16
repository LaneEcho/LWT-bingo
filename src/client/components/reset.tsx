import React from 'react';
import { ResetProps } from '../../types';
import { Box, Typography, Button, Stack } from '@mui/material';

function Reset(props: ResetProps) {
  return (
    <>
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
          // overflow: 'scroll',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {props.gameOver ? (
          <Stack
            className="about bingo_true"
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              🌈 BINGO! 🌈
            </Typography>
            <Typography id="modal-modal-description">
              You've been all over the #LWT Summit and saw enough stuff to get a
              bingo! Submit your score to the leaderboard or start a new game!
            </Typography>
            <Button
              variant="contained"
              size="small"
              className="resetButton"
              onClick={props.reset}
              sx={{
                width: '8rem',
              }}
            >
              Play Again
            </Button>
          </Stack>
        ) : (
          <Stack
            className="about bingo_false"
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Oops!
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: '1px' }}
            >
              Looks like you don't have any score eligible patterns. You can go
              back and continue this game or reset your board.
            </Typography>
            <Button
              variant="contained"
              size="medium"
              className="resetButton"
              onClick={props.onClose}
            >
              Continue Playing
            </Button>
            <Button
              variant="contained"
              size="small"
              className="resetButton"
              onClick={props.reset}
            >
              Reset Board
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
}

export default Reset;
