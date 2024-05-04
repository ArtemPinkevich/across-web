import { MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

type SidebarLogoAndMenuIconProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarLogoAndMenuIcon = ({
  isCollapsed,
  setIsCollapsed,
}: SidebarLogoAndMenuIconProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const menuItemStyle = {
    margin: "10px 0 20px 0",
    color: colors.grey[100],
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ml: "15px",
  };

  const typographyStyle = {
    color: colors.grey[100],
  };

  return (
    <MenuItem
      onClick={() => setIsCollapsed(!isCollapsed)}
      icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
      style={menuItemStyle}
    >
      {!isCollapsed && (
        <Box sx={boxStyle}>
          <Typography variant="h3" sx={typographyStyle}>
            JURIST
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </MenuItem>
  );
};

export default SidebarLogoAndMenuIcon;
