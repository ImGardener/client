import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import useInput from "../../hooks/use-input";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./JoinForm.module.css";
import { addUser } from "../../utils/user-apis";
import Modal from "../UI/Modal/Modal";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import useHttp from "../../hooks/use-https";
import { logoutThunk } from "../../store/modules/auth";

const JoinForm = () => {
  const [modal, setModal] = useState(null);
  const { requestHandler, status, error } = useHttp();
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (status === "SUCCESS") {
      // 회원가입 시 다시 로그인 유도를 위한 logout처리
      dispatch(logoutThunk());
      setModal({
        type: "SUCCESS",
        message: "가입되었습니다!",
        callback: () => {
          setModal(null);
          history.replace("/login");
        },
      });
    } else if (error) {
      setModal({
        type: "ERROR",
        message: error,
      });
    }
  }, [status, dispatch, error, history]);
  const submitJoinForm = async (e) => {
    e.preventDefault();
    await requestHandler(addUser, {
      email: enteredEmail,
      password: enteredPassword,
    });
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
