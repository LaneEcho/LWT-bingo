import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FocusTrap } from '@mui/base/FocusTrap';
import { ConditionsList } from '../../../util/data/termsConditions';
import { CloseOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type TermsProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermsAndConditions = React.forwardRef(function (
  { close }: TermsProps,
  ref
) {
  const modalRef = useRef(null);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close((prevViewTerms) => !prevViewTerms);
    }
  };

  const handleClick = () => {
    close((prevViewTerms) => !prevViewTerms);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close((prevViewTerms) => !prevViewTerms);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleClose);
      document.removeEventListener('mousedown', handleClickOutside);
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
              Terms of Use
            </Typography>
            <IconButton onClick={handleClick}>
              <CloseOutlined />
            </IconButton>
          </Stack>
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
