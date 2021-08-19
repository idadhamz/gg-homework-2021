import React from "react";
import style from "./style.module.css";

// React Icons
import { BiSearchAlt } from "react-icons/bi";

// Components
import Input from "../Input";
import Button from "../Button";

type Props = {
  handleSubmitSearch: React.FormEventHandler<HTMLFormElement>;
  handleChangeSearch: React.ChangeEventHandler<HTMLInputElement>;
  input: string;
};

const index = ({ handleSubmitSearch, handleChangeSearch, input }: Props) => {
  return (
    <form onSubmit={handleSubmitSearch} className={style.form}>
      <Input
        id="search"
        type="text"
        name="search"
        onChange={handleChangeSearch}
        value={input}
        placeholder="Search Track Title"
        autoComplete="off"
      />
      <Button type="submit" bg="#00A512" color="#fff" margin="1rem 0">
        Search{" "}
        <span style={{ margin: "0 5px" }}>
          <BiSearchAlt style={{ fontSize: "20px" }} />
        </span>
      </Button>
    </form>
  );
};

export default index;
