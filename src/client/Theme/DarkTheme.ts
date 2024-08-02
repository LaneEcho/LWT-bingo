import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#05FFF4',
      dark: '#46A4DB',
      contrastText: '#000',
    },
  },
});

export default darkTheme;
