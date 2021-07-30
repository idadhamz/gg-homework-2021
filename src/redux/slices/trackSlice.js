import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTrack: [],
};

export const trackSlice = createSlice({
  name: "trackSlice",
  initialState,
  reducers: {
    setSelectedTrack: (state, action) => {
      state.selectedTrack.push(action.payload);
    },
  },
});

export const { setSelectedTrack } = trackSlice.actions;

export default trackSlice.reducer;
