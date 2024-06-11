import React from 'react';
import { RowProps } from '../../../types';
import Box from './box';
import phrases from '../../../lib/phrases';
import { Stack } from '@mui/material';

function Row(props: RowProps) {
  const boxes: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    // first check if we're at the middle box
    if (props.row === 3 && i === 2) {
      boxes.push(
        <Box
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
        <Box
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
