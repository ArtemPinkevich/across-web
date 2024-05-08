import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../reducers/settingsReducer";
import { personApi } from "../services/persons";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    [personApi.reducerPath]: personApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personApi.middleware),
});

setupListeners(store.dispatch);

export type IRootState = ReturnType<typeof store.getState>;
