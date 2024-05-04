import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider
      value={colorMode as { toggleColorMode: () => void }}
    >
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
