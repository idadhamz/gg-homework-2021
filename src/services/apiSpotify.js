const API_SPOTIFY = "https://api.spotify.com/v1";

const getUserProfile = async (tokenValue) => {
  return await fetch(`${API_SPOTIFY}/me`, {
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getUserPlaylists = async (tokenValue) => {
  return await fetch(`${API_SPOTIFY}/me/playlists`, {
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getTrackPlaylist = async (tokenValue, playlistId) => {
  return await fetch(`${API_SPOTIFY}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getSearchTrack = async (tokenValue, input) => {
  const reqOptions = {
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
  };
  return await fetch(
    `${API_SPOTIFY}/search?q=${input}&type=track&limit=10`,
    reqOptions
  ).then((res) => res.json());
};

const createNewPlaylist = async (tokenValue, userId, newPlaylist) => {
  const reqOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenValue,
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

const addTrackToPlaylist = async (
  tokenValue,
  newPlaylistId,
  selectedTracks
) => {
  const reqOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: selectedTracks,
      position: 0,
    }),
  };
  return await fetch(
    `${API_SPOTIFY}/playlists/${newPlaylistId}/tracks?uris=${selectedTracks}`,
    reqOptions
  ).then((res) => res.json());
};

const unFollowPlaylist = async (tokenValue, playlistId) => {
  const reqOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenValue,
      "Content-Type": "application/json",
    },
  };
  return await fetch(
    `${API_SPOTIFY}/playlists/${playlistId}/followers`,
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
  unFollowPlaylist,
};
