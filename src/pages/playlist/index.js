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

// Services
import {
  getUserProfile,
  getUserPlaylists,
  getTrackPlaylist,
  getSearchTrack,
} from "../../services/apiSpotify";

const index = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [showFormPlaylist, setshowFormPlaylist] = useState(false);

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");

  const [playlists, setPlaylists] = useState([]);
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const { checkSelected, handleSelect, selectedTrack } = selectPlaylist();

  useEffect(() => {
    const params = getParams();
    if (params) {
      dispatch(setToken(params.access_token));
      if (token) {
        setIsLoggedIn(true);
        getUserProfile(token).then((data) => setUser(data));
        getUserPlaylists(token).then((data) => setPlaylists(data.items));
        getTrackPlaylist(token).then((data) =>
          data.items.map((item) => selectedTrack.push(item.track.uri))
        );
      }
    } else {
      dispatch(setToken(null));
      setIsLoggedIn(false);
    }
  }, [token]);

  const playlistView = () => {
    return (
      <>
        <div style={{ display: showFormPlaylist ? "block" : "none" }}>
          <h2>Playlist Form</h2>
          <PlaylistForm
            handleSubmitForm={handleSubmitForm}
            handleChangeForm={handleChangeForm}
            formPlaylist={formPlaylist}
          />
        </div>

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
            userPlaylists={playlists}
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
      getSearchTrack(token, input).then((data) => setTrack(data.tracks.items));
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
    ).then((res) => res.json());

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

  const formPlaylistAction = (e) => {
    e.preventDefault();
    setshowFormPlaylist(!showFormPlaylist);
  };

  const logoutAction = (e) => {
    e.preventDefault();

    setIsLoggedIn(false);
    dispatch(setToken(null));

    window.location.href = "http://localhost:3001/";
  };

  return (
    <div className={style.playlist}>
      <div className={style.title}>
        <h1>Spotify</h1>
        {isLoggedIn ? (
          <div>
            <Button
              onClick={(e) => formPlaylistAction(e)}
              style={{ backgroundColor: showFormPlaylist ? "red" : "#00A512" }}
            >
              {showFormPlaylist ? "Cancel Create" : "Create Playlists"}
            </Button>
            <Button
              onClick={(e) => logoutAction(e)}
              style={{ margin: "0 1rem", backgroundColor: "red" }}
            >
              Logout In Spotify
            </Button>
          </div>
        ) : (
          <Button
            onClick={(e) => requestAuth(e)}
            style={{ backgroundColor: "#00A512" }}
          >
            Login On Spotify
          </Button>
        )}
      </div>

      <div className={style.list_playlist}>
        {isLoggedIn ? playlistView() : nullPlaylistView()}
      </div>
    </div>
  );
};

export default index;
