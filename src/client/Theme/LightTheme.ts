import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import darkTheme from './DarkTheme';

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

// adding colors
// playing with calculations in the theme for light and dark values

const lightBlueBase = '#46a4df';
const purpleBase = '#7030a0';
const greenBase = '#92d050';
const yellowBase = '#ffc000';
const grayBase = '#575757';

let lightTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
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
          contrastText:
            getContrastRatio(greenBase, '#fff') > 4.5 ? '#fff' : '#000',
        },
        secondaryYellow: {
          main: yellowBase,
        },
        secondaryGray: {
          main: grayBase,
        },
      },
    },
    dark: darkTheme, // did this work
  },
  typography: {
    fontFamily: ['Roboto', 'Lalezar', 'Poppins'].join(','),
    h1: {
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 640, // default 0
      sm: 768, // default 600
      md: 1024, // default 900
      lg: 1280, // default 1200
      xl: 1536, // default 1536
    },
  },
});

// typography using custom values and breakpoint queries
// lightTheme.typography.h1 = {
//   fontSize: '3rem',
//   [lightTheme.breakpoints.down('sm')]: {
//     // size of h1 on mobile
//     fontSize: '1rem',
//   },
// };

export default lightTheme;