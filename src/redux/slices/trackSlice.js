import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTrack: [],
};

export const trackSlice = createSlice({
  name: "trackSlice",
  initialState,
  reducers: {
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    setNullSelectedTrack: (state) => {
      state.selectedTrack = [];
    },
  },
});

export const { setSelectedTrack, setNullSelectedTrack } = trackSlice.actions;

export default trackSlice.reducer;
