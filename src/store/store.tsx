import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../reducers/settingsReducer";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
