import React from "react";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Text } from "@chakra-ui/react";

// Components
import Button from "../../components/Button";

// Utils
import requestAuth from "../../utils/requestAuth";

// Slices
import { setAuth } from "../../redux/slices/authSlice";
import { useColorMode } from "@chakra-ui/react";

const index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { colorMode, toggleColorMode } = useColorMode();

  const logoutAction = (e) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    history.push("/");
  };

  return (
    <div className={style.div_navbar}>
      <Link to="/playlist">
        <Text fontSize="1.8rem" fontWeight="500" m="0">
          Spotify
        </Text>
      </Link>
      <div className={style.div_button}>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {isLoggedIn ? (
          <>
            <Link to="/create-playlist">
              <Button bg="#00A512" color="#fff">
                Create Playlists
              </Button>
            </Link>
            <Button onClick={(e) => logoutAction(e)} bg="red" color="#fff">
              Logout Spotify
            </Button>
          </>
        ) : (
          <Button
            onClick={(e) => requestAuth(e)}
            bg="#00A512"
            color="#fff"
            textTransform="uppercase"
          >
            Login On Spotify
          </Button>
        )}
      </div>
    </div>
  );
};

export default index;
