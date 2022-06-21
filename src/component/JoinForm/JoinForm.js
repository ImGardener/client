import useInput from "../../hoc/use-input";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./JoinForm.module.css";
import { addUser } from "../../utils/user-apis";
import Modal from "../UI/Modal/Modal";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isEmailValid, isPasswordValid } from "../../utils/validation";

const JoinForm = () => {
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valusIsValid: enteredEmailIsValid,
    changeValueHandler: emailChangeHandler,
    focusHandler: emailFocusHandler,
  } = useInput(isEmailValid);
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valusIsValid: enteredPasswordIsValid,
    changeValueHandler: passwordChangeHandler,
    focusHandler: passwordFocusHandler,
  } = useInput(isPasswordValid);

  const history = useHistory();

  const submitJoinForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addUser({
        email: enteredEmail,
        password: enteredPassword,
      });
      setModal({
        type: "SUCCESS",
        message: "가입되었습니다!",
        callback: () => {
          setModal(null);
          history.replace("/login");
        },
      });
    } catch (error) {
      setModal({
        type: "ERROR",
        message: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={classes.join}>
      <form className={classes["join-form"]} onSubmit={submitJoinForm}>
        <Input
          label="이메일"
          input={{
            type: "email",
            name: "email",
            placeholder: "email",
          }}
          onChange={emailChangeHandler}
          onBlur={emailFocusHandler}
          inputClassName={`${classes["join__input"]} ${
            emailHasError && classes.inValid
          }
        `}
          labelClassName={classes["join__label"]}
        />
        <Input
          label="패스워드"
          input={{
            type: "password",
            name: "password",
            placeholder: "password",
          }}
          onChange={passwordChangeHandler}
          onBlur={passwordFocusHandler}
          inputClassName={`${classes["join__input"]} ${
            passwordHasError && classes.inValid
          }
        `}
          labelClassName={classes["join__label"]}
        />
        <Button
          disabled={!enteredEmailIsValid || !enteredPasswordIsValid}
          className={classes["join__btn"]}
        >
          회원가입
        </Button>
      </form>
      {modal && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={
            modal.callback ||
            (() => {
              setModal(null);
            })
          }
        />
      )}
    </div>
  );
};
export default JoinForm;
