import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

// Pages
import PlaylistTrack from "../playlist-track";

// Components
import Image from "../../components/Image";

// Slices
import { setUser } from "../../redux/slices/authSlice";
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

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (token) {
      getUserProfile(token).then((data) => dispatch(setUser(data)));
      getUserPlaylists(token).then((data) => setPlaylists(data.items));
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
          <Text fontSize="2rem" fontWeight="900">
            Daftar Playlist
          </Text>
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

  return (
    <Box m="0 auto">
      <Box
        display="flex"
        flexDir="column"
        gridGap="1rem"
        m="2rem 0"
        p={{ base: "0 2rem", lg: "0 8rem" }}
      >
        {playlistView()}
      </Box>
    </Box>
  );
};

export default index;
