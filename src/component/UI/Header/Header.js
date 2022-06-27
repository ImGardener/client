import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logoutThunk } from "../../../store/modules/auth";
import Button from "../Button/Button";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const linkToLoginHandler = () => {
    history.replace("/login");
  };
  const logoutHandler = () => {
    dispatch(logoutThunk());
  };
  return (
    <header className={classes.header}>
      <Link to={"/"} className={classes["header__logo"]}>
        ImGardener
      </Link>
      {/* <p className={classes["header__logo"]}>ImGardener </p> */}
      {isLogin === false && (
        <Button className={classes["header__btn"]} onClick={linkToLoginHandler}>
          로그인
        </Button>
      )}
      {isLogin === true && (
        <Button className={classes["header__btn"]} onClick={logoutHandler}>
          로그아웃
        </Button>
      )}
    </header>
  );
};

export default Header;
