import React, { useEffect } from "react";
// import style from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Text } from "@chakra-ui/react";

// Components
import Button from "../../components/Button";

// Utils
import requestAuth from "../../utils/requestAuth";
import getAccessToken from "../../utils/getAccessToken";

// Slices
import { setAuth } from "../../redux/slices/authSlice";

const index = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getAccessToken(window.location.hash);
      console.log(access_token);
      dispatch(
        setAuth({
          token: access_token,
          isLoggedIn: true,
        })
      );
      history.push("/playlist");
    } else {
      dispatch(setAuth({ token: null, isLoggedIn: false }));
    }
  }, [dispatch]);

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="#F3BF5A"
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
        onClick={(e) => requestAuth(e)}
        m="2rem 0"
        p="2rem"
        fontSize="16px"
        fontWeight="400"
        bg="#00A512"
        textTransform="uppercase"
      >
        Login On Spotify
      </Button>
    </Box>
  );
};

export default index;
