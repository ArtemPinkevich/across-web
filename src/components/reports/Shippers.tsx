import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme/theme";
import Header from "../global/Header";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useIntl } from "react-intl";
import { useState } from "react";
import FormControl from "../global/FormControl";

const Shippers = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const colors = tokens(settings.mode);
  const isDarkTheme = settings.mode === "dark";

  const handleOnSwitchChange = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Box m="20px">
      <Header title={intl.formatMessage({ id: "shippers" }).toUpperCase()} />
      <FormControl checked={showAll} onChange={handleOnSwitchChange} />
    </Box>
  );
};

export default Shippers;
