import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { ConditionsList } from '../../../lib/termsconditions';

type TermsProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermsAndConditions: React.FC<TermsProps> = ({ close }) => {
  const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close((prevOpenHowTo) => !prevOpenHowTo);
    }
  };

  const handleClick = () => {
    close((prevOpenHowTo) => !prevOpenHowTo);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  const listItems: any = [];

  for (const key in ConditionsList) {
    listItems.push(
      <ListItem>
        <ListItemText primary={key} secondary={ConditionsList[key]} />
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vw',
        height: '60%',
        bgcolor: 'background.paper',
        padding: '1.5rem',
        borderRadius: '8px',
        textAlign: 'center',
        overflow: 'scroll',
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Terms of Use
        </Typography>
        <List
          sx={{
            overflow: 'scroll',
          }}
        >
          {listItems}
        </List>
        <Button
          variant="contained"
          size="small"
          className="resetButton"
          onClick={handleClick}
          sx={{
            width: '8rem',
          }}
        >
          Got it!
        </Button>
      </Stack>
    </Box>
  );
};

export default TermsAndConditions;
