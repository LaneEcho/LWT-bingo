import React, { useState, useEffect } from 'react';
import Row from './row';
import Phrases from '../phrases';
import { BoardState } from '../../types';

import Button from '@mui/material/Button';

// function for pulling in phrases
// input: none
// output: array of random numbers with no repeats
// create a set so all numbers are unique
// loop to fill set with 24 numbers
// add to set
// return as an array

function pickUniqueNumbers(): number[] {
  let uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < 35) {
    let randomNumber: number = Math.floor(Math.random() * 47) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

const initialBoardState: BoardState = pickUniqueNumbers();

function Board() {
  // state of phrases in beginning to be updated when resetting board
  const [phraseIndex, setPhraseIndex] = useState(initialBoardState);

  // iterate to create rows- an array of JSX elements
  const rows: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    rows.push(<Row row={i + 1} content={null} key={i} phrase={phraseIndex} />);
  }

  // function to reset board - just re-render board
  // will need to unclick boxes
  function resetBoard(): void {
    setPhraseIndex(pickUniqueNumbers());
  }

  return (
    <div className="board">
      <div className="grid">{rows}</div>
      <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={resetBoard}
      >
        Reset Board
      </Button>
    </div>
  );
}

export default Board;
