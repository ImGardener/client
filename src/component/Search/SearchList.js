import classes from "./SearchList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import PlantItem from "../Plants/PlantItem";
const SearchList = () => {
  const error = useSelector((state) => state.plants.error);
  const loading = useSelector((state) => state.plants.loading);
  const plants = useSelector((state) => state.plants.plants);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <div className={classes["search-list--empty"]}>
        <FontAwesomeIcon
          className={classes["search-list__icon--empty"]}
          icon={faWarning}
        />
        <p>{String(error)} </p>
      </div>
    );
  }

  if (!plants || plants.length === 0)
    return (
      <div className={classes["search-list--empty"]}>
        <FontAwesomeIcon
          className={classes["search-list__icon--empty"]}
          icon={faBan}
        />
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  const plantItems = plants.map((plant) => (
    <PlantItem
      key={plant.plantId}
      plantId={plant.plantId}
      name={plant.name}
      description={plant.description}
      instt={plant.instt}
      bookmarkId={plant?.bookmarkId}
      imgLink={plant.imgLink}
    />
  ));
  return <ul className={classes["search-list"]}>{plantItems}</ul>;
};
export default SearchList;
