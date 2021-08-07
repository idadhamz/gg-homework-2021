import React from "react";
import style from "./style.module.css";

type Props = {
  id?: string,
  type?: string,
  name?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  value?: string,
  placeholder?: string,
  autoComplete?: string,
  minLength?: any,
  required?: boolean
}

const index = ({ ...props }: Props) => {
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
