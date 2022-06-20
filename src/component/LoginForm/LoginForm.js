import { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./LoginForm.module.css";
import useInput from "../../hoc/use-input";
import useHttp from "../../hoc/use-https";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import { getUser } from "../../utils/auth-apis";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/modules/login";
const LoginForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(null);
  const { requestHandler, error, status, data } = useHttp();

  const changeJoinFormHandler = () => {
    history.push("/join");
  };

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

  useEffect(() => {
    if (status === "SUCCESS") {
      dispatch(loginThunk(data));
      history.replace("/");
    }
    if (status === "ERROR") {
      setModal({
        type: status,
        message: error,
        callback: () => {
          setModal(null);
        },
      });
    }
  }, [status, history]);

  const submitLoginForm = async (e) => {
    e.preventDefault();

    await requestHandler(getUser, {
      email: enteredEmail,
      password: enteredPassword,
    });
  };

  if (status === "PENDING") return <LoadingSpinner />;
  const emailInputStyle = `${classes["login__input"]} ${
    emailHasError && classes.inValid
  }`;
  const passwordInputStyle = `${classes["login__input"]} ${
    passwordHasError && classes.inValid
  }`;
  console.log("login is valid? ", emailHasError);
  return (
    <div className={classes["login"]}>
      <form className={classes["login-form"]} onSubmit={submitLoginForm}>
        <Input
          label="이메일"
          input={{
            type: "email",
            name: "email",
            placeholder: "email",
          }}
          onChange={emailChangeHandler}
          onBlur={emailFocusHandler}
          inputClassName={emailInputStyle}
          labelClassName={classes["login__label"]}
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
          inputClassName={passwordInputStyle}
          labelClassName={classes["login__label"]}
        />
        <Button
          type="button"
          className={classes["join__btn"]}
          onClick={changeJoinFormHandler}
        >
          회원가입
        </Button>
        <Button
          disabled={!enteredEmailIsValid || !enteredPasswordIsValid}
          className={classes["login__btn"]}
        >
          로그인
        </Button>
      </form>
      {modal && (
        <Modal
          onClose={
            modal.callback &&
            (() => {
              setModal(null);
            })
          }
          type={modal?.type}
          message={modal.message}
        />
      )}
    </div>
  );
};
export default LoginForm;
