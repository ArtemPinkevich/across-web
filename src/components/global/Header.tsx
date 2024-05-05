import { Typography, Box } from "@mui/material";
import { tokens } from "../../theme/theme";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const Header = ({ title }: { title: string }) => {
  const settings = useSelector((state: IRootState) => state.settings);
  const colors = tokens(settings.mode);

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
