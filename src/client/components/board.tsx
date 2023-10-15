import React, { useState, useEffect } from 'react';
import Phrases from '../phrases';

import Button from '@mui/material/Button';

function Board() {
  // is there any state?
  // render the rows
  return (
    <div className="board">
      <Button
        variant="contained"
        size="large"
        className="resetButton"
        onClick={null}
      >
        Reset Board
      </Button>
    </div>
  );
}

export default Board;
