export interface Phrases {
  [key: string]: string;
}

export type RowProps = {
  row: number;
  content: string;
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type BoxProps = {
  text: string;
  row: number;
  column: number;
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
