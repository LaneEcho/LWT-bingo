import { Dispatch, SetStateAction } from 'react';

export interface TermsConditions {
  [key: string]: string;
}

export type BoardState = number[];

export type RowProps = {
  row: number;
  content: string;
  phrase: number[];
  gameOver: boolean;
  // handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type ResetProps = {
  reset: () => void;
  onClose: () => void;
  gameOver: boolean;
  score?: number;
};

export interface Phrases {
  [key: string]: string;
}

export type SubmitScore = {
  score: number;
  onClose: () => void;
  showLoginOptions?: Dispatch<SetStateAction<boolean>>;
};
