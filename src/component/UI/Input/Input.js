import classes from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = (props) => {
  // const styles = `${classes["input__container"]} ${props.inputClassName}`;
  const inputStyles = `${classes["input__input"]} ${props.inputClassName}`;
  const labelStyles = `${classes["input__label"]} ${props.labelClassName}`;

  let input = (
    <input
      {...props.input}
      className={inputStyles}
      id={props.input.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
  if (props.icon) {
    input = (
      <div className={`${classes["inner__container"]} ${props.inputClassName}`}>
        <input
          {...props.input}
          id={props.input.name}
          className={classes["input__input"]}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <FontAwesomeIcon
          icon={props.icon}
          className={classes["search-input__icon"]}
        />
      </div>
    );
  }

  return (
    <div className={classes["input__container"]}>
      {props.label && (
        <label className={labelStyles} htmlFor={props.input.name}>
          {props.label}
        </label>
      )}
      {input}
    </div>
  );
};
export default Input;
