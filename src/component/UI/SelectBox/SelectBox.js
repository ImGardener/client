import React from "react";
import classes from "./SelectBox.module.css";
const SelectBox = (props) => {
  const styles = `${classes["select-box"]} ${props.className}`;
  console.log("Imt selectBox");
  return (
    <select
      onChange={props.onChange}
      className={styles}
      placeholder={props.placeholder}
    >
      <option value="" defaultValue={""}>
        {props.placeholder}
      </option>

      {props.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default React.memo(SelectBox);
