import React from "react";
import style from "./style.module.css";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";

const index = ({ handleSubmitForm, handleChangeForm, formPlaylist }) => {
  return (
    <form onSubmit={handleSubmitForm} className={style.playlist_form}>
      <Input
        id="title"
        type="text"
        name="title"
        onChange={handleChangeForm}
        value={formPlaylist.title}
        placeholder="Input Title"
        autoComplete="off"
        minLength="10"
        required
      >
        Title
      </Input>
      <Input
        id="desc"
        type="text"
        name="desc"
        onChange={handleChangeForm}
        value={formPlaylist.desc}
        placeholder="Input Description"
        autoComplete="off"
        minLength="20"
        required
      >
        Description
      </Input>
      <Button type="submit" className={style.submit_form}>
        Submit
      </Button>
    </form>
  );
};

export default index;
