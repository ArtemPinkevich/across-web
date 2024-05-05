import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

type SettingsProps = {
  mode: PaletteMode;
  localization: string;
};

const initialState: SettingsProps = {
  mode: "dark",
  localization: "ru",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setSettings(_, action) {
      return action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
