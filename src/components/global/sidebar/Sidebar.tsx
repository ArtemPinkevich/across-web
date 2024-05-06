import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { tokens } from "../../../theme/theme";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarLogoAndMenuIcon from "./SidebarLogoAndMenuIcon";
import SidebarProfileInfo from "./SidebarProfileInfo";
import sidebarMenuItemParams from "./SidebarMenuItemParams";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../../../reducers/settingsReducer";
import { IRootState } from "../../../store/store";
import { useIntl } from "react-intl";

const Sidebar = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const dispatch = useDispatch();
  const intl = useIntl();
  const colors = tokens(settings.mode);
  const isDarkTheme = settings.mode === "dark";

  const setIsCollapsed = () => {
    dispatch(
      setSettings({
        ...settings,
        isSidebarCollapsed: !settings.isSidebarCollapsed,
      }),
    );
  };

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
    <ProSidebar rootStyles={rootStyle} collapsed={settings.isSidebarCollapsed}>
      <Menu menuItemStyles={menuItemStyles}>
        <SidebarLogoAndMenuIcon
          isCollapsed={settings.isSidebarCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {!settings.isSidebarCollapsed && <SidebarProfileInfo />}

        <Box paddingLeft={settings.isSidebarCollapsed ? undefined : "10%"}>
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
