import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import trackReducer from "./redux/slices/trackSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    track: trackReducer,
  },
});
