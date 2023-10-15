import React, { useState } from 'react';
import { RowProps } from '../../types';
import Box from './box';
import phrases from '../phrases';

function Row(props: RowProps) {
  // iterate to create rows
  // function to populate boxes with text from phrases.ts
  //    no repeat phrases!
  //    middle box of row 3 column 3 will always be image
  const boxes: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    boxes.push(
      <Box
        text={'props.content[i]'}
        row={props.row}
        column={i}
        // handleBoxClick={props.handleBoxClick}
        handleBoxClick={null}
        key={i}
      />
    );
  }

  return <div className="row">{boxes}</div>;
}

export default Row;
