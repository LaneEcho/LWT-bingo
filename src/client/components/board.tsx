import React, { useState, useEffect } from 'react';
import Row from './row';
import Phrases from '../phrases';

import Button from '@mui/material/Button';

function Board() {
  // is there any state?

  // function for pulling in phrases
  // input: none
  // output: array of random numbers with no repeats
  // create a set so all numbers are unique
  // loop to fill set with 24 numbers
  // add to set
  // return as an array

  function pickUniqueNumbers(): number[] {
    let uniqueNumbers: Set<number> = new Set();

    while (uniqueNumbers.size < 24) {
      let randomNumber: number = Math.floor(Math.random() * 48) + 1;
      uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
  }

  // iterate to create rows- an array of JSX elements
  const rows: JSX.Element[] = [];
  const phrasesIndex: number[] = pickUniqueNumbers();

  for (let i = 0; i < 5; i++) {
    rows.push(<Row row={i} content={null} handleBoxClick={null} key={i} />);
  }

  // function to reset board to different phrases

  return (
    <div className="board">
      <div className="grid">{rows}</div>
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
