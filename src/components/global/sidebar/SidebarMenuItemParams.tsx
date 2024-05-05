import { SidebarMenuItemParams } from "./SidebarMenuItem";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const sidebarMenuItemParams: SidebarMenuItemParams[] = [
  { title: "shippers", to: "/shippers", icon: <ReceiptOutlinedIcon /> },
  { title: "drivers", to: "/drivers", icon: <LocalShippingOutlinedIcon /> },
  { title: "profile", to: "/profile", icon: <PersonOutlinedIcon /> },
];

export default sidebarMenuItemParams;
