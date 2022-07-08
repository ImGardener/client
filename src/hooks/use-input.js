import { useState } from "react";

const useInput = (validFunc) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const valusIsValid = validFunc(value);

  const hasError = !valusIsValid && focus;
  const changeValueHandler = (e) => {
    setValue(e.target.value);
  };
  const focusHandler = (e) => {
    setFocus(true);
  };
  const reset = () => {
    setValue("");
    setFocus(false);
  };
  return {
    value,
    hasError,
    valusIsValid,
    changeValueHandler,
    focusHandler,
    reset,
  };
};

export default useInput;
