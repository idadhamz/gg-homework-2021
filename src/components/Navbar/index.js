import React from "react";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

// Pages
import Playlist from "../../pages/playlist";
import CreatePlaylist from "../../pages/create-playlist";

// Components
import Button from "../../components/Button";

// Utils
import requestAuth from "../../utils/requestAuth";

// Slices
import { setAuth } from "../../redux/slices/authSlice";

const index = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  const logoutAction = (e) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    window.location.href = "http://localhost:3001/";
  };

  return (
    <Router>
      <div className={style.title}>
        <Link to="/">
          <h1>Spotify</h1>
        </Link>
        {isLoggedIn ? (
          <div>
            <Link to="/create-playlist">
              <Button style={{ backgroundColor: "#00A512" }}>
                Create Playlists
              </Button>
            </Link>
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

      <Switch>
        <Route path="/create-playlist">
          {isLoggedIn ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <Playlist />
        </Route>
      </Switch>
    </Router>
  );
};

export default index;
