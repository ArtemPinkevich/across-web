import { createSlice } from "@reduxjs/toolkit";

type NotificationStateType = "success" | "error" | "warning";

type NotificationProps = {
	message: string;
	state: NotificationStateType;
	isActive: boolean;
};

const defaultState: NotificationProps = {
	message: "",
	state: "success",
	isActive: false,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState: defaultState,
	reducers: {
		setNotification(_, action) {
			return action.payload;
		},
	},
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
