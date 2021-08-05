import React from "react";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// Components
import Button from "../../components/Button";

// Utils
import requestAuth from "../../utils/requestAuth";

// Slices
import { setAuth } from "../../redux/slices/authSlice";

const index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutAction = (e) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    history.push("/");
  };

  return (
    <div className={style.div_navbar}>
      <Link to="/playlist">
        <h1>Spotify</h1>
      </Link>
      {isLoggedIn ? (
        <div className={style.div_button}>
          <Link to="/create-playlist">
            <Button style={{ backgroundColor: "#00A512" }}>
              Create Playlists
            </Button>
          </Link>
          <Button
            onClick={(e) => logoutAction(e)}
            style={{ backgroundColor: "red" }}
          >
            Logout Spotify
          </Button>
        </div>
      ) : (
        <Button
          onClick={(e) => requestAuth(e)}
          style={{ backgroundColor: "#00A512", textTransform: "uppercase" }}
        >
          Login On Spotify
        </Button>
      )}
    </div>
  );
};

export default index;
