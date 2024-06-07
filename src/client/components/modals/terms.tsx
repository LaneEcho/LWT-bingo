import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FocusTrap } from '@mui/base/FocusTrap';
import { ConditionsList } from '../../../lib/termsconditions';

type TermsProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermsAndConditions = React.forwardRef(function (
  { close }: TermsProps,
  ref
) {
  const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close((prevViewTerms) => !prevViewTerms);
    }
  };

  const handleClick = () => {
    close((prevViewTerms) => !prevViewTerms);
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
      <ListItem key={key}>
        <ListItemText primary={key} secondary={ConditionsList[key]} />
      </ListItem>
    );
  }

  return (
    <FocusTrap open>
      <Box
        tabIndex={-1}
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
    </FocusTrap>
  );
});

export default TermsAndConditions;
