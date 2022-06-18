import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <header className={classes.header}>
      <p className={classes["header__logo"]}>ImGardener </p>

      <p className={classes["header__login"]}> Login</p>
    </header>
  );
};

export default Header;
