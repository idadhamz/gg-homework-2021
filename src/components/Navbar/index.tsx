import React from "react";
import style from "./style.module.css";
import { Link, useHistory } from "react-router-dom";
import { Text } from "@chakra-ui/react";

// Components
import Button from "../Button";

// Utils
import requestAuth from "../../utils/requestAuth";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setAuth, isLoggedIn, user } from "../../redux/slices/authSlice";

import { useColorMode } from "@chakra-ui/react";

const index = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoggedInValue = useAppSelector(isLoggedIn);
  const userValue = useAppSelector(user)

  const { colorMode, toggleColorMode } = useColorMode();

  const logoutAction = (e:any) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    history.push("/");
  };

  console.log(userValue);

  return (
    <div className={style.div_navbar}>
      <Link to="/create-playlist">
        <Text fontSize="1.8rem" fontWeight="500" m="0">
          Spotify
        </Text>
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
                {userValue.display_name} Playlists
              </Button>
            </Link>
            <Button onClick={(e) => logoutAction(e)} bg="red" color="#fff">
              Logout Spotify
            </Button>
          </>
        ) : (
          <Button onClick={(e) => requestAuth(e)} bg="#00A512" color="#fff">
            Login On Spotify
          </Button>
        )}
      </div>
    </div>
  );
};

export default index;
