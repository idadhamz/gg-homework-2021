const API_SPOTIFY_ME = "https://api.spotify.com/v1/me";
const API_SPOTIFY_PLAYLISTS = "https://api.spotify.com/v1/playlists";

const getUserProfile = async (token) => {
  return await fetch(`${API_SPOTIFY_ME}`, {
    headers: {
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getUserPlaylists = async (token) => {
  return await fetch(`${API_SPOTIFY_ME}/playlists`, {
    headers: {
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getTrackPlaylist = async (token, playlist_id) => {
  return await fetch(`${API_SPOTIFY_PLAYLISTS}/${playlist_id}/tracks`, {
    headers: {
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getSearchTrack = async (token, input) => {
  const reqOptions = {
    headers: {
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json",
    },
  };
  return await fetch(
    `https://api.spotify.com/v1/search?q=${input}&type=track&limit=10`,
    reqOptions
  ).then((res) => res.json());
};

const addNewTrack = async (token, id, playlist_id) => {
  const reqOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json",
    },
  };
  return await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${id}`,
    reqOptions
  ).then((res) => res.json());
};

export {
  getUserProfile,
  getUserPlaylists,
  getTrackPlaylist,
  getSearchTrack,
  addNewTrack,
};
