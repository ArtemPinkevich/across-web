import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const SidebarProfileInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    color: colors.greenAccent[500],
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
