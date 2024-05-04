import { Link } from "react-router-dom";
import { Button, Typography, useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { tokens } from "../../../theme";

export type SidebarMenuItemParams = {
  title: string;
  to: string;
  icon: JSX.Element;
};

const SidebarMenuItem = ({ title, to, icon }: SidebarMenuItemParams) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const menuItemStyle = {
    color: colors.grey[100],
  };

  return (
    <MenuItem
      style={menuItemStyle}
      component={<Button component={Link} to={to} />}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default SidebarMenuItem;
