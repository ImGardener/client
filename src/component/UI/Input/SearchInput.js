import classes from "./SearchInput.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = (props) => {
  const styles = `${classes["search-input__container"]} ${props.className}`;
  return (
    <div className={styles}>
      <input
        type="text"
        name="search"
        id="search"
        className={classes["search-input__input"]}
        placeholder="Search"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className={classes["search-input__icon"]}
      />
    </div>
  );
};
export default SearchInput;
