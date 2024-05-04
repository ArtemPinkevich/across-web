import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isDarkTheme = theme.palette.mode === "dark";

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
        <InputBase sx={searchInputStyle} placeholder="Search" />
        <IconButton type="button" sx={searchButtonStyle}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box sx={iconsStyle}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {isDarkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
