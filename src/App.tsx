import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./theme";
import Routes from "./routes";

function App() {
  const themeCreated = createTheme(theme);
  return (
    <>
      <ThemeProvider theme={themeCreated}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
