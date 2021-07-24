import React from "react";
import style from "./style.module.css";

const index = ({ ...props }) => {
  return <img className={style.img_div} {...props} />;
};

export default index;
