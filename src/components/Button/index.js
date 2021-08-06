import React from "react";
// import style from "./style.module.css";
import { Button } from "@chakra-ui/react";

const index = ({ ...props }) => {
  return (
    <Button
      {...props}
      boxShadow="lg"
      borderRadius="20px"
      _hover={{
        opacity: "0.7",
        cursor: "pointer",
      }}
    >
      {props.children}
    </Button>
  );
};

export default index;
