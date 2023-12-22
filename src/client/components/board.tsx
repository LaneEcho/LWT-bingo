import React, { useState, useEffect } from 'react';
import Row from './row';
import Phrases from '../phrases';
import { BoardState } from '../../types';
import { bingoRow, bingoColumn, bingoSpecial } from '../../lib';
import ConfettiExplosion from 'react-confetti-explosion';
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
  const [confetti, setConfetti] = useState(false);

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
    setConfetti(false);
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
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
      console.log('Confetti Reset');
    }, 3000);
  }

  // accessing CSS variables in case we change them later
  const root = document.documentElement;
  const hotPinkColor = getComputedStyle(root).getPropertyValue('--hot-pink');
  const neonBlueColor = getComputedStyle(root).getPropertyValue('--neon-blue');
  const lightBlueColor =
    getComputedStyle(root).getPropertyValue('--light-blue');

  return (
    <div className="board" key={phraseIndex.toString()}>
      {confetti && (
        <ConfettiExplosion
          particleCount={500}
          colors={[hotPinkColor, neonBlueColor, lightBlueColor]}
        />
      )}
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
