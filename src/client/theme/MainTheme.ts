import { alpha, getContrastRatio } from '@mui/material/styles';
import { extendTheme } from '@mui/material/styles';
import darkTheme from './darkTheme';

declare module '@mui/material/styles' {
  interface Palette {
    primaryBlue: Palette['primary'];
    primaryPink: Palette['primary'];
    primaryIceBlue: Palette['primary'];
    primaryPurple: Palette['primary'];
    secondaryGreen: Palette['secondary'];
    secondaryYellow: Palette['secondary'];
    secondaryGray: Palette['secondary'];
  }

  interface PaletteOptions {
    primaryBlue?: PaletteOptions['primary'];
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

let mainTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: { default: '#fff', secondary: '212121' },
        primary: {
          main: pinkBase,
          contrastText: '#fff',
        },
        secondary: {
          main: iceBlueBase,
          contrastText: '#212121',
        },
        primaryBlue: {
          main: blueBase,
          light: alpha(blueBase, 0.5),
          dark: alpha(blueBase, 0.9),
          contrastText:
            getContrastRatio(blueBase, '#fff') > 4.5 ? '#fff' : '#000',
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
    fontFamily: ['Roboto', 'Lalezar', 'Poppins'].join(','),
    h1: {
      fontSize: '4.5rem',
      '@media (max-width:640px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:320px)': {
        // possibly the smallest screen size
        fontSize: '.85rem',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 320, // default 0
      sm: 640, // default 600
      md: 1024, // default 900
      lg: 1280, // default 1200
      xl: 1536, // default 1536
    },
  },
});

export default mainTheme;
