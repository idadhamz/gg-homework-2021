import React, { useState, useEffect } from "react";
import style from "./style.module.css";

// Components
import PlaylistForm from "../../components/playlist-form";
import PlaylistSearch from "../../components/playlist-search";
import PlaylistItem from "../../components/playlist-item";
import Button from "../../components/Button";

// Utils
import getParams from "../../utils/getParams";
import requestAuth from "../../utils/requestAuth";
import { selectPlaylist } from "../../utils/selectPlaylist";

const index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");

  const [playlists, setPlaylists] = useState([]);
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const { checkSelected, handleSelect } = selectPlaylist();

  useEffect(() => {
    const params = getParams();
    if (params) {
      setToken(params);
      setIsLoggedIn(true);

      getUserProfile(params);
      getUserPlaylists(params);
    } else {
      setToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  const getUserProfile = async (params) => {
    const valueUser = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: "Bearer " + `${params.access_token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    setUser(valueUser);
  };

  const getUserPlaylists = async (params) => {
    const playlists = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: "Bearer " + `${params.access_token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    setPlaylists(playlists);
  };

  console.log(playlists);

  const playlistView = () => {
    return (
      <>
        <h2>Playlist Form</h2>
        <PlaylistForm
          handleSubmitForm={handleSubmitForm}
          handleChangeForm={handleChangeForm}
          formPlaylist={formPlaylist}
        />

        <PlaylistSearch
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          input={input}
        />

        {track.map((item, idx) => (
          <PlaylistItem
            data={item}
            key={item.id}
            idx={idx}
            handleSelect={handleSelect}
            isSelected={checkSelected(item.uri)}
          />
        ))}
      </>
    );
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const reqOptions = {
        headers: {
          Authorization: "Bearer " + `${token.access_token}`,
          "Content-Type": "application/json",
        },
      };
      const trackItem = await fetch(
        `https://api.spotify.com/v1/search?q=${input}&type=track&limit=10`,
        reqOptions
      ).then((response) => response.json());
      setTrack(trackItem.tracks.items);
    } else {
      setTrack([]);
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormPlaylist({ ...formPlaylist, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const users_id = user.id;
    const reqOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${token.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formPlaylist.title,
        description: formPlaylist.desc,
        public: false,
      }),
    };
    await fetch(
      `https://api.spotify.com/v1/users/${users_id}/playlists`,
      reqOptions
    ).then((response) => response.json());

    alert(`Create Playlist "${formPlaylist.title}" Successfully`);
    setFormPlaylist({ title: "", desc: "" });
  };

  const nullPlaylistView = () => {
    return (
      <>
        <h1 className={style.h1_null}>Must Login First!</h1>
      </>
    );
  };

  const logoutAction = (e) => {
    e.preventDefault();

    setIsLoggedIn(false);
    setToken(null);

    window.location.href = "http://localhost:3001/";
  };

  return (
    <div className={style.playlist}>
      <div className={style.title}>
        <h1>Spotify</h1>
        {isLoggedIn ? (
          <Button onClick={(e) => logoutAction(e)}>Logout In Spotify</Button>
        ) : (
          <Button onClick={(e) => requestAuth(e)}>Login On Spotify</Button>
        )}
      </div>

      <div className={style.list_playlist}>
        {isLoggedIn ? playlistView() : nullPlaylistView()}
      </div>
    </div>
  );
};

export default index;
