import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import trackReducer from "./redux/slices/trackSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    track: trackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch