import { Box } from "@mui/material";
import Header from "./Header";
import { useIntl } from "react-intl";

const Profile = () => {
  const intl = useIntl();

  return (
    <Box m="20px">
      <Header title={intl.formatMessage({ id: "profile" }).toUpperCase()} />
    </Box>
  );
};

export default Profile;
