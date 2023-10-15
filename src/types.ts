export interface Phrases {
  [key: string]: string;
}

export type RowProps = {
  row: number;
  content: Phrases[];
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type BoxProps = {
  text: Phrases;
  row: number;
  column: number;
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
