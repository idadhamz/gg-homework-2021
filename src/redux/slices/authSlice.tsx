import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../../store'

interface AuthState {
  token: string,
  isLoggedIn: boolean,
  user: any
}

const initialState: AuthState = {
  token: '',
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

export const token = (state: RootState) => state.auth.token
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const user = (state: RootState) => state.auth.user

export default authSlice.reducer;
