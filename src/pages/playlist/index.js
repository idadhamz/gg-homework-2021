import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";

// Components
import PlaylistForm from "../../components/playlist-form";
import PlaylistSearch from "../../components/playlist-search";
import PlaylistItem from "../../components/playlist-item";
import Button from "../../components/Button";

// Utils
import getParams from "../../utils/getParams";
import requestAuth from "../../utils/requestAuth";
import { selectPlaylist } from "../../utils/selectPlaylist";

// Slices
import { setToken } from "../../redux/slices/tokenSlice";

const index = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);

  // const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");

  const [playlists, setPlaylists] = useState([]);
  const [idPlaylist, setIdPlaylist] = useState("");
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const { checkSelected, handleSelect, selectedTrack } = selectPlaylist();

  useEffect(() => {
    const params = getParams();
    if (params) {
      dispatch(setToken(params.access_token));
      setIsLoggedIn(true);
      if (token) {
        getUserProfile();
        getUserPlaylists();
        getTrackPlaylist();
      }
    } else {
      dispatch(setToken(null));
      setIsLoggedIn(false);
    }
  }, [token]);

  const getUserProfile = async () => {
    const valueUser = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: "Bearer " + `${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    setUser(valueUser);
  };

  const getUserPlaylists = async () => {
    const playlistsValue = await fetch(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    setPlaylists(playlistsValue.items);
    setIdPlaylist(playlistsValue.items.map((item) => item.id));
  };

  const getTrackPlaylist = async () => {
    const trackPlaylist = await fetch(
      `https://api.spotify.com/v1/playlists/2d06A7FChFo0lGv0rUoXsg/tracks`,
      {
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    trackPlaylist.items.map((item) => {
      selectedTrack.push(item.track.uri);
    });
  };

  console.log(selectedTrack);

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
          Authorization: "Bearer " + `${token}`,
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
        Authorization: "Bearer " + `${token}`,
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
        <h1 className={style.h1_null}>Login to Access Data</h1>
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
