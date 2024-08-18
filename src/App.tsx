import { useMode } from "./theme/theme";
import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { messages } from "./localization/localization";
import { IRootState } from "./store/store";
import JuristRoutes from "./components/global/routes/JuristRoutes";
import HeaderLite from "./components/global/header/HeaderLite";
import Notification from "./components/global/Notification";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const App = () => {
	const lang = useSelector((state: IRootState) => state.settings.localization);
	const theme = useMode();

	return (
		<IntlProvider messages={messages[lang]} locale={lang}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Grid container height={"100%"}>
						<Notification />
						<Grid item xs={12}>
							<HeaderLite />
						</Grid>
						<Grid item zeroMinWidth width={"100%"}>
							<Box>
								<JuristRoutes />
							</Box>
						</Grid>
					</Grid>
				</ThemeProvider>
			</LocalizationProvider>
		</IntlProvider>
	);
};

export default App;
