import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../../store/modules/login";
import Button from "../Button/Button";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();

  const linkToLoginHandler = () => {
    history.replace("/login");
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className={classes.header}>
      <Link to={"/"} className={classes["header__logo"]}>
        ImGardener
      </Link>
      {/* <p className={classes["header__logo"]}>ImGardener </p> */}
      {!isLogin ? (
        <Button className={classes["header__btn"]} onClick={linkToLoginHandler}>
          로그인
        </Button>
      ) : (
        <Button className={classes["header__btn"]} onClick={logoutHandler}>
          로그아웃
        </Button>
      )}
    </header>
  );
};

export default Header;
