import React, { useState, useContext } from 'react';
import Row from './row';
import Phrases from '../../phrases';
import { BoardState } from '../../types';
import { bingoRow, bingoColumn } from '../../util/bingo';
import ConfettiExplosion from 'react-confetti-explosion';
import { Button, Modal, Stack } from '@mui/material';
import Reset from './modals/reset';

// gettting a number so we don't have to hard code and continuously update the list of possible phrases
let length: number = Object.keys(Phrases).length;

function pickUniqueNumbers(): number[] {
  let uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size <= 25) {
    let randomNumber: number = Math.floor(Math.random() * length) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

// if nothing is in localStorage, we will use this function
function initialState(): number[] {
  const phrases: number[] = pickUniqueNumbers();
  localStorage.setItem('items', JSON.stringify(phrases));
  return phrases;
}

export default function Board() {
  // either going to pull from localStorage, or invoke initial state function
  const [phraseIndex, setPhraseIndex] = useState<BoardState>(
    JSON.parse(localStorage.getItem('items')) || initialState()
  );
  // persist gameOver state in case of refresh
  const [gameOver, setGameOver] = useState(
    JSON.parse(localStorage.getItem('game over')) || false
  );
  const [confetti, setConfetti] = useState<boolean>(false);
  // so it makes sure to tell user to play again
  const [open, setOpen] = useState<boolean>(false);

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
        gameOver={gameOver}
      />
    );
  }

  function resetBoard(): void {
    localStorage.clear();
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem('items', JSON.stringify(phrases));
    setGameOver(false);
    setPhraseIndex(phrases);
    setConfetti(false);
    setOpen(false);
  }

  function callBingo(): void {
    let bingo: boolean = bingoRow();
    // if not a row then check for column
    if (!bingo) {
      bingo = bingoColumn();
    }
    if (bingo) {
      setConfetti(true);
      setGameOver(true);
      localStorage.setItem('game over', 'true');
      setOpen(true);
      setTimeout(() => {
        setConfetti(false);
      }, 3000);
    } else {
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  // accessing CSS variables in case we change them later
  const root: HTMLElement = document.documentElement;
  const hotPinkColor: string =
    getComputedStyle(root).getPropertyValue('--hot-pink');
  const neonBlueColor: string =
    getComputedStyle(root).getPropertyValue('--neon-blue');
  const lightBlueColor: string =
    getComputedStyle(root).getPropertyValue('--light-blue');

  return (
    <div className="board" key={phraseIndex.toString()}>
      {confetti && (
        <ConfettiExplosion
          particleCount={500}
          colors={[hotPinkColor, neonBlueColor, lightBlueColor]}
        />
      )}

      <Stack>{rows}</Stack>

      <Button
        variant="contained"
        size="large"
        className="resetButton"
        onClick={callBingo}
        sx={{
          width: '16rem',
          marginTop: '0.5rem',
          fontSize: '1.5rem',
        }}
      >
        BINGO!
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Reset
          gameOver={gameOver}
          reset={resetBoard}
          onClose={handleClose}
        ></Reset>
      </Modal>
      <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={resetBoard}
        sx={{
          width: '8rem',
          marginTop: '0.5rem',
        }}
      >
        Reset Board
      </Button>
    </div>
  );
}
