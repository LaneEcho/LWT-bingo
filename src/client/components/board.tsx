import React, { useState, useEffect } from 'react';
import Row from './row';
import Phrases from '../phrases';
import { BoardState } from '../../types';
import { bingoRow, bingoColumn, bingoSpecial } from '../../lib';

import Button from '@mui/material/Button';

// gettting a number so we don't have to hard code and continuously update the list of possible phrases
let length = Object.keys(Phrases).length;

function pickUniqueNumbers(): number[] {
  let uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size <= 25) {
    let randomNumber: number = Math.floor(Math.random() * length) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

// if nothing is in localStorage, we will use this function
function initialState() {
  const phrases: number[] = pickUniqueNumbers();
  localStorage.setItem('items', JSON.stringify(phrases));
  return phrases;
}

function Board() {
  // either going to pull from localStorage, or invoke initial state function
  const [phraseIndex, setPhraseIndex] = useState<BoardState>(
    JSON.parse(localStorage.getItem('items')) || initialState()
  );

  // iterate to create rows- an array of JSX elements
  const rows: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    rows.push(
      <Row
        row={i + 1}
        content={null}
        // this key will trigger re-renders because keys will change
        // key prop used to reconcile previous virtual DOM with the new one
        key={i + phraseIndex.toString()}
        phrase={phraseIndex}
      />
    );
  }

  function resetBoard(): void {
    localStorage.clear();
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem('items', JSON.stringify(phrases));
    setPhraseIndex(phrases);
  }

  function bingoLog(): void {
    console.log(Object.entries(localStorage));
    // invoke for testing
    // let bingo = bingoRow();
    // if (!bingo) {
    //   bingo = bingoColumn();
    // }
    // if (!bingo) {
    //   bingo = bingoSpecial();
    // }
    bingoSpecial();
  }

  return (
    <div className="board" key={phraseIndex.toString()}>
      <div className="grid">{rows}</div>
      <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={resetBoard}
      >
        Reset Board
      </Button>
      <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={bingoLog}
      >
        Console Log
      </Button>
    </div>
  );
}

export default Board;
