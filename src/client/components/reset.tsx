import React from 'react';
import { ResetProps } from '../../types';
import { Box, Typography, Button, Link } from '@mui/material';

function Reset(props: ResetProps) {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          bgcolor: 'background.paper',
          padding: '5px',
          borderRadius: '8px',
          textAlign: 'center',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.gameOver ? (
          <div className="about bingo_true">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              🌈 BINGO! 🌈
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: '1px' }}
            >
              You win!
            </Typography>
            <Typography id="modal-modal-description">
              Do you want to play again?
            </Typography>
            <Button
              variant="contained"
              size="small"
              className="resetButton"
              onClick={props.reset}
            >
              Play Again
            </Button>
          </div>
        ) : (
          <div className="about bingo_false">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Not Yet!
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: '1px' }}
            >
              Keep playing, you've got this!
            </Typography>
            {/* <Typography id="modal-modal-description">
            Do you want to play again?
          </Typography> */}
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
              Play Again
            </Button>
          </div>
        )}
      </Box>
    </>
  );
}

export default Reset;
