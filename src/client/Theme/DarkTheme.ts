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
      main: '#E11774',
      contrastText: '#fff',
    },
    secondary: {
      main: '#05fff4',
      contrastText: '#fff',
    },
    primaryBlue: {
      main: lightBlueBase,
      light: alpha(lightBlueBase, 0.5),
      dark: alpha(lightBlueBase, 0.9),
      contrastText:
        getContrastRatio(lightBlueBase, '#fff') > 4.5 ? '#fff' : '#000',
    },
    primaryPurple: {
      main: purpleBase,
      light: alpha(purpleBase, 0.5),
      dark: alpha(purpleBase, 0.9),
      contrastText:
        getContrastRatio(purpleBase, '#fff') > 4.5 ? '#fff' : '#000',
    },
    secondaryGreen: {
      main: greenBase,
      light: alpha(greenBase, 0.5),
      dark: alpha(greenBase, 0.9),
      contrastText: getContrastRatio(greenBase, '#fff') > 4.5 ? '#fff' : '#000',
    },
    secondaryYellow: {
      main: yellowBase,
    },
    secondaryGray: {
      main: grayBase,
    },
  },
};

export default darkTheme;
