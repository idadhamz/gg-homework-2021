import React from "react";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";

const index = ({ handleSubmit, handleChange, input }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search Track Title"
        onChange={handleChange}
        value={input}
        autoComplete="off"
      />
      <Button type="submit" style={{ margin: "0 1rem" }}>
        Search
      </Button>
    </form>
  );
};

export default index;
