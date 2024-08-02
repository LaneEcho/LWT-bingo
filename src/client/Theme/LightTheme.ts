import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E11774',
      dark: '#46A4DB',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Lalezar', 'Poppins'].join(','),
  },
});

export default lightTheme;
