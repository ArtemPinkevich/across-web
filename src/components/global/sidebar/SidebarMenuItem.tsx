import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { tokens } from "../../../theme/theme";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

export type SidebarMenuItemParams = {
  title: string;
  to: string;
  icon: JSX.Element;
};

const SidebarMenuItem = ({ title, to, icon }: SidebarMenuItemParams) => {
  const settings = useSelector((state: IRootState) => state.settings);
  const colors = tokens(settings.mode);

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
