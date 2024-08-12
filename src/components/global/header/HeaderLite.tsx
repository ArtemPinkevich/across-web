import { Container, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import HeaderRightSide from "./HeaderRightSide";
import { useIntl } from "react-intl";

export default function HeaderLite() {
	const intl = useIntl();

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: "flex" }}>
						<Button component={Link} to={"/Counterparties"} sx={{ my: 2, color: "whitesmoke" }}>
							{intl.formatMessage({ id: "counterparties" })}
						</Button>

						<Button component={Link} to={"/profile"} sx={{ my: 2, color: "whitesmoke" }}>
							{intl.formatMessage({ id: "profile" })}
						</Button>

						<Button component={Link} to={"/bids"} sx={{ my: 2, color: "whitesmoke" }}>
							Заявки
						</Button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<HeaderRightSide />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
