import React, { useState, useEffect } from 'react';
import Row from './row';
import Phrases from '../phrases';
import { BoardState } from '../../types';

import Button from '@mui/material/Button';

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

  // function to check for bingo
  // whole row should be full
  // whole column should be full
  // or any diagonal
  // check local storage for the keys of boxes that would win
  // pop up an alert or similar saying bingo

  function bingo() {
    // figuring out what is in local storage
    const boxes: string[] = Object.entries(localStorage)
      .filter((element) => {
        return element[0] !== 'items';
      })
      .map((element) => {
        return element[0];
      });
    console.log('Boxes:', boxes);
    if (
      // the stupidest .includes ever?
      boxes.includes(
        'box-1-0' && 'box-1-1' && 'box-1-2' && 'box-1-3' && 'box-1-4'
      )
    ) {
      console.log('BINGO');
    } else {
      console.log('FALSE');
    }
  }

  function bingoLog(): void {
    console.log(Object.entries(localStorage));
    // invoke for testing
    bingo();
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
