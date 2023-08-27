import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#6B8E23', // Olive Green test
    },
    secondary: {
      main: '#C0D8B6', // Light Olive Green Test
    },
  },
});

export default theme;