import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTrack: {
    playlists: { id: "", tracks: [] },
  },
};

export const trackSlice = createSlice({
  name: "trackSlice",
  initialState,
  reducers: {
    setSelectedTrack: (state, action) => {
      state.selectedTrack.playlists.tracks.push(action.payload);
    },
  },
});

export const { setSelectedTrack } = trackSlice.actions;

export default trackSlice.reducer;
