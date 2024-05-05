import { Box, Typography } from "@mui/material";
import { tokens } from "../../../theme/theme";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

const SidebarProfileInfo = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const colors = tokens(settings.mode);

  const sidebarProfileInfoBoxStyle = {
    mb: "25px",
  };

  const avatarBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const avatarImgStyle = {
    width: "100px",
    height: "100px",
    cursor: "pointer",
    borderRadius: "50%",
  };

  const usernameStyle = {
    color: colors.grey[100],
    fontWeight: "bold",
    m: "10px 0 0 0",
  };

  const jobTytleStyle = {
    color: colors.greenAccent[300],
  };

  return (
    <Box sx={sidebarProfileInfoBoxStyle}>
      <Box sx={avatarBoxStyle}>
        <img
          style={avatarImgStyle}
          alt="profile-user"
          src={`../../avatars/useravatar.png`}
        />
      </Box>
      <Box textAlign="center">
        <Typography variant="h2" sx={usernameStyle}>
          Mock Name
        </Typography>
        <Typography variant="h5" sx={jobTytleStyle}>
          Mock job title
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarProfileInfo;
