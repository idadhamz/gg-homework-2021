import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
