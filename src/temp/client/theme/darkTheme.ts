import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const blueBase = '#46A4DF';
const pinkBase = '#E11774';
const iceBlueBase = '#05FFF4';
const purpleBase = '#7030a0';
const greenBase = '#92D050';
const yellowBase = '#FFC000';
const grayBase = '#575757';

// mode: 'dark',
const darkTheme = {
  palette: {
    background: { default: '#212121', secondary: '#fff' },
    primary: {
      main: iceBlueBase,
      contrastText: '#212121',
    },
    secondary: {
      main: pinkBase,
      contrastText: '#fff',
    },
  },
};

export default darkTheme;
