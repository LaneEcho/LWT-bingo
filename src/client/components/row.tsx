import React, { useState } from 'react';
import { RowProps } from '../../types';
import Box from './box';
import phrases from '../phrases';

function Row(props: RowProps) {
  // iterate to create rows
  const boxes: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    // first check if we're at the middle box
    if (props.row === 3 && i === 2) {
      boxes.push(
        <Box
          text={'Free Space'} // add image if time
          row={props.row}
          column={i}
          // handleBoxClick={props.handleBoxClick}
          handleBoxClick={null}
          key={i}
        />
      );
    } else {
      boxes.push(
        <Box
          text={phrases[props.row + i * 5]}
          row={props.row}
          column={i}
          // handleBoxClick={props.handleBoxClick}
          handleBoxClick={null}
          key={i}
        />
      );
    }
  }

  return <div className="row">{boxes}</div>;
}

export default Row;
