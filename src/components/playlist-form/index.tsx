import React from "react";
import style from "./style.module.css";

// Components
import Input from "../Input";
import Button from "../Button";

type Props = {
  handleSubmitForm: React.FormEventHandler<HTMLFormElement>,
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>,
  formPlaylist: { title: string; desc: string }
}

const index = ({ handleSubmitForm, handleChangeForm, formPlaylist }: Props) => {
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
      />
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
      />
      <Button type="submit" bg="#00A512" color="#fff">
        Submit
      </Button>
    </form>
  );
};

export default index;
