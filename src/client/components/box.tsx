import React, { useState, useEffect, SetStateAction } from 'react';
import { BoxProps } from '../../types';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function Box(props: BoxProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  // see if the box has been clicked upon page reload
  useEffect(() => {
    const savedClickedState = localStorage.getItem(
      `box-${props.row}-${props.column}`
    );
    if (savedClickedState) {
      setClicked(savedClickedState === 'true');
    }
  }, [props.row, props.column]);

  // update state and local storage on click
  const handleBoxClick = (): void => {
    const updatedClicked: boolean = !clicked;
    setClicked(updatedClicked);
    if (updatedClicked) {
      localStorage.setItem(
        `box-${props.row}-${props.column}`,
        updatedClicked.toString()
      );
    } else {
      localStorage.removeItem(`box-${props.row}-${props.column}`);
    }
  };

  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      className="box"
      onClick={handleBoxClick}
      data-row={props.row}
      data-column={props.column}
      disabled={props.gameOver}
      // WIP could use sx prop instead of style
      style={{
        margin: '4px',
        // want users to know when button is disabled
        backgroundColor: clicked
          ? props.gameOver
            ? 'orange' // color of disabled clicked buttons
            : theme.palette.primary.dark
          : theme.palette.background.default,
        color: clicked ? '#fff' : theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      {props.text}
    </Button>
  );
}

export default Box;
