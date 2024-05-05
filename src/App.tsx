import { useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { messages } from "./localization/localization";
import { IRootState } from "./store/store";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/sidebar/Sidebar";
import Shippers from "./components/reports/Shippers";
import Drivers from "./components/reports/Drivers";

const App = () => {
  const lang = useSelector((state: IRootState) => state.settings.localization);
  const theme = useMode();

  return (
    <IntlProvider messages={messages[lang]} locale={lang}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Shippers />} />
              <Route path="/shippers" element={<Shippers />} />
              <Route path="/drivers" element={<Drivers />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
