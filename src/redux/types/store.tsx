import { UserProfile } from "./spotify";

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  user: UserProfile | null;
}

export interface PlaylistState {
  selectedTrack: string[];
  form: {
    title: string;
    description: string;
  };
}
