import React from "react";
import style from "./style.module.css";

const index = ({ children, ...props }) => {
  return (
    <>
      {/* <label htmlFor={props.name} className={style.label}>
        {children}
      </label> */}
      <input className={style.input} {...props} />
    </>
  );
};

export default index;
