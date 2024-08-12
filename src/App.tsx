import { useMode } from "./theme/theme";
import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { messages } from "./localization/localization";
import { IRootState } from "./store/store";
import JuristRoutes from "./components/global/routes/JuristRoutes";
import HeaderLite from "./components/global/header/HeaderLite";
import Notification from "./components/global/Notification";

const App = () => {
	const lang = useSelector((state: IRootState) => state.settings.localization);
	const theme = useMode();

	return (
		<IntlProvider messages={messages[lang]} locale={lang}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Grid container height={"100%"}>
					<Notification />
					<Grid item xs={12}>
						<HeaderLite />
					</Grid>
					<Grid item zeroMinWidth>
						<Box>
							<JuristRoutes />
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
		</IntlProvider>
	);
};

export default App;
