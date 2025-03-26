import React from 'react';
import { RowProps } from '../../../types';
import Square from './Square';
import phrases from '../../../util/data/phrases';
import { Stack } from '@mui/material';

function Row(props: RowProps) {
  const boxes: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    // first check if we're at the middle box
    if (props.row === 3 && i === 2) {
      boxes.push(
        <Square
          text={'Free Space'} // add image later
          row={props.row}
          column={i}
          key={i}
          gameOver={props.gameOver}
        />
      );
      // free space clicked by default
      localStorage.setItem(`box-3-2`, 'true');
    } else {
      boxes.push(
        <Square
          text={phrases[props.phrase[props.row + i * 5]]}
          row={props.row}
          column={i}
          key={i}
          gameOver={props.gameOver}
        />
      );
    }
  }

  return <Stack direction="row">{boxes}</Stack>;
}

export default Row;
