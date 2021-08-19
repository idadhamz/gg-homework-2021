import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PlaylistState } from "../types/store";

const initialState: PlaylistState = {
  playlists: [],
  playlistSelected: {
    id: "",
    name: "",
    description: "",
  },
  playlistTracks: [],
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
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setPlaylistSelected: (state, action) => {
      const { id, name, description } = action.payload;
      state.playlistSelected.id = id;
      state.playlistSelected.name = name;
      state.playlistSelected.description = description;
    },
    clearPlaylistSelected: (state) => {
      state.playlistSelected = initialState.playlistSelected;
    },
    setPlaylistTracks: (state, action) => {
      state.playlistTracks = action.payload;
    },
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
  setPlaylists,
  setPlaylistSelected,
  clearPlaylistSelected,
  setPlaylistTracks,
  addSelectedTrack,
  removeSelectedTrack,
  clearSelectedTrack,
  setForm,
  clearForm,
  clearState,
} = playlistSlice.actions;

export const playlists = (state: RootState) => state.playlist.playlists;
export const playlistSelected = (state: RootState) =>
  state.playlist.playlistSelected;
export const playlistTracks = (state: RootState) =>
  state.playlist.playlistTracks;
export const selectedTrack = (state: RootState) => state.playlist.selectedTrack;
export const form = (state: RootState) => state.playlist.form;

export default playlistSlice.reducer;
