import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../reducers/settingsReducer";
import notificationReducer from "../reducers/notificationReducer";
import { personApi } from "../services/persons";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./rtkQuery/profileApi";
import { ordersApi } from "./rtkQuery/ordersApi";
import { truckApi } from "./rtkQuery/truckApi";
import { searchApi } from "./rtkQuery/searchApi";

export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		notification: notificationReducer,
		[personApi.reducerPath]: personApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		[truckApi.reducerPath]: truckApi.reducer,
		[searchApi.reducerPath]: searchApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			personApi.middleware,
			profileApi.middleware,
			ordersApi.middleware,
			truckApi.middleware,
			searchApi.middleware,
		),
});

setupListeners(store.dispatch);

export type IRootState = ReturnType<typeof store.getState>;
