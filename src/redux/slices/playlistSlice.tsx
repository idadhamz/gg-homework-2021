import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PlaylistState } from "../types/store";

const initialState: PlaylistState = {
  selectedTrack: [],
  form: {
    title: "",
    description: "",
  },
};

export const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers: {
    addSelectedTrack: (state, action) => {
      state.selectedTrack.push(action.payload);
    },
    removeSelectedTrack: (state, action) => {
      const index = state.selectedTrack.indexOf(action.payload);
      state.selectedTrack.splice(index, 1);
    },
    clearSelectedTrack: (state) => {
      state.selectedTrack = [];
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    clearForm: (state) => {
      state.form = initialState.form;
    },
    clearState: () => initialState,
  },
});

export const {
  addSelectedTrack,
  removeSelectedTrack,
  clearSelectedTrack,
  setForm,
  clearForm,
  clearState,
} = playlistSlice.actions;

export const selectedTrack = (state: RootState) => state.playlist.selectedTrack;
export const form = (state: RootState) => state.playlist.form;

export default playlistSlice.reducer;
