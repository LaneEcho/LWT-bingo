import React from 'react';
import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Button from '../UI_Elements/Button';
import { useAuth } from '../../hooks/useAuth';
import { submitScore } from '../../../firebase/firebase-api';
import InvalidBoard from './Content/InvalidBoard';
import useAnalytics, { EventName } from '../../hooks/useAnalytics';

type ScoreSubmissionModalProps = {
  score: number;
  isOpen?: boolean;
  onClose?: () => void;
  resetBoard: () => void;
};

export const ScoreSubmissionModal = ({
  isOpen,
  onClose,
  score,
  resetBoard,
}: ScoreSubmissionModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user } = useAuth();
  const track = useAnalytics();

  const [isOptedIn, setIsOptedIn] = React.useState<boolean>(false);

  function handleOnCheckmark(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOptedIn(e.target.checked);
  }

  async function handleSubmitScore() {
    try {
      await submitScore(user?.uid, score);
      track(EventName.SCORE_SUBMITTED, { userId: user?.uid, score });
      resetBoard();
      onClose();
    } catch (error) {
      throw new Error('Failed to submit score.');
    }
  }

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
        <Stack spacing={2} alignItems={'center'}>
          {score !== undefined ? (
            <>
              <Typography variant="h5">
                Congratulations {user ? user.username : ''}!!! You earned
                another Bingo!
              </Typography>
              <Typography variant="h5">
                <strong>Board score: {score} points</strong>
              </Typography>
              <Button variant="primary" onClick={handleSubmitScore}>
                Submit score to leaderboard
              </Button>

              {/* 💡 UX idea: For v2 we could add the opt in here if user didn't opt in */}
              {/* <FormControlLabel
              control={
                <Checkbox checked={isOptedIn} onChange={handleOnCheckmark} />
              }
              label="Want to stay up-to-date with InCo? Check this box to join our
            mailing list"
            /> */}
              <Button variant="secondary" onClick={resetBoard}>
                No thanks, give me a new board
              </Button>
            </>
          ) : (
            <InvalidBoard onClose={onClose} resetBoard={resetBoard} />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
