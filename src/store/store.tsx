import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import notificationReducer from "./slices/notificationSlice";
import authReducer from "./slices/authSlice";
import { personApi } from "./rtkQuery/personsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./rtkQuery/profileApi";
import { ordersApi } from "./rtkQuery/ordersApi";
import { truckApi } from "./rtkQuery/truckApi";
import { searchApi } from "./rtkQuery/searchApi";
import { authApi } from "./rtkQuery/authApi";

export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		notification: notificationReducer,
		auth: authReducer,
		[personApi.reducerPath]: personApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		[truckApi.reducerPath]: truckApi.reducer,
		[searchApi.reducerPath]: searchApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			personApi.middleware,
			profileApi.middleware,
			ordersApi.middleware,
			truckApi.middleware,
			searchApi.middleware,
			authApi.middleware,
		),
});

setupListeners(store.dispatch);

export type IRootState = ReturnType<typeof store.getState>;
