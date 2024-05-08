import { useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { messages } from "./localization/localization";
import { IRootState } from "./store/store";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/sidebar/Sidebar";
import JuristRoutes from "./components/global/routes/JuristRoutes";
import Notification from "./components/global/Notification";

const App = () => {
  const lang = useSelector((state: IRootState) => state.settings.localization);
  const theme = useMode();

  return (
    <IntlProvider messages={messages[lang]} locale={lang}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <Notification />
          <main className="content">
            <Topbar />
            <JuristRoutes />
          </main>
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
