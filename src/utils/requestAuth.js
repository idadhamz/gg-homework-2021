const generateRandomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const requestAuth = (e) => {
    e.preventDefault()

    const AUTHORIZE = 'https://accounts.spotify.com/authorize'
    const REDIRECT_URL = 'http://localhost:3001/'
    const SCOPE = 'user-read-private playlist-modify-private user-read-email'
    const STATE = generateRandomString(16);

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID

    let URL = `${AUTHORIZE}?client_id=${encodeURIComponent(CLIENT_ID)}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&show_dialog=true&scope=${encodeURIComponent(SCOPE)}&state=${encodeURIComponent(STATE)}`

    window.location.href = URL
}

export default requestAuth 