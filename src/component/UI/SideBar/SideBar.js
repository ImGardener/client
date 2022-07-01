import React, { useState } from "react";
import classes from "./SideBar.module.css";
import {
  faSpa,
  faSearch,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../Button/Button";

const SideMnu = () => {
  const history = useHistory();
  const [searchWord, setSearchWord] = useState("");
  const [menuActive, setMenuActive] = useState(false);

  const submitsearchFromHandler = (e) => {
    e.preventDefault();
    history.push("/search", { searchWord: searchWord });
    setSearchWord("");
  };
  const changeSearchInputHandler = (e) => {
    setSearchWord(e.target.value);
  };
  const showSideBarHandler = () => {
    setMenuActive((prevState) => !prevState);
  };
  const hideHandler = () => {
    setMenuActive(false);
  };
  return (
    <>
      <div className={`${classes.sidenav} ${menuActive && classes["active"]}`}>
        <section alt="" className={classes["search"]}>
          <form
            method="post"
            action="#"
            className={classes["search__form"]}
            onSubmit={submitsearchFromHandler}
          >
            <Input
              input={{
                type: "text",
                name: "main-search",
                placeholder: "검색하기",
                value: searchWord,
              }}
              onChange={changeSearchInputHandler}
              inputClassName={classes["search__input"]}
              icon={faSearch}
            />
          </form>
        </section>
        <ul className={classes["side-menu"]}>
          <li className={classes["side-menu__item"]}>
            <Link
              to={"/search"}
              className={classes["item__title"]}
              onClick={hideHandler}
            >
              <FontAwesomeIcon icon={faSearch} />
              검색하기
            </Link>
          </li>

          <li className={classes["side-menu__item"]}>
            <Link
              to={"/mycollection"}
              className={classes["item__title"]}
              onClick={hideHandler}
            >
              <FontAwesomeIcon icon={faSpa} />
              My Collection
            </Link>
          </li>
        </ul>
      </div>
      <Button
        aria-label="sidebar-toggle-btn"
        className={`${classes["toggle-btn"]} ${
          menuActive && classes["active"]
        }`}
        onClick={showSideBarHandler}
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </Button>
    </>
  );
};

export default React.memo(SideMnu);
