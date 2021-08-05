import React, { useState } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Components
import PlaylistForm from "../../components/playlist-form";

const index = () => {
  let history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormPlaylist({ ...formPlaylist, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const users_id = user.id;
    const reqOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${token}`,
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
      <h1>Playlist Form</h1>
      <PlaylistForm
        handleSubmitForm={handleSubmitForm}
        handleChangeForm={handleChangeForm}
        formPlaylist={formPlaylist}
      />
    </div>
  );
};

export default index;
