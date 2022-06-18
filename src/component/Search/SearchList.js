import classes from "./SearchList.module.css";
import SearchItem from "./SearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
const SearchList = (props) => {
  const status = useSelector((state) => state.status.status);
  // const status2 = useSelector((state) => state.status.error);
  console.log("here is SearchList", status);
  if (status === "PENDING") {
    return <LoadingSpinner />;
  }
  if (status === "ERROR") {
    return (
      <div className={classes["search-list--empty"]}>
        <FontAwesomeIcon
          className={classes["search-list__icon--empty"]}
          icon={faWarning}
        />
        <p>오류가 발생했습니다.</p>
      </div>
    );
  }
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

  const plantItems = props.plants.map((plant) => (
    <SearchItem
      key={plant.id}
      name={plant.name}
      description={plant.description}
      instt={plant.instt}
    />
  ));
  return <ul className={classes["search-list"]}>{plantItems}</ul>;
};
export default SearchList;
