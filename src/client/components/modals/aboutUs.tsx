import React, { SetStateAction, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

type AboutUsProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const AboutUs: React.FC<AboutUsProps> = ({ close }) => {
  const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close((prevOpenAbout) => !prevOpenAbout);
    }
  };

  const handleClick = () => {
    close((prevOpenAbout) => !prevOpenAbout);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  return (
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
          gutterBottom
        >
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Button
          variant="contained"
          size="small"
          className="resetButton"
          onClick={handleClick}
          sx={{
            width: '8rem',
          }}
        >
          Let's Play
        </Button>
      </Stack>
    </Box>
  );
};

export default AboutUs;
