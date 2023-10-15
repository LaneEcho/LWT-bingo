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

    while (uniqueNumbers.size < 35) {
      let randomNumber: number = Math.floor(Math.random() * 47) + 1;
      uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
  }

  // iterate to create rows- an array of JSX elements
  const rows: JSX.Element[] = [];
  const phrasesIndex: number[] = pickUniqueNumbers();
  console.log('Phrases index', phrasesIndex);

  for (let i = 0; i < 5; i++) {
    rows.push(
      <Row
        row={i + 1}
        content={null}
        handleBoxClick={null}
        key={i}
        phrase={phrasesIndex}
      />
    );
  }

  // function to reset board - just re-render components
  function resetBoard(): void {}

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
