import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#0c94ff",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#cccccc",
    },
  },
});

export default theme;