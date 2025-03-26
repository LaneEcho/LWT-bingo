import React, { FunctionComponent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LeaderboardCard from './LeaderboardCard';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import GmailLogin from '../GmailLogin';
import { CloseOutlined } from '@mui/icons-material';

interface LeaderboardUserCardProps {}

const LeaderboardUserCard: FunctionComponent<LeaderboardUserCardProps> = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const [isLoginOpen, setLoginOpen] = React.useState<boolean>(false);

  const { rank, totalScore, uid, username } = user || {};

  if (!user?.email) {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <Button
          variant="text"
          sx={{
            flex: 1,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 16,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primaryPurple.main,
            ':hover': {
              backgroundColor: theme.palette.primaryPurple.dark,
            },
            borderRadius: 10,
          }}
          onClick={() => setLoginOpen(true)}
        >
          Sign in to track your scores!
        </Button>
        {isLoginOpen && (
          <Dialog open={isLoginOpen}>
            <DialogTitle
              sx={{
                display: 'flex',
              }}
            >
              Login
              <IconButton
                onClick={() => setLoginOpen(false)}
                sx={{
                  marginLeft: 'auto',
                }}
              >
                <CloseOutlined />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography
                sx={{
                  marginBottom: theme.spacing(2),
                }}
              >
                {user?.email
                  ? 'Thanks for logging in!'
                  : 'Login below to start tracking your scores in the leaderboard!'}
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <GmailLogin onSuccess={handleSignInSuccess} />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  if (user?.email && (rank === -1 || !rank)) {
    return (
      <Typography
        sx={{
          backgroundColor: theme.palette.primaryPurple.light,
          borderRadius: 10,
          padding: theme.spacing(1),
          textAlign: 'center',
        }}
      >
        Submit a Bingo to score points!
      </Typography>
    );
  }

  if (!user.username) {
    return null;
  }

  return (
    <LeaderboardCard
      score={{
        id: uid ?? '',
        totalScore: isNaN(totalScore) ? 0 : totalScore,
        username: username ?? '',
      }}
      rank={rank}
    />
  );

  function handleSignInSuccess() {
    setLoginOpen(false);
  }
};

export default LeaderboardUserCard;
