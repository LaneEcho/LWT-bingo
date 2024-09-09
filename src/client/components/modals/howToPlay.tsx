import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { FocusTrap } from '@mui/base/FocusTrap';
import { CloseOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type HowToPlayProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const HowToPlay = React.forwardRef(function ({ close }: HowToPlayProps, ref) {
  const modalRef = useRef(null);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // check for darkMode in localStorage (for images)
  const darkMode: boolean = localStorage.getItem('darkMode') === 'true';

  const keydown = (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      close((prevOpenHowTo) => !prevOpenHowTo);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close((prevOpenHowTo) => !prevOpenHowTo);
    }
  };

  const handleClick = () => {
    close((prevOpenHowTo) => !prevOpenHowTo);
  };

  const hashtagImgUrl = (darkMode: boolean) => {
    if (darkMode) {
      return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Dark%20Mode_%23.png?alt=media&token=0fbe217b-af07-45a7-84e0-9a3b76af2ffb';
    }
    return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Light%20Mode_%23.png?alt=media&token=688c4c7d-33e4-4be3-9b4e-d74879fd4a99';
  };

  const elImgUrl = (darkMode: boolean) => {
    if (darkMode) {
      return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Dark%20Mode_L.png?alt=media&token=5a5f2615-e2e7-43ab-8bd8-f07e6078e3d1';
    }
    return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Light%20Mode_L.png?alt=media&token=37150466-a15a-4528-a432-7de4d77eb708';
  };

  const dubyaImgUrl = (darkMode: boolean) => {
    if (darkMode) {
      return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Dark%20Mode_W.png?alt=media&token=c7bf0f85-17f1-483d-b6cd-1cc40839edb3';
    }
    return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Light%20Mode_W.png?alt=media&token=1ee0cedd-6b5a-4330-aa45-5b8e57cb9049';
  };

  const teeImgUrl = (darkMode: boolean) => {
    if (darkMode) {
      return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Dark%20Mode_T.png?alt=media&token=0e6be9c2-7109-47f4-85ac-fa13125a27fe';
    }
    return 'https://firebasestorage.googleapis.com/v0/b/inco-games.appspot.com/o/Light%20Mode_T.png?alt=media&token=f56fe2dd-99e7-4186-b1f8-0776df56f206';
  };

  useEffect(() => {
    document.addEventListener('keydown', keydown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FocusTrap open>
      <Box
        ref={modalRef}
        tabIndex={-1}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100vw' : 'auto',
          height: isMobile ? '85vh' : '60vh',
          bgcolor: 'background.paper',
          padding: '1.5rem',
          borderRadius: '8px',
          overflow: 'scroll',
          textAlign: 'center',
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" spacing={2} justifyContent="space-evenly">
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
            >
              How To Play #LWT Bingo
            </Typography>
            <IconButton onClick={handleClick}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            Similar to classic Bingo, the goal is to mark squares on your board
            to achieve a winning pattern. However, we reimagined to game to have
            a #LWT twist!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            You can play one board at a time. Each board has 25 playable squares
            in a 5x5 square. The middle square is a free space!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            Each square has a phrase, visual, or experience that might occur
            during the #LWTSummit. If you see or hear that thing happen, click
            on that square on your board to mark it!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            Once you have enough squares marked to match a winning pattern, you
            can click the "submit board" button to get a score, or keep playing
            to try to match more complicated patterns for more points!
          </Typography>
          <Stack>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: '1px' }}
            >
              Points:
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              Single line, any direction = 25 points
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              # = 80 points
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              "L" = 45 points
            </Typography>{' '}
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              "W" = 85 points
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              "T" = 45 points
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: '1px' }}
            >
              "Blackout" (all the squares!) = 125 points!
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: '15px' }}>
              <Box
                component="img"
                sx={{
                  height: isMobile ? 64 : 128,
                  width: isMobile ? 64 : 128,
                  mr: 2,
                  // maxHeight: { xs: 128, md: 167 },
                  // maxWidth: { xs: 128, md: 250 },
                }}
                alt="Diagram of the hashtag layout, with the second and fourth columns and rows clicked."
                src={hashtagImgUrl(darkMode)}
              />
              <Box
                component="img"
                sx={{
                  height: isMobile ? 64 : 128,
                  width: isMobile ? 64 : 128,
                  mr: 2,
                  // maxHeight: { xs: 128, md: 167 },
                  // maxWidth: { xs: 128, md: 250 },
                }}
                alt="Diagram of the L layout, with the left side and bottom clicked."
                src={elImgUrl(darkMode)}
              />
              <Box
                component="img"
                sx={{
                  height: isMobile ? 64 : 128,
                  width: isMobile ? 64 : 128,
                  mr: 2,
                  // maxHeight: { xs: 128, md: 167 },
                  // maxWidth: { xs: 128, md: 250 },
                }}
                alt="Diagram of the W layout, with the first, third, and fifth columns and the bottom clicked."
                src={dubyaImgUrl(darkMode)}
              />
              <Box
                component="img"
                sx={{
                  height: isMobile ? 64 : 128,
                  width: isMobile ? 64 : 128,
                  mr: 2,
                  // maxHeight: { xs: 128, md: 167 },
                  // maxWidth: { xs: 128, md: 250 },
                }}
                alt="Diagram of the T layout, with the top and the third column clicked."
                src={teeImgUrl(darkMode)}
              />
            </Stack>
          </Stack>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            When you submit your board, you have the option to submit your email
            (so we can keep your scores tracked together) and the display name
            you would like to use for the leaderboard.
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            After you submit, reset your board and play again!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: '1px' }}
          >
            You can reset your board at any time if you want a fresh start, but
            any marked squares you have will also be reset.
          </Typography>
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
