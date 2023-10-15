export interface Phrases {
  [key: string]: string;
}

export type RowProps = {
  row: number;
  content: string;
  phrase: number[];
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type BoxProps = {
  text: any;
  row: number;
  column: number;
  handleBoxClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
