import React from 'react';
import {
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Button from '../UI_Elements/Button';
import { getAuth } from 'firebase/auth';
import { submitScore, updateUser } from '../../../firebase/firebase-api';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../../hooks/useAuth';
import useAnalytics, { EventName } from '../../hooks/useAnalytics';

type UpdateUsernameModalProps = {
  score: number;
  isOpen?: boolean;
  onClose?: () => void;
  resetBoard: () => void;
};

export const UpdateUsernameModal = ({
  isOpen,
  onClose,
  score,
  resetBoard,
}: UpdateUsernameModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const auth = getAuth();
  const functions = getFunctions();
  const track = useAnalytics();
  const { user, setUsername: updateGlobalUsername } = useAuth();

  const [username, setUsername] = React.useState<string>();
  const [isOptedIn, setIsOptedIn] = React.useState<boolean>(false);
  const [isBusy, setIsBusy] = React.useState<boolean>();

  const generateRandomUsername = httpsCallable(
    functions,
    'generateRandomUsername'
  );

  React.useEffect(() => {
    if (!user?.username) {
      getRandomUsername();
    } else {
      setUsername(user.username);
    }
  }, []);

  interface UsernameResult {
    data: string;
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
        <Typography
          variant="h5"
          sx={{
            marginBottom: '16px',
          }}
        >
          {/* TODO: copy from design says: 'Got it - thanks for creating a profile with your Gmail or GitHub.'
          But I'm not sure how easy it is to know which they used.
           */}
          Got it - thanks for creating a profile!
        </Typography>
        <Typography variant="h5">
          <strong>Board score: {score} points</strong>
        </Typography>
        <Typography variant={'h5'}>
          Input desired display name or nickname for the Leaderboard
        </Typography>
        <Typography variant={'overline'}>
          Please note: this name will be visible to all Bingo players
        </Typography>
        <div>
          <TextField
            name="username"
            disabled={isBusy}
            placeholder={isBusy ? 'Getting random name...' : undefined}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            sx={{ width: '600px' }}
          />
          <div style={{ flex: 1 }} />
          <Button variant="secondary" onClick={handleGenerateRandom}>
            Random username
          </Button>
        </div>
        <div style={{ marginTop: '24px' }}>
          <FormControlLabel
            control={
              <Checkbox checked={isOptedIn} onChange={handleOnCheckmark} />
            }
            label="Want to stay up-to-date with InCo? Check this box to join our
            mailing list"
          />
        </div>
        <Button variant="primary" onClick={handleSubmit}>
          Submit to the Leaderboard
        </Button>
        <Button variant="secondary" onClick={handleSubmit}>
          No thanks, give me a new board
        </Button>
      </DialogContent>
    </Dialog>
  );

  async function getRandomUsername() {
    try {
      setIsBusy(true);
      const generatedUsername = await generateRandomUsername();

      setUsername(generatedUsername.data as string);
    } catch (error) {
      setUsername('');
      console.error('Error fetching random username:', error);
    } finally {
      setIsBusy(false);
    }
  }

  function handleGenerateRandom() {
    getRandomUsername();
  }

  function handleOnCheckmark(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOptedIn(e.target.checked);
  }

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateUser(user?.uid, username, isOptedIn);
        track(EventName.USERNAME_UPDATED, { userId: user?.uid, username });
        await submitScore(user?.uid, score);
        track(EventName.SCORE_SUBMITTED, { userId: user?.uid, score });
        updateGlobalUsername(username);
        resetBoard();
        console.log('Username, score and iOptedIn saved!');
        onClose();
      } catch (error) {
        console.error('Error saving username:', error);
      }
    }
  }
};
