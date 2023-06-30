import { createTheme } from '@mui/material/styles';

const Themes = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: "#000",
    },
  },
});

export default Themes;