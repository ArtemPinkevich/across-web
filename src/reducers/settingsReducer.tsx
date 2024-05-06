import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

type SettingsProps = {
  mode: PaletteMode;
  localization: string;
  isSidebarCollapsed: boolean;
};

const defaultState: SettingsProps = {
  mode: "dark",
  localization: "ru",
  isSidebarCollapsed: false,
};

const getInitialState = (defaultState: SettingsProps): SettingsProps => {
  const value = localStorage.getItem("webLocalSettings");
  return (value === null ? defaultState : JSON.parse(value)) || defaultState;
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: getInitialState(defaultState),
  reducers: {
    setSettings(_, action) {
      localStorage.setItem("webLocalSettings", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
