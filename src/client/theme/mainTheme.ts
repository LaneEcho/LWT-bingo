import { alpha, getContrastRatio } from '@mui/material/styles';
import { extendTheme } from '@mui/material/styles';
import darkTheme from './darkTheme';

declare module '@mui/material/styles' {
  interface Palette {
    clickedBackground: Palette['primary'];
    primaryGray: Palette['primary'];
    primaryPink: Palette['primary'];
    primaryIceBlue: Palette['primary'];
    primaryPurple: Palette['primary'];
    secondaryGreen: Palette['secondary'];
    secondaryYellow: Palette['secondary'];
    secondaryGray: Palette['secondary'];
  }

  interface PaletteOptions {
    clickedBackground?: PaletteOptions['primary'];
    primaryGray?: PaletteOptions['primary'];
    primaryPink?: PaletteOptions['primary'];
    primaryIceBlue?: PaletteOptions['primary'];
    primaryPurple?: PaletteOptions['primary'];
    secondaryGreen?: PaletteOptions['secondary'];
    secondaryYellow?: PaletteOptions['secondary'];
    secondaryGray?: PaletteOptions['secondary'];
  }

  interface TypeBackground {
    default: string;
    secondary: string;
  }
}

// adding colors
// playing with calculations in the theme for light and dark values

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

const mainTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: { default: PBRPaleBlue, secondary: '#212121' },
        primary: {
          main: PBRDeepBlue,
          contrastText: '#fff',
        },
        secondary: {
          main: PBRRed,
          contrastText: PBRPaleBlue,
        },
        clickedBackground: {
          main: PBRDeepBlue,
          light: alpha(PBRDeepBlue, 0.5),
          dark: alpha(PBRDeepBlue, 0.9),
          contrastText:
            getContrastRatio(PBRDeepBlue, '#fff') > 4.5 ? '#fff' : '#000',
        },
        primaryGray: {
          main: gray,
          light: alpha(gray, 0.5),
          dark: alpha(gray, 0.9),
          contrastText: getContrastRatio(gray, '#fff') > 4.5 ? '#fff' : '#000',
        },
        primaryPink: {
          main: pinkBase,
          light: alpha(pinkBase, 0.5),
          dark: alpha(pinkBase, 0.9),
          contrastText:
            getContrastRatio(pinkBase, '#fff') > 4.5 ? '#fff' : '#000',
        },
        primaryIceBlue: {
          main: iceBlueBase,
          light: alpha(iceBlueBase, 0.5),
          dark: alpha(iceBlueBase, 0.9),
          contrastText:
            getContrastRatio(iceBlueBase, '#fff') > 4.5 ? '#fff' : '#000',
        },
        primaryPurple: {
          // this is red right now for PBR
          main: PBRMedRed,
          light: alpha(PBRMedRed, 0.5),
          dark: alpha(PBRMedRed, 0.9),
          contrastText:
            getContrastRatio(PBRMedRed, '#fff') > 4.5 ? '#fff' : '#000',
        },
        secondaryGreen: {
          main: greenBase,
          light: alpha(greenBase, 0.5),
          dark: alpha(greenBase, 0.9),
          contrastText:
            getContrastRatio(greenBase, '#fff') > 4.5 ? '#fff' : '#000',
        },
        secondaryYellow: {
          main: yellowBase,
        },
        secondaryGray: {
          main: grayBase,
          light: alpha(grayBase, 0.5),
        },
      },
    },
    dark: darkTheme,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Lalezar',
      'Poppins',
      'Staatliches',
      'KC Neue Teeth',
      'KC Neue Teeth Inked',
    ].join(','),
    h1: {
      fontSize: '4.5rem',
      '@media (max-width:1200px)': {
        fontSize: '3rem',
      },
      '@media (max-width:640px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:320px)': {
        fontSize: '.85rem',
      },
    },
    h2: {
      '@media (max-width:1200px)': {
        fontSize: '4rem',
      },
      '@media (max-width:800px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:640px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:320px)': {
        fontSize: '.85rem',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 320, // default 0
      sm: 640, // default 600
      md: 1024, // default 900
      lg: 1200, // default 1200
      xl: 1536, // default 1536
    },
  },
});

export default mainTheme;
