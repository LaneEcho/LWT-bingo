import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const raspberryBase = '#A10E42';
const purpleBase = '#7030a0';
const orangeBase = '#FE2B15';
const yellowBase = '#CDE303';
const greenBase = '#2ABE81';
const darkRaspberry = '#661A38';
const pink = '#CD1556';

const grayBase = '#575757';

// mode: 'dark',
const darkTheme = {
  palette: {
    background: { default: '#212121', secondary: '#fff' },
    primary: {
      main: greenBase,
      contrastText: darkRaspberry,
    },
    secondary: {
      main: darkRaspberry,
      contrastText: '#fff',
    },
  },
};

export default darkTheme;
