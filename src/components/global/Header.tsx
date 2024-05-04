import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title }: { title: string }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const headerStyle = {
    color: colors.grey[100],
    fontWeight: "bold",
    m: "0 0 5px 0",
  };

  return (
    <Box mb="30px">
      <Typography variant="h2" sx={headerStyle}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
