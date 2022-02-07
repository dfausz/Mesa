import { ThemeProvider, createTheme } from '@mui/material';

function CustomTheme(props) {
    const theme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#47596f',
          light: '#54101d',
          dark: '#312229',
          contrastText: '#d5c5ae'
        },
        secondary: {
          main: '#d5c5ae',
          light: '#d5c5ae',
        },
        error: {
          main: '#b72540',
          dark: '#54101d',
        },
      },
    });

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default CustomTheme;