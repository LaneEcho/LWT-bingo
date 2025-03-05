import { alpha, getContrastRatio } from '@mui/material/styles';
import { extendTheme } from '@mui/material/styles';
import darkTheme from './darkTheme';

declare module '@mui/material/styles' {
  interface Palette {
    raspberry: Palette['primary'];
    primaryPurple: Palette['primary'];
    primaryPink: Palette['primary'];
    secondaryGreen: Palette['secondary'];
    secondaryYellow: Palette['secondary'];
    orange: Palette['secondary'];
    secondaryGray: Palette['secondary'];
  }

  interface PaletteOptions {
    raspberry?: PaletteOptions['primary'];
    primaryPurple?: PaletteOptions['primary'];
    primaryPink?: PaletteOptions['primary'];
    secondaryGreen?: PaletteOptions['secondary'];
    secondaryYellow?: PaletteOptions['secondary'];
    orange?: PaletteOptions['secondary'];
    secondaryGray?: PaletteOptions['secondary'];
  }

  interface TypeBackground {
    default: string;
    secondary: string;
  }
}

// adding colors
// playing with calculations in the theme for light and dark values

const raspberryBase = '#A10E42';
const purpleBase = '#7030a0';
const orangeBase = '#FE2B15';
const yellowBase = '#CDE303';
const greenBase = '#2ABE81';
const darkRaspberry = '#661A38';
const pink = '#CD1556';

const grayBase = '#575757';

let mainTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: { default: '#fff', secondary: 'black' },
        primary: {
          main: darkRaspberry,
          contrastText: '#fff',
        },
        secondary: {
          main: pink,
          contrastText: '#fff',
        },
        raspberry: {
          main: raspberryBase,
          light: alpha(raspberryBase, 0.5),
          dark: alpha(raspberryBase, 0.9),
          contrastText:
            getContrastRatio(raspberryBase, '#fff') > 4.5 ? '#fff' : '#000',
        },
        primaryPink: {
          main: pink,
          light: alpha(pink, 0.5),
          dark: alpha(pink, 0.9),
          contrastText: getContrastRatio(pink, '#fff') > 4.5 ? '#fff' : '#000',
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
        orange: {
          main: orangeBase,
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
