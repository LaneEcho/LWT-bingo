import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

type BoxProps = {
  text: any;
  row: number;
  column: number;
  gameOver: boolean;
};

function Square({ text, row, column, gameOver }: BoxProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  // see if the box has been clicked upon page reload
  useEffect(() => {
    const savedClickedState = localStorage.getItem(`box-${row}-${column}`);
    if (savedClickedState) {
      setClicked(savedClickedState === 'true');
    }
  }, [row, column]);

  // update state and local storage on click
  const handleBoxClick = (): void => {
    const updatedClicked: boolean = !clicked;
    setClicked(updatedClicked);
    if (updatedClicked) {
      // track(EventName.TILE_SELECTED, trackingParams);
      localStorage.setItem(`box-${row}-${column}`, updatedClicked.toString());
    } else {
      localStorage.removeItem(`box-${row}-${column}`);
    }
  };

  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      className="box"
      onClick={handleBoxClick}
      data-row={row}
      data-column={column}
      disabled={gameOver}
      sx={{
        margin: '4px',
        height: '8rem',
        width: '8rem',
        fontFamily: 'Poppins',
        borderRadius: '1rem',
        backgroundColor: clicked
          ? gameOver
            ? '#7030A0' // color of disabled clicked buttons
            : theme.palette.primary.dark
          : theme.palette.background.default,
        color: clicked ? '#fff' : theme.palette.primary.main,
        border: clicked ? '1px solid #e11774' : '1px solid #7030A0',
        fontSize: text?.length > 35 ? '10.5px' : '14px',
      }}
    >
      {text}
    </Button>
  );
}

export default Square;
