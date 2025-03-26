import * as React from 'react';

import { Typography } from '@mui/material';
import Button from '../../UI_Elements/Button';

interface Props {
  onClose: () => void;
  resetBoard: () => void;
}

const InvalidBoard = ({ onClose, resetBoard }: Props) => {
  return (
    <>
      <Typography variant="h4">
        Oops! It looks like you don’t have any winning Bingo patterns yet.
      </Typography>
      <Typography variant="h4">
        You can return to your board to continue playing or reset for a fresh
        Bingo board!*
      </Typography>
      <Typography variant="overline">
        *Once you reset your board, you will not be able to get the old one
        back.
      </Typography>
      <Button variant="primary" onClick={onClose}>
        Return to my board
      </Button>
      <Button variant="secondary" onClick={resetBoard}>
        Get New Board
      </Button>
    </>
  );
};

export default InvalidBoard;
