import classes from "./SearchList.module.css";
import SearchItem from "./SearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
const SearchList = (props) => {
  if (!props.plants || props.plants.length === 0)
    return (
      <div className={classes["search-list--empty"]}>
        <FontAwesomeIcon
          className={classes["search-list__icon--empty"]}
          icon={faBan}
        />
        <p>검색결과가 없습니다.</p>
      </div>
    );

  const plantItems = props.plants.map((plant) => <SearchItem key={plant.id} />);
  return <ul className={classes["search-list"]}>{plantItems}</ul>;
};
export default SearchList;
