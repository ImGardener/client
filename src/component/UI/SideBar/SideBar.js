import React from "react";
import classes from "./SideBar.module.css";
import {
  faSpa,
  faBorderAll,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../Input/SearchInput";

const SideMnu = () => {
  return (
    <div className={classes.sidenav}>
      <section id="search" alt="" className={classes["search"]}>
        <form method="post" action="#" className={classes["search__form"]}>
          <SearchInput className={classes["search__input"]} />
        </form>
      </section>
      <ul className={classes["side-menu"]}>
        <li className={classes["side-menu__item"]}>
          <FontAwesomeIcon icon={faSpa} />
          <a className={classes["item__title"]} href="elements.html">
            검색하기
          </a>
        </li>

        <li className={classes["side-menu__item"]}>
          <FontAwesomeIcon icon={faSpa} />
          <a className={classes["item__title"]} href="elements.html">
            My Plants
          </a>
        </li>
        <li className={classes["side-menu__item"]}>
          <FontAwesomeIcon icon={faBorderAll} />
          <a className={classes["item__title"]} href="elements.html">
            Other
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideMnu;
