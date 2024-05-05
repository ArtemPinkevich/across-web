import { useState } from "react";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { tokens } from "../../../theme/theme";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarLogoAndMenuIcon from "./SidebarLogoAndMenuIcon";
import SidebarProfileInfo from "./SidebarProfileInfo";
import sidebarMenuItemParams from "./SidebarMenuItemParams";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { useIntl } from "react-intl";

const Sidebar = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const colors = tokens(settings.mode);
  const isDarkTheme = settings.mode === "dark";

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
              key={intl.formatMessage({ id: `${params.title}` })}
              title={intl.formatMessage({ id: `${params.title}` })}
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
