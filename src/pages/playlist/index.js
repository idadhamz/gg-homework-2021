import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Pages
import PlaylistTrack from "../playlist-track";

// Components
import Image from "../../components/Image";

// Utils
import getParams from "../../utils/getParams";

// Slices
import { setAuth, setUser } from "../../redux/slices/authSlice";
import { setSelectedTrack } from "../../redux/slices/trackSlice";

// Services
import {
  getUserProfile,
  getUserPlaylists,
  getTrackPlaylist,
} from "../../services/apiSpotify";

const index = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [playlists, setPlaylists] = useState([]);

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
      }
    } else {
      dispatch(setAuth({ token: null, isLoggedIn: false }));
    }
  }, [token]);

  useEffect(() => {
    if (playlists) {
      playlists.map((playlist) => {
        getTrackPlaylist(token, playlist.id).then((data) =>
          data.items.map((item) => dispatch(setSelectedTrack(item.track.uri)))
        );
      });
    }
  }, [playlists]);

  const playlistView = () => {
    return (
      <>
        <Router>
          {console.log(playlists)}
          <h1>Daftar Playlist</h1>
          <div className={style.playlists}>
            {playlists.map((playlist) => (
              <Link
                to={`/playlist/${playlist.id}`}
                key={playlist.id}
                className={style.item_playlist}
              >
                <Image
                  src={playlist.images[0]?.url}
                  width={playlist.images[0]?.width}
                  height={playlist.images[0]?.height}
                />
                <div className={style.text_playlist}>
                  <h1>{playlist.name}</h1>
                  <p>{playlist.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <Switch>
            <Route path="/playlist/:id">
              <PlaylistTrack />
            </Route>
          </Switch>
        </Router>
      </>
    );
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
