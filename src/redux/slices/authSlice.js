import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
  user: [],
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (action.payload !== null) {
        const { token, isLoggedIn } = action.payload;
        state.token = token;
        state.isLoggedIn = isLoggedIn;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
