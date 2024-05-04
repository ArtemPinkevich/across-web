import { SidebarMenuItemParams } from "./SidebarMenuItem";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const sidebarMenuItemParams: SidebarMenuItemParams[] = [
  { title: "Shippers", to: "/shippers", icon: <LocalShippingOutlinedIcon /> },
  { title: "Сarriers", to: "/carriers", icon: <ReceiptOutlinedIcon /> },
  { title: "Profile", to: "/profile", icon: <PersonOutlinedIcon /> },
  { title: "Calendar", to: "/calendar", icon: <CalendarTodayOutlinedIcon /> },
  { title: "FAQ Page", to: "/faq", icon: <HelpOutlineOutlinedIcon /> },
];

export default sidebarMenuItemParams;
