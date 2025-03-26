import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Button from '../UI_Elements/Button';
import { CloseOutlined } from '@mui/icons-material';
import GmailLogin from '../GmailLogin';
import InvalidBoard from './Content/InvalidBoard';

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
  const theme = useTheme();

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
      <div
        style={{
          display: 'flex',
          padding: theme.spacing(1),
          justifyContent: 'space-between',
        }}
      >
        <DialogTitle>Log in</DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{
            width: 64,
            marginRight: theme.spacing(1),
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent
        sx={{
          display: 'flex',
          margin: theme.spacing(3),
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
                marginBottom: theme.spacing(2),
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
              No thanks, give me a new board
            </Button>
          </>
        ) : (
          <InvalidBoard onClose={onClose} resetBoard={resetBoard} />
        )}
      </DialogContent>
    </Dialog>
  );
};
