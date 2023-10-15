import React, { useState } from 'react';
import { BoxProps } from '../../types';

import Button from '@mui/material/Button';

function Box(props: BoxProps) {
  return (
    <Button
      variant="outlined"
      className="box"
      //   onClick={props.handleBoxClick}
      data-row={props.row}
      data-column={props.column}
      style={{ fontSize: '12px', margin: '4px' }}
      sx={{
        '&.Mui-disabled': {
          color: '#8E24AA',
          border: '1px solid #8E24AA',
        },
      }}
    >
      {props.text}
    </Button>
  );
}

export default Box;
