import Button from "../Button/Button";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <header className={classes.header}>
      <p className={classes["header__logo"]}>ImGardener </p>
      <Button className={classes["header__btn"]}>로그인</Button>
    </header>
  );
};

export default Header;
