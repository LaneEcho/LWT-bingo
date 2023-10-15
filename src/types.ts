export interface Phrases {
  [key: string]: string;
}

export type RowProps = {
  row: number;
  //   content: BoardText[];
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type BoxProps = {
  // text: BoardText;
  row: number;
  column: number;
  gameOver: boolean;
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
