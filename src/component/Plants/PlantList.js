import classes from "./PlantList.module.css";
import PlantItem from "./PlantItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWarning } from "@fortawesome/free-solid-svg-icons";
const PlantList = (props) => {
  if (props.error) {
    return (
      <div className={classes["search-list--empty"]}>
        <FontAwesomeIcon
          className={classes["search-list__icon--empty"]}
          icon={faWarning}
        />
        <p>{String(props.error)} </p>
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
        <p>등록된 식물이 없습니다.</p>
      </div>
    );
  const plantItems = props.plants.map((plant) => (
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
  return <ul className={classes["plant-list"]}>{plantItems}</ul>;
};
export default PlantList;
