import React, { useState } from 'react';
import { BoxProps } from '../../types';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function Box(props: BoxProps) {
  const [clicked, setClicked] = useState(false);

  const handleBoxClick = () => {
    setClicked(true);
  };

  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      className="box"
      onClick={handleBoxClick}
      data-row={props.row}
      data-column={props.column}
      style={{
        margin: '4px',
        backgroundColor: clicked
          ? theme.palette.primary.dark
          : theme.palette.background.default,
        color: clicked ? '#fff' : theme.palette.primary.main,
        border: clicked ? theme.palette.primary.main : 'primary',
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
