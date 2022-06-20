import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const styles = `${classes.button} ${props.className}`;
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={styles}
      type={props.type ? props.type : "submit"}
    >
      {props.children}
    </button>
  );
};

export default Button;
