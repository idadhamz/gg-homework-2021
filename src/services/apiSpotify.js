const API_SPOTIFY = "https://api.spotify.com/v1";

const getUserProfile = async (token) => {
  return await fetch(`${API_SPOTIFY}/me`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getUserPlaylists = async (token) => {
  return await fetch(`${API_SPOTIFY}/me/playlists`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getTrackPlaylist = async (token, playlist_id) => {
  return await fetch(`${API_SPOTIFY}/playlists/${playlist_id}/tracks`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getSearchTrack = async (token, input) => {
  const reqOptions = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return await fetch(
    `${API_SPOTIFY}/search?q=${input}&type=track&limit=10`,
    reqOptions
  ).then((res) => res.json());
};

const createNewPlaylist = async (token, userId, newPlaylist) => {
  const reqOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newPlaylist.title,
      description: newPlaylist.description,
      public: false,
      collaborative: false,
    }),
  };
  return await fetch(
    `${API_SPOTIFY}/users/${userId}/playlists`,
    reqOptions
  ).then((res) => res.json());
};

const addTrackToPlaylist = async (token, newPlaylistId, track) => {
  const reqOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: track,
      position: 0,
    }),
  };
  return await fetch(
    `${API_SPOTIFY}/playlists/${newPlaylistId}/tracks?uris=${track}`,
    reqOptions
  ).then((res) => res.json());
};

export {
  getUserProfile,
  getUserPlaylists,
  getTrackPlaylist,
  getSearchTrack,
  createNewPlaylist,
  addTrackToPlaylist,
};
