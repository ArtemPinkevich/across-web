import { Container, Tabs, Tab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import HeaderRightSide from "./HeaderRightSide";
import { useIntl } from "react-intl";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { PersonRole } from "../../../models/persons/personModels";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

export default function HeaderLite() {
	const intl = useIntl();
	const { data: profile } = useGetProfileQuery();
	const settings = useSelector((state: IRootState) => state.settings);

	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<AppBar position="static" color={settings.mode === "light" ? "transparent" : "default"}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{profile?.role === PersonRole.LAWYER && (
						<Box sx={{ flexGrow: 1, display: "flex" }}>
							<Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
								<Tab label={intl.formatMessage({ id: "counterparties" })} component={Link} to={"/counterparties"} />
							</Tabs>
						</Box>
					)}

					{profile?.role === PersonRole.ADMIN && (
						<Box sx={{ flexGrow: 1, display: "flex" }}>
							<Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
								<Tab label="Заявки" component={Link} to={"/bids"} />
								<Tab label="Подборки" component={Link} to={"/matches"} />
								<Tab label="Поиск груза" component={Link} to={"/search"} />
								<Tab label="Поиск машин" component={Link} to={"/searchTruck"} />
								<Tab label="В работе" component={Link} to={"/in-progress"} />
							</Tabs>
						</Box>
					)}

					<Box sx={{ flexGrow: 0 }}>
						<HeaderRightSide />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
