import React, { useState } from "react";
import Row from "./row";
import Phrases from "../phrases";
import { BoardState } from "../../types";
import {
  bingoRow,
  bingoColumn,
  bingoSpecial,
  BingoResult,
} from "../../util/bingo";
import ConfettiExplosion from "react-confetti-explosion";

import { Button, Modal } from "@mui/material";
import Reset from "./reset";
import { useAuth } from "../hooks/useAuth";
import { LoginModal } from "./modals/LoginModal";
import { UpdateUsernameModal } from "./modals/UpdateUsernameModal";
import { ScoreSubmissionModal } from "./modals/ScoreSubmissionModal";

// getting a number so we don't have to hard code and continuously update the list of possible phrases
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
  localStorage.setItem("items", JSON.stringify(phrases));
  return phrases;
}

const Board: React.FC = () => {
  const { user } = useAuth();

  // either going to pull from localStorage, or invoke initial state function
  const [phraseIndex, setPhraseIndex] = useState<BoardState>(
    JSON.parse(localStorage.getItem("items")) || initialState()
  );
  // persisting gameOver state in case of refresh
  const [gameOver, setGameOver] = useState(
    JSON.parse(localStorage.getItem("game over")) || false
  );
  const [confetti, setConfetti] = useState<boolean>(false);
  // so it makes sure to tell user to play again
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [usernameOpen, setUsernameOpen] = useState<boolean>(false);
  const [submitScoreOpen, setSubmitScoreOpen] = useState<boolean>(false);

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

  function resetBoard(): void {
    localStorage.clear();
    const phrases: number[] = pickUniqueNumbers();
    localStorage.setItem("items", JSON.stringify(phrases));
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
    setBingoResult(bingo);

    if (bingo?.isBingo) {
      setConfetti(true);
      setGameOver(true);
      localStorage.setItem("game over", "true");
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

  // working out modal popup functionality
  const handleClose = () => {
    setLoginOpen(false);
  };

  const handleUsernameClose = () => {
    setUsernameOpen(false);
  };

  const handleScoreSubmissionClose = () => {
    setSubmitScoreOpen(false);
  };

  // accessing CSS variables in case we change them later
  const root: HTMLElement = document.documentElement;
  const hotPinkColor: string =
    getComputedStyle(root).getPropertyValue("--hot-pink");
  const neonBlueColor: string =
    getComputedStyle(root).getPropertyValue("--neon-blue");
  const lightBlueColor: string =
    getComputedStyle(root).getPropertyValue("--light-blue");

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
        size="large"
        className="resetButton"
        onClick={callBingo}
        sx={{
          width: "16rem",
          fontSize: "1.5rem",
        }}
      >
        BINGO!
      </Button>
      <Button
        variant="contained"
        size="small"
        className="resetButton"
        onClick={resetBoard}
        sx={{
          width: "8rem",
          marginTop: "0.5rem",
        }}
      >
        Reset Board
      </Button>
      {loginOpen && (
        <LoginModal
          isOpen={loginOpen}
          onClose={handleClose}
          score={bingoResult?.score}
          resetBoard={resetBoard}
          onLoginSuccess={onLoginSuccess}
        />
      )}
      {usernameOpen && (
        <UpdateUsernameModal
          isOpen={usernameOpen}
          onClose={handleUsernameClose}
          score={bingoResult?.score}
          resetBoard={resetBoard}
        />
      )}
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
