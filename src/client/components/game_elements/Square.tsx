import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAnalytics, { EventName } from '../../../client/hooks/useAnalytics';
import { useColorScheme } from '@mui/material/styles';

type BoxProps = {
  text: any;
  row: number;
  column: number;
  gameOver: boolean;
};

function Square({ text, row, column, gameOver }: BoxProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const track = useAnalytics();

  // const { mode } = useColorScheme();

  // const darkMode = mode === 'dark';

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
      track(EventName.TILE_SELECTED, { text, row, column, gameOver });
      localStorage.setItem(`box-${row}-${column}`, updatedClicked.toString());
    } else {
      localStorage.removeItem(`box-${row}-${column}`);
    }
  };

  return (
    <Button
      variant="outlined"
      className="box"
      onClick={handleBoxClick}
      data-row={row}
      data-column={column}
      disabled={gameOver}
      sx={{
        margin: isMobile ? '1px' : '4px',
        height: isMobile ? '4.5rem' : '8rem',
        width: isMobile ? '4.5rem' : '8rem',
        fontFamily: 'Poppins',
        borderRadius: '1rem',
        backgroundColor: clicked
          ? gameOver
            ? '#7030A0' // color of disabled clicked buttons (change to theme)
            : theme.palette.primary.main
          : theme.palette.background.default,
        border: clicked ? '1px solid #e11774' : '1px solid #7030A0',
        padding: isMobile ? '1px' : '5px',
        color: clicked
          ? theme.palette.primary.contrastText
          : theme.palette.primary.main,
        fontSize:
          text?.length > 35
            ? isMobile
              ? '.4rem' // long phrases if on mobile
              : '.7rem' // long phrases if not on mobile
            : isMobile
            ? '.55rem' // short phrases if on mobile
            : '.875rem', // short phrases if not on mobile
      }}
    >
      {text}
    </Button>
  );
}

export default Square;
