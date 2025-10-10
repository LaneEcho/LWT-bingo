import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const blueBase = '#46A4DF';
const pinkBase = '#E11774';
const iceBlueBase = '#05FFF4';
const purpleBase = '#7030a0';
const greenBase = '#92D050';
const yellowBase = '#FFC000';
const grayBase = '#575757';

// PBR Bingo
const kindaBlack = '#231f20';
const PBRRed = '#DF2634';
const PBRDeepBlue = '#03056B';
const gray = '#979797';
const PBRMedRed = '#F14949';
const PBRPaleBlue = '#DAE3F8';

// mode: 'dark',
const darkTheme = {
  palette: {
    background: { default: kindaBlack, secondary: PBRPaleBlue },
    primary: {
      main: PBRDeepBlue,
      contrastText: '#fff',
    },
    secondary: {
      main: PBRRed,
      contrastText: PBRPaleBlue,
    },
    clickedBackground: {
      main: PBRRed,
      light: alpha(PBRRed, 0.5),
      dark: alpha(PBRRed, 0.9),
      contrastText: getContrastRatio(PBRRed, '#fff') > 4.5 ? '#fff' : '#000',
    },
  },
};

export default darkTheme;
