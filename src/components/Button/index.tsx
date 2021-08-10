import React from "react";
// import style from "./style.module.css";
import { Button } from "@chakra-ui/react";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
  type?: 'button'|'submit'|'reset',
  children?: string | JSX.Element | any,
  bg?: string,
  color?: string,
  margin?: string,
  m?: string,
  p?: string,
  fontSize?: string,
  fontWeight?: string,
  style?: React.CSSProperties,
}

const index = ({ ...props }: Props) => {
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
