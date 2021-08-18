import React, { useEffect } from "react";
// import style from "./style.module.css";
import { useHistory } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

// Components
import Button from "../../components/Button";

// Utils
import getAccessToken from "../../utils/getAccessToken";

// Services
import authSpotify from "../../services/authSpotify";

// Redux
import { useAppDispatch } from "../../redux/hooks";
import { setAuth } from "../../redux/slices/authSlice";

const index = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getAccessToken(window.location.hash);
      dispatch(
        setAuth({
          token: access_token,
          isLoggedIn: true,
        })
      );
      history.push("/create-playlist");
    } else {
      dispatch(setAuth({ token: null, isLoggedIn: false }));
    }
  }, [dispatch]);

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="#F3BF5A"
      p="2rem"
    >
      <Text
        fontSize={{ base: "50px", lg: "80px" }}
        fontWeight="900"
        lineHeight={{ base: "50px", lg: "92px" }}
        textAlign="center"
        color="#fff"
      >
        Go Premium. Be Happy.
      </Text>
      <Button
        onClick={(e) => authSpotify(e)}
        m="2rem 0"
        p="2rem"
        fontSize="16px"
        fontWeight="400"
        bg="#00A512"
        color="#fff"
      >
        Login On Spotify
      </Button>
    </Flex>
  );
};

export default index;
