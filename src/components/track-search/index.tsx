import React from "react";
import style from "./style.module.css";

// Components
import Input from "../Input";
import Button from "../Button";

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  handleChange: React.ChangeEventHandler<HTMLInputElement>,
  input: string
}

const index = ({ handleSubmit, handleChange, input }: Props) => {
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Input
        id="search"
        type="text"
        name="search"
        onChange={handleChange}
        value={input}
        placeholder="Search Track Title"
        autoComplete="off"
      />
      <Button type="submit" bg="#00A512" color="#fff" margin="1rem 0">
        Search
      </Button>
    </form>
  );
};

export default index;
