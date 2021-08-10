import React, { useState } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Text } from "@chakra-ui/react";

// Components
import PlaylistForm from "../../components/playlist-form";

// Redux
import { useAppSelector } from "../../hooks";
import { token, user } from "../../redux/slices/authSlice";

const index = () => {
  let history = useHistory();
  const tokenValue = useAppSelector(token);
  const userValue = useAppSelector(user);
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const handleChangeForm = (e:any) => {
    const { name, value } = e.target;
    setFormPlaylist({ ...formPlaylist, [name]: value });
  };

  const handleSubmitForm = async (e:any) => {
    e.preventDefault();

    const users_id = userValue.id;
    const reqOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${tokenValue}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formPlaylist.title,
        description: formPlaylist.desc,
        public: false,
      }),
    };
    await fetch(
      `https://api.spotify.com/v1/users/${users_id}/playlists`,
      reqOptions
    ).then((res) => res.json());

    alert(`Create Playlist "${formPlaylist.title}" Successfully`);
    setFormPlaylist({ title: "", desc: "" });
    history.push("/playlist");
  };

  return (
    <div className={style.playlist}>
      <Text fontSize="2rem" fontWeight="900">
        Playlist Form
      </Text>
      <PlaylistForm
        handleSubmitForm={handleSubmitForm}
        handleChangeForm={handleChangeForm}
        formPlaylist={formPlaylist}
      />
    </div>
  );
};

export default index;
