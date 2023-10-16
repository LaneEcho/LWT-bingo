import React, { useState } from 'react';
import { BoxProps } from '../../types';

import Button from '@mui/material/Button';

function Box(props: BoxProps) {
  const [clicked, setClicked] = useState(false);

  const handleBoxClick = () => {
    setClicked(true);
  };
  return (
    <Button
      variant="outlined"
      className="box"
      onClick={handleBoxClick}
      data-row={props.row}
      data-column={props.column}
      style={{
        margin: '4px',
        backgroundColor: clicked ? 'var(--neon-blue)' : 'primary',
        border: clicked ? '1px solid var(--neon-blue)' : 'primary',
      }}
      sx={{
        '&.Mui-disabled': {
          color: 'var(--neon-blue)',
          border: '1px solid var(--neon-blue)',
        },
      }}
    >
      {props.text}
    </Button>
  );
}

export default Box;
