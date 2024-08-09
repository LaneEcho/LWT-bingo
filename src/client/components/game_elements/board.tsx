import React, { useState } from 'react';
import Row from './row';
import {
  bingoRow,
  bingoColumn,
  bingoSpecial,
  BingoResult,
} from '../../../util/bingo';
import ConfettiExplosion from 'react-confetti-explosion';
import Stack from '@mui/material/Stack';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../modals/LoginModal';
import { UpdateUsernameModal } from '../modals/UpdateUsernameModal';
import { ScoreSubmissionModal } from '../modals/ScoreSubmissionModal';
import phrases from '../../../lib/phrases';
import { BoardState } from '../../../types';
import Button from '../Button';
import Modal from '@mui/material/Modal';
import HowToPlay from '../modals/howToPlay';
import useAnalytics, { EventName } from '../../../client/hooks/useAnalytics';

// getting a number so we don't have to hard code and continuously update the list of possible phrases
let length: number = Object.keys(phrases).length;

function pickUniqueNumbers(): number[] {
  let uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size <= 25) {
    let randomNumber: number = Math.floor(Math.random() * length) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

type BoardProps = {
  darkMode: boolean;
};

const Board: React.FC<BoardProps> = ({ darkMode }: BoardProps) => {
  const { user } = useAuth();
  const track = useAnalytics();

  // either going to pull from localStorage, or invoke initial state function
  const [phraseIndex, setPhraseIndex] = useState<BoardState>(
    JSON.parse(localStorage.getItem('items')) || initialState()
  );
  // persisting gameOver state in case of refresh
  const [gameOver, setGameOver] = useState(
    JSON.parse(localStorage.getItem('game over')) || false
  );
  const [confetti, setConfetti] = useState<boolean>(false);
  // so it makes sure to tell user to play again
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [usernameOpen, setUsernameOpen] = useState<boolean>(false);
  const [submitScoreOpen, setSubmitScoreOpen] = useState<boolean>(false);
  const [openHowTo, SetHowTo] = useState<boolean>(false);

  const [bingoResult, setBingoResult] = useState<BingoResult | undefined>(
    undefined
  );

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

  function handleResetClicked(): void {
    track(EventName.BOARD_RESET, { userId: user?.uid });
    resetBoard();
  }

  function resetBoard(): void {
    localStorage.clear();
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem('items', JSON.stringify(phrases));
    track(EventName.BOARD_RESET, {
      phrases: JSON.stringify(phrases),
      userId: user?.uid ?? 'no user',
    });
    setGameOver(false);
    setPhraseIndex(phrases);
    setConfetti(false);
    setLoginOpen(false);
    setLoginOpen(false);
    setUsernameOpen(false);
    setSubmitScoreOpen(false);
    setBingoResult(undefined);
  }

  function onLoginSuccess(): void {
    setLoginOpen(false);
    setUsernameOpen(true);
  }

  function checkBingo(): BingoResult {
    const isBingoSpecial = bingoSpecial();
    if (isBingoSpecial.isBingo) {
      return isBingoSpecial; // Return early if special bingo condition is met
    }

    const isRow = bingoRow();
    if (isRow.isBingo) {
      return isRow; // Only calculate and return row result if no special bingo
    }

    const isColumn = bingoColumn();
    return isColumn; // Return column result last since it's the lowest priority
  }

  function callBingo(): void {
    const bingo = checkBingo();
    track(EventName.BINGO_CLICKED, { userId: user?.uid ?? null, bingo });
    setBingoResult(bingo);

    if (bingo?.isBingo) {
      setConfetti(true);
      setGameOver(true);
      localStorage.setItem('game over', 'true');
      if (user?.uid) {
        setSubmitScoreOpen(true);
      } else {
        setLoginOpen(true);
      }
      setTimeout(() => {
        setConfetti(false);
      }, 3000);
    } else {
      if (user?.uid) {
        setSubmitScoreOpen(true);
      } else {
        setLoginOpen(true);
      }
      // setLoginOpen(true);
    }
  }

  // if nothing is in localStorage, we will use this function
  function initialState(): number[] {
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem('items', JSON.stringify(phrases));
    track(EventName.BOARD_INITIALIZED, {
      phrases,
      userId: user?.uid,
    });
    return phrases;
  }

  function showHowTo() {
    SetHowTo(!openHowTo);
  }

  const handleClose = () => {
    setLoginOpen(false);
    resetBoard();
  };

  const handleUsernameClose = () => {
    setUsernameOpen(false);
    resetBoard();
  };

  const handleScoreSubmissionClose = () => {
    setSubmitScoreOpen(false);
    resetBoard();
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

      <Stack width={'100%'} direction="row" justifyContent="space-evenly">
        <Button
          variant="primary"
          onClick={callBingo}
          sx={{
            width: '12rem',
            height: '3rem',
            fontSize: 'x-large'
          }}
          darkMode={darkMode}
        >
          BINGO!
        </Button>
      </Stack>

      <Stack width={'100%'} direction="row" justifyContent="space-evenly">

        <Button
          variant="secondary"
          onClick={showHowTo}
          sx={{
            width: '8rem',
          }}
          darkMode={darkMode}
        >
          How to Play
        </Button>

        <Button
          variant="secondary"
          onClick={handleResetClicked}
          sx={{
            width: '8rem',
          }}
          darkMode={darkMode}
        >
          Reset Board
        </Button>

      </Stack>
      {loginOpen && (
        <LoginModal
          isOpen={loginOpen}
          onClose={handleClose}
          score={bingoResult?.score}
          resetBoard={resetBoard}
          onLoginSuccess={onLoginSuccess}
        />
      )}
      <Modal
        aria-labelledby="modal-how-to-play"
        aria-describedby="modal-how-to-play-bingo"
        open={openHowTo}
      >
        <HowToPlay 
          close={SetHowTo} 
          darkMode={darkMode}>
        </HowToPlay>
      </Modal>
      <UpdateUsernameModal
        isOpen={usernameOpen}
        onClose={handleUsernameClose}
        score={bingoResult?.score}
        resetBoard={resetBoard}
      />
      {submitScoreOpen && (
        <ScoreSubmissionModal
          isOpen={submitScoreOpen}
          onClose={handleScoreSubmissionClose}
          resetBoard={resetBoard}
          score={bingoResult?.score}
        />
      )}
    </div>
  );
};

export default Board;
