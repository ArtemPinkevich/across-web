import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { tokens } from "../../theme/theme";
import { IRootState } from "../../store/store";

const FormControl = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const colors = tokens(settings.mode);
  const isDarkTheme = settings.mode === "dark";

  const switchStyle = {
    ["& .MuiSwitch-switchBase"]: {
      ["&.Mui-checked"]: {
        ["& + .MuiSwitch-track"]: {
          backgroundColor: colors.grey[500],
        },
      },
    },
    ["& .MuiSwitch-thumb"]: {
      boxSizing: "border-box",
      width: 20,
      height: 20,
      color: colors.primary[isDarkTheme ? 100 : 600],
    },
    ["& .MuiSwitch-track"]: {
      borderRadius: 26 / 2,
      backgroundColor: colors.grey[isDarkTheme ? 100 : 700],
    },
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={onChange} sx={switchStyle} />
      }
      label={intl.formatMessage({ id: "showAll" })}
    />
  );
};

export default FormControl;
