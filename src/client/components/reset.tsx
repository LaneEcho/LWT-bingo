import React from 'react';
import { ResetProps } from '../../types';
import { Box, Typography, Button, Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          About Us
        </Typography>
        <div className="about-lane">
          <Typography
            id="modal-modal-description"
            variant="h6"
            sx={{ mt: '1px' }}
          >
            Lane Hamilton
          </Typography>
          <Typography id="modal-modal-description">
            I'm a Frontend Software Engineer with a strong passion for crafting
            exceptional user experiences. I specialize in developing frontend
            JavaScript applications using React, and I like to add a dash of
            Sass for that extra flair. 🌈​​ {<br></br>} I'm proud to have shared
            my knowledge and experience by presenting on UX Design Best
            Practices as part of Codesmith, Jeeny, and Bractlet's Tech Talk
            Series. 💪🏻​ {<br></br>} I'm always eager to connect and discuss
            exciting projects or ideas. Feel free to reach out I'm ready to
            chat! ✉️​ If you're curious about my ongoing projects, you can check
            them out on my GitHub profile ✨​
          </Typography>
          <Button
            variant="contained"
            size="small"
            className="resetButton"
            onClick={props.onClick}
          >
            Play Again
          </Button>
        </div>
      </Box>
    </>
  );
}

export default Reset;
