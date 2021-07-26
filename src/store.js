import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./redux/slices/tokenSlice";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
