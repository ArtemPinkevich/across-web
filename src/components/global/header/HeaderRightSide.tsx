import { PaletteMode, Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { FormattedMessage } from "react-intl";
import { setSettings } from "../../../store/slices/settingsSlice";
import React from "react";

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
      </IconButton>

      <IconButton>
        <PersonOutlinedIcon fontSize="small" />
      </IconButton> */}

			<Tooltip title="Выйти" sx={{ ml: 2 }}>
				<IconButton>
					<ExitToAppIcon />
				</IconButton>
			</Tooltip>
		</React.Fragment>
	);
}
