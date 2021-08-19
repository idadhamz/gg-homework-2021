import { UserProfile } from "./spotify";

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  user: UserProfile | null;
}

export interface PlaylistState {
  playlists: [];
  playlistSelected: {
    id: string;
    name: string;
    description: string;
  };
  playlistTracks: [];
  selectedTrack: string[];
  form: {
    title: string;
    description: string;
  };
}
