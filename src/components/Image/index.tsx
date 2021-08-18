import React from "react";
import style from "./style.module.css";

type Props = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

const index = ({ ...props }: Props) => {
  return <img className={style.img_div} {...props} />;
};

export default index;
