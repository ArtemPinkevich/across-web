import { createSlice } from "@reduxjs/toolkit";

type SettingsProps = {
	isLogined: boolean;
};

const defaultState: SettingsProps = {
	isLogined: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: defaultState,
	reducers: {
		setIsLogined(state, action) {
			state.isLogined = action.payload;
		},
	},
});

export const { setIsLogined } = authSlice.actions;

export default authSlice.reducer;
