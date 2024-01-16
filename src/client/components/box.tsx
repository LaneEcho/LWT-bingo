import React, { useState, useEffect, SetStateAction } from 'react';
import { BoxProps } from '../../types';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function Box(props: BoxProps) {
  const [clicked, setClicked] = useState(false);

  // see if the box has been clicked
  useEffect(() => {
    const savedClickedState = localStorage.getItem(
      `box-${props.row}-${props.column}`
    );
    if (savedClickedState) {
      setClicked(savedClickedState === 'true');
    }
  }, [props.row, props.column]);

  // update state and local storage
  const handleBoxClick = () => {
    const updatedClicked = !clicked;
    setClicked(updatedClicked);
    localStorage.setItem(
      `box-${props.row}-${props.column}`,
      updatedClicked.toString()
    );
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
        border: `1px solid ${theme.palette.primary.main}`,
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
