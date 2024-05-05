import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme/theme";
import Header from "../global/Header";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useIntl } from "react-intl";

const Shippers = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const colors = tokens(settings.mode);

  return (
    <Box m="20px">
      <Header title={intl.formatMessage({ id: "shippers" }).toUpperCase()} />
    </Box>
  );
};

export default Shippers;
