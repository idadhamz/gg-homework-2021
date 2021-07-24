import React from "react";
import style from "./style.module.css";

const index = ({ ...props }) => {
  return (
    <button className={style.button} {...props}>
      {props.children}
    </button>
  );
};

export default index;
