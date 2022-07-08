import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useInput from "../../hooks/use-input";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./JoinForm.module.css";
import { addUser } from "../../utils/user-apis";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import useHttp from "../../hooks/use-https";
import { logoutThunk } from "../../store/modules/auth";
import useModal from "../../hooks/use-modal";
const JoinForm = () => {
  const { openModal } = useModal();

  const { requestHandler, status, error } = useHttp();
  const dispatch = useDispatch();
  const {
    value: enteredEmail,
    hasError: emailHasError,
    valusIsValid: enteredEmailIsValid,
    changeValueHandler: emailChangeHandler,
    focusHandler: emailFocusHandler,
    reset: resetEmail,
  } = useInput(isEmailValid);
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valusIsValid: enteredPasswordIsValid,
    changeValueHandler: passwordChangeHandler,
    focusHandler: passwordFocusHandler,
    reset: resetPassword,
  } = useInput(isPasswordValid);

  const history = useHistory();

  useEffect(() => {
    if (status === "SUCCESS") {
      // 회원가입 시 다시 로그인 유도를 위한 logout처리
      dispatch(logoutThunk());
      openModal("가입되었습니다.", () => history.replace("/login"));
    } else if (error) {
      openModal(error);
    }
  }, [openModal, status, dispatch, error, history]);
  const submitJoinForm = async (e) => {
    e.preventDefault();
    await requestHandler(addUser, {
      email: enteredEmail,
      password: enteredPassword,
    });
    resetPassword();
    resetEmail();
  };

  if (status === "PENDING") return <LoadingSpinner />;

  return (
    <div className={classes.join}>
      <form className={classes["join-form"]} onSubmit={submitJoinForm}>
        <Input
          label="이메일"
          input={{
            type: "email",
            name: "email",
            placeholder: "email",
            value: enteredEmail,
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
            autoComplete: "on",
            value: enteredPassword,
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
    </div>
  );
};
export default JoinForm;
