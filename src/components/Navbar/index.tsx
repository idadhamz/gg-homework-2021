import React from "react";
import style from "./style.module.css";
import { Link, useHistory } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

// Assets
import SpotifyIcon from "../../assets/img/spotify.png";

// Components
import Image from "../Image";
import Button from "../Button";

// Utils
import authSpotify from "../../services/authSpotify";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuth, user } from "../../redux/slices/authSlice";

import { useColorMode } from "@chakra-ui/react";

type Props = {
  isLoggedInValue: boolean;
};

const index = ({ isLoggedInValue }: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userValue = useAppSelector(user);

  const { colorMode, toggleColorMode } = useColorMode();

  const logoutAction = (e: any) => {
    e.preventDefault();

    dispatch(setAuth({ token: null, isLoggedIn: false }));
    history.push("/");
  };

  console.log(userValue?.images[0].url);

  return (
    <Box className={style.div_navbar}>
      <Link to="/create-playlist">
        <Image src={SpotifyIcon} data-testid="logoImg" />
      </Link>
      <Box className={style.div_item_navbar}>
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
                <Flex
                  dir="row"
                  gridGap="1rem"
                  justifyContent="center"
                  alignItems="center"
                  p="0 1.5rem"
                >
                  <Image
                    src={userValue?.images[0].url}
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                    }}
                    data-testid="userImg"
                  />
                  {userValue?.display_name} Playlists
                </Flex>
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
      </Box>
    </Box>
  );
};

export default index;
