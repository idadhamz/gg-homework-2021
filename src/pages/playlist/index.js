import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";

// Components
import PlaylistSearch from "../../components/playlist-search";
import PlaylistItem from "../../components/playlist-item";

// Utils
import getParams from "../../utils/getParams";
import { selectPlaylist } from "../../utils/selectPlaylist";

// Slices
import { setAuth, setUser } from "../../redux/slices/authSlice";
import { setSelectedTrack } from "../../redux/slices/trackSlice";

// Services
import {
  getUserProfile,
  getUserPlaylists,
  getTrackPlaylist,
  getSearchTrack,
} from "../../services/apiSpotify";

const index = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const selectedTrack = useSelector((state) => state.track.selectedTrack);

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");

  const [playlists, setPlaylists] = useState([]);
  const { checkSelected, handleSelect } = selectPlaylist();

  useEffect(() => {
    const params = token === null ? getParams() : token;
    if (params) {
      dispatch(
        setAuth({
          token: token === null ? params.access_token : token,
          isLoggedIn: true,
        })
      );
      if (token) {
        getUserProfile(token).then((data) => dispatch(setUser(data)));
        getUserPlaylists(token).then((data) => setPlaylists(data.items));
        getTrackPlaylist(token, "71vfD2vkEQVJwvjkya5w0D").then((data) =>
          data.items.map((item) => dispatch(setSelectedTrack(item.track.uri)))
        );
        getSearchTrack(token, "JKT 48").then((data) =>
          setTrack(data.tracks.items)
        );
      }
    } else {
      dispatch(setAuth({ token: null, isLoggedIn: false }));
    }
  }, [token]);

  console.log(selectedTrack);

  const playlistView = () => {
    return (
      <>
        {/* {playlists.map((item) => {
          console.log(item);
        })} */}

        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p>

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
                playlistId={playlist.id}
              />
            ))}
          </div>
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

  const nullPlaylistView = () => {
    return (
      <>
        <h1 className={style.h1_null}>Login to Access Data</h1>
      </>
    );
  };

  return (
    <div className={style.playlist}>
      <div className={style.list_playlist}>
        {isLoggedIn ? playlistView() : nullPlaylistView()}
      </div>
    </div>
  );
};

export default index;
