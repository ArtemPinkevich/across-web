import { useState } from "react";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarLogoAndMenuIcon from "./SidebarLogoAndMenuIcon";
import SidebarProfileInfo from "./SidebarProfileInfo";
import sidebarMenuItemParams from "./SidebarMenuItemParams";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkTheme = theme.palette.mode === "dark";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const rootStyle = {
    [`.css-dip3t8`]: {
      backgroundColor: colors.primary[400],
    },
  };

  const menuItemStyles = {
    button: {
      [":hover"]: {
        backgroundColor: colors.primary[isDarkTheme ? 300 : 900],
      },
    },
  };

  return (
    <ProSidebar rootStyles={rootStyle} collapsed={isCollapsed}>
      <Menu menuItemStyles={menuItemStyles}>
        <SidebarLogoAndMenuIcon
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {!isCollapsed && <SidebarProfileInfo />}

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          {sidebarMenuItemParams.map((params) => (
            <SidebarMenuItem
              key={params.title}
              title={params.title}
              to={params.to}
              icon={params.icon}
            />
          ))}
        </Box>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
