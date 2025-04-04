import React from 'react';
import { ResetProps } from '../../../types';
import { Box, Typography, Button, Stack } from '@mui/material';
import { FocusTrap } from '@mui/base/FocusTrap';

// there is a bug here where clicking return to board will reset the board

const Reset = React.forwardRef(function (props: ResetProps, ref) {
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
          bgcolor: 'background.paper',
          padding: '1.5rem',
          borderRadius: '8px',
          textAlign: 'center',
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
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              Congratulations! You've been all over the #LWT Summit and saw
              enough stuff to get a BINGO!
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              Submit your score to the leaderboard or just start a new game!
              There’s no limit to the number of games you can play, so go ahead
              and start fresh with a new board!
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
              variant="body1"
              sx={{ mt: '1px' }}
            >
              Looks like you haven't completed any score eligible patterns yet!
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              You can go back and continue this game or reset your board!
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
              Give me a new board
            </Button>
          </Stack>
        )}
      </Box>
    </FocusTrap>
  );
});

export default Reset;
