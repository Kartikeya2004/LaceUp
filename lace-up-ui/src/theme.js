import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // A nice, light blue for links and highlights
    },
    background: {
      default: '#282c34', // Our main app background color
      paper: '#3b3f46',   // The color of our "paper" elements, like Cards
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '3rem',
    },
  },
});

export default theme;