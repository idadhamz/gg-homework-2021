import React from "react";
import style from "./style.module.css";
import { Link, useHistory } from "react-router-dom";

// Assets
import SpotifyIcon from "../../assets/img/spotify.png";

// Components
import Image from "../Image";
import Button from "../Button";

// Utils
import authSpotify from "../../services/authSpotify";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuth, isLoggedIn, user } from "../../redux/slices/authSlice";

import { useColorMode } from "@chakra-ui/react";

const index = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoggedInValue = useAppSelector(isLoggedIn);
  const userValue = useAppSelector(user);

  const { colorMode, toggleColorMode } = useColorMode();

  const logoutAction = (e: any) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    history.push("/");
  };

  return (
    <div className={style.div_navbar}>
      <Link to="/create-playlist">
        <Image src={SpotifyIcon} />
      </Link>
      <div className={style.div_button}>
        <Button onClick={toggleColorMode} type="button">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {isLoggedInValue ? (
          <>
            <Link to="/create-playlist">
              <Button bg="#00A512" color="#fff">
                Create Playlists
              </Button>
            </Link>
            <Link to="/playlist">
              <Button bg="#00A512" color="#fff">
                {userValue?.display_name} Playlists
              </Button>
            </Link>
            <Button onClick={(e) => logoutAction(e)} bg="red" color="#fff">
              Logout Spotify
            </Button>
          </>
        ) : (
          <Button onClick={(e) => authSpotify(e)} bg="#00A512" color="#fff">
            Login On Spotify
          </Button>
        )}
      </div>
    </div>
  );
};

export default index;
