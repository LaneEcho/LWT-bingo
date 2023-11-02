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

function Board() {
  // start as an empty array
  const [phraseIndex, setPhraseIndex] = useState([]);

  // useEffect to get or set our phrases, depending on if they exist in local storage
  useEffect(() => {
    const savedPhrases = JSON.parse(localStorage.getItem('items'));
    if (savedPhrases) {
      setPhraseIndex(savedPhrases);
    } else {
      const phrases = pickUniqueNumbers();
      localStorage.setItem('items', JSON.stringify(phrases));
    }
  }, []);

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
      {/* <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={resetBoard}
      >
        Reset Board
      </Button> */}
    </div>
  );
}

export default Board;
