import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Button from '../Button';
import { GitHub, Google } from '@mui/icons-material';
import GmailLogin from '../GmailLogin';
import InvalidBoard from './content/InvalidBoard';

type LoginModalProps = {
  score: number;
  isOpen?: boolean;
  onClose?: () => void;
  resetBoard: () => void;
  onLoginSuccess: () => void;
};

export const LoginModal = ({
  isOpen,
  onClose,
  score,
  resetBoard,
  onLoginSuccess,
}: LoginModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Dialog
      open={isOpen}
      fullScreen={isMobile}
      onClose={onClose}
      maxWidth={'md'}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          border: `3px solid #7030A0`,
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          margin: '60px 24px',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {score !== undefined ? (
          <>
            <Typography
              variant="h5"
              sx={{
                marginBottom: '16px',
              }}
            >
              Congratulations!!! You earned a Bingo at the #LWTSummit! Submit
              your score to the Leaderboard by logging in below.
            </Typography>
            <Typography variant="h5">
              <strong>Board score: {score} points</strong>
            </Typography>
            <GmailLogin onSuccess={onLoginSuccess} />
            {/* TODO: Implement Github login */}
            {/* <Button
              variant="primary"
              startIcon={<GitHub />}
              onClick={() => console.log("github clicked")}
            >
              Github Login
            </Button> */}
            <Button variant="secondary" onClick={resetBoard}>
              No thanks, just reset my board
            </Button>
          </>
        ) : (
          <InvalidBoard onClose={onClose} resetBoard={resetBoard} />
        )}
      </DialogContent>
    </Dialog>
  );
};
