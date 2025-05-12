import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";

import theme from "./theme";
import Routes from "./routes";
import store from "./store";

function App() {
  const themeCreated = createTheme(theme);
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider theme={themeCreated}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
