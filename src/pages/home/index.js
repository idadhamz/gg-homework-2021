import React, { useEffect } from "react";
import style from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

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
    <div className={style.div_home}>
      <h1 className={style.h1}>Go Premium. Be Happy.</h1>
      <Button
        onClick={(e) => requestAuth(e)}
        style={{ backgroundColor: "#00A512", textTransform: "uppercase" }}
      >
        Login On Spotify
      </Button>
    </div>
  );
};

export default index;
