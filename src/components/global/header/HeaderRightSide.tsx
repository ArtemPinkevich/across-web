import React from "react";
import { PaletteMode, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { FormattedMessage } from "react-intl";
import { setSettings } from "../../../store/slices/settingsSlice";
import { LocalStorageKeys, saveInLocalStorage } from "../../../services/LocalStorageService";
import { setIsLogined } from "../../../store/slices/authSlice";

export default function HeaderRightSide() {
	const dispatch = useDispatch();
	const settings = useSelector((state: IRootState) => state.settings);
	const isDarkTheme = settings.mode === "dark";
	const isRussian = settings.localization === "ru";

	const handleOnChangeMode = (mode: PaletteMode) => {
		dispatch(
			setSettings({
				...settings,
				mode: mode,
			}),
		);
	};

	const handleOnChangeLang = (lang: string) => {
		dispatch(
			setSettings({
				...settings,
				localization: lang,
			}),
		);
	};

	const handleOnLogout = () => {
		saveInLocalStorage(LocalStorageKeys.accessToken, "");
		dispatch(setIsLogined(false));
	};

	return (
		<React.Fragment>
			<IconButton onClick={() => handleOnChangeMode(isDarkTheme ? "light" : "dark")}>
				{isDarkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
			</IconButton>

			{/* <IconButton
        sx={{ fontSize: 14 }}
        onClick={() => handleOnChangeLang(isRussian ? "en" : "ru")}
      >
        <FormattedMessage id="lang" />
      </IconButton>*/}

			<IconButton component={Link} to={"/profile"}>
				<PersonOutlinedIcon />
			</IconButton>

			<Tooltip title="Выйти" sx={{ ml: 2 }}>
				<IconButton onClick={handleOnLogout}>
					<LogoutIcon />
				</IconButton>
			</Tooltip>
		</React.Fragment>
	);
}
