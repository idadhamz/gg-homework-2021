import React from "react";
import style from "./style.module.css";

const index = ({ title = "-", artists = "-" }) => {
  return (
    <div className={style.text_item}>
      <h1 className={style.title_item}>{title}</h1>
      <h2 className={style.artists_item}>{artists}</h2>
    </div>
  );
};

export default index;
