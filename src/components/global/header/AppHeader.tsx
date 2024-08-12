import { Container, Typography, Button } from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import HeaderRightSide from "./HeaderRightSide";
import HeaderLeftSide from "./HeaderLeftSide";
import { useIntl } from "react-intl";

export default function AppHeader() {
	const intl = useIntl();

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<HeaderLeftSide />

					{/* Для обычных (широкоформатных) экранов */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Button component={Link} to={"/Counterparties"} sx={{ my: 2, color: "white", display: "block" }}>
							{intl.formatMessage({ id: "counterparties" })}
						</Button>

						<Button component={Link} to={"/profile"} sx={{ my: 2, color: "white", display: "block" }}>
							{intl.formatMessage({ id: "profile" })}
						</Button>
					</Box>

					{/* Для узких (мобильных) экранов */}
					<LocalShipping sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Кабинет юриста
					</Typography>

					<Box sx={{ flexGrow: 0 }}>
						<HeaderRightSide />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
