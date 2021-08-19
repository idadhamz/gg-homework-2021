const authSpotify = (e) => {
  e.preventDefault();

  const AUTHORIZE = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL = "http://localhost:3000/";
  const SCOPE =
    "user-read-private playlist-read-private playlist-modify-private user-read-email";

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;

  const URL = `${AUTHORIZE}?client_id=${encodeURIComponent(
    CLIENT_ID
  )}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URL
  )}&show_dialog=true&scope=${encodeURIComponent(SCOPE)}`;

  window.location.href = URL;
};

export default authSpotify;
