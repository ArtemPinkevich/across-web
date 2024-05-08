import { Box, IconButton, InputBase, PaletteMode } from "@mui/material";
import { tokens } from "../../theme/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../reducers/settingsReducer";
import { IRootState } from "../../store/store";
import { FormattedMessage, useIntl } from "react-intl";
import { useState, useEffect } from "react";

const Topbar = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const [filter, setFilter] = useState("");
  const colors = tokens(settings.mode);
  const isDarkTheme = settings.mode === "dark";
  const isRussian = settings.localization === "ru";

  useEffect(() => {setFilter("")},[]);

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

  const handleOnChangeFilter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const handleOnFilter = () => {
    dispatch(
      setSettings({
        ...settings,
        filter: filter,
      }),
    );
  };

  const topbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    p: 2,
  };

  const searchBarStyle = {
    display: "flex",
    borderRadius: "3px",
    backgroundColor: colors.primary[400],
  };

  const searchButtonStyle = {
    p: 1,
  };

  const searchInputStyle = {
    ml: 2,
    flex: 1,
  };

  const iconsStyle = {
    display: "flex",
  };

  return (
    <Box sx={topbarStyle}>
      {/* SEARCH BAR */}
      <Box sx={searchBarStyle}>
        <InputBase
          sx={searchInputStyle}
          placeholder={intl.formatMessage({ id: "search" })}
          onChange={handleOnChangeFilter}
          value={filter}
        />
        <IconButton
          type="button"
          sx={searchButtonStyle}
          onClick={handleOnFilter}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box sx={iconsStyle}>
        <IconButton
          onClick={() => handleOnChangeMode(isDarkTheme ? "light" : "dark")}
        >
          {isDarkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={() => handleOnChangeLang(isRussian ? "en" : "ru")}>
          <FormattedMessage id="lang" />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
