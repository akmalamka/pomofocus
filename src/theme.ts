import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#E61004",
      light: "#E66559",
      dark: "#B92227",
    },
    secondary: {
      main: "#177721",
      light: "#23BA33",
      dark: "#104515",
    },
    background: {
      default: "#EEEEEE",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "SF Pro Display, sans-serif",
          textTransform: "uppercase",
          fontSize: "32px",
          padding: "8px 20px",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
