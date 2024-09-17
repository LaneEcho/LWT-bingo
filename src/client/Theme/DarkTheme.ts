import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    primaryBlue: Palette['primary'];
    primaryPurple: Palette['primary'];
    secondaryGreen: Palette['secondary'];
    secondaryYellow: Palette['secondary'];
    secondaryGray: Palette['secondary'];
  }

  interface PaletteOptions {
    primaryBlue?: PaletteOptions['primary'];
    primaryPurple?: PaletteOptions['primary'];
    secondaryGreen?: PaletteOptions['secondary'];
    secondaryYellow?: PaletteOptions['secondary'];
    secondaryGray?: PaletteOptions['secondary'];
  }
}

const lightBlueBase = '#46a4df';
const purpleBase = '#7030a0';
const greenBase = '#92d050';
const yellowBase = '#ffc000';
const grayBase = '#575757';

const darkTheme = {
  palette: {
    // mode: 'dark',
    primary: {
      main: '#05fff4',
      contrastText: '#212121',
    },
    secondary: {
      main: '#E11774',
      contrastText: '#fff',
    },
  },
};

export default darkTheme;
