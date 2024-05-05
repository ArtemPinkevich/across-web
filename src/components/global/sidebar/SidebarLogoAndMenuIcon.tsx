import { MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { tokens } from "../../../theme/theme";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

type SidebarLogoAndMenuIconProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarLogoAndMenuIcon = ({
  isCollapsed,
  setIsCollapsed,
}: SidebarLogoAndMenuIconProps) => {
  const settings = useSelector((state: IRootState) => state.settings);
  const colors = tokens(settings.mode);

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
            <FormattedMessage id="jurist" />
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
