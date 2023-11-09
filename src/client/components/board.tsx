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

// gettting a number so we don't have to hard code
let length = Object.keys(Phrases).length;

function pickUniqueNumbers(): number[] {
  let uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size <= 25) {
    let randomNumber: number = Math.floor(Math.random() * length) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

// initial state
function initialState() {
  const phrases: number[] = pickUniqueNumbers();
  localStorage.setItem('items', JSON.stringify(phrases));
  return phrases;
}

function Board() {
  // either going to pull from local storage if real, or invoke initial state
  const [phraseIndex, setPhraseIndex] = useState(
    JSON.parse(localStorage.getItem('items')) || initialState()
  );

  // iterate to create rows- an array of JSX elements
  const rows: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    rows.push(<Row row={i + 1} content={null} key={i} phrase={phraseIndex} />);
  }

  // function to reset board
  // clear local storage and set again
  // will need to deal with clearing clicks
  function resetBoard(): void {
    localStorage.clear();
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem('items', JSON.stringify(phrases));
    setPhraseIndex(phrases);
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
