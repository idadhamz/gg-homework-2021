import React from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";

// Components
import Input from "../Input";
import Button from "../Button";

type Props = {
  handleSubmitForm: React.FormEventHandler<HTMLFormElement>;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  formPlaylist: { title: string; description: string };
  selectedTracks: string[];
};

const index = ({
  handleSubmitForm,
  handleChangeForm,
  formPlaylist,
  selectedTracks,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Props["formPlaylist"]>({ mode: "onChange" });

  const titleField = register("title", {
    required: {
      value: true,
      message: "Title is Required",
    },
    minLength: {
      value: 10,
      message: "Must be at least 10 characters",
    },
  });
  const descriptionField = register("description", {
    required: {
      value: true,
      message: "Description is Required",
    },
    minLength: {
      value: 20,
      message: "Must be at least 20 characters",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={style.playlist_form}
    >
      <Input
        id="title"
        type="text"
        value={formPlaylist.title}
        placeholder="Input Title"
        autoComplete="off"
        {...titleField}
        onChange={(e) => {
          titleField.onChange(e);
          handleChangeForm(e);
        }}
      />
      {errors.title && (
        <Text size="1rem" color="red">
          {" "}
          {errors.title.message}{" "}
        </Text>
      )}
      <Input
        id="description"
        type="text"
        value={formPlaylist.description}
        placeholder="Input Description"
        autoComplete="off"
        {...descriptionField}
        onChange={(e) => {
          descriptionField.onChange(e);
          handleChangeForm(e);
        }}
      />
      {errors.description && (
        <Text size="1rem" color="red">
          {" "}
          {errors.description.message}{" "}
        </Text>
      )}
      <Button
        type="submit"
        bg="#00A512"
        color="#fff"
        m="1rem 0"
        disabled={
          !isDirty || !isValid || selectedTracks.length === 0 ? true : false
        }
      >
        Submit
      </Button>
    </form>
  );
};

export default index;
