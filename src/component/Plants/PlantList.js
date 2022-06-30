import React from "react";
import classes from "./PlantList.module.css";
import PlantItem from "./PlantItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWarning } from "@fortawesome/free-solid-svg-icons";

const PlantList = (props) => {
  if (props.error || !props.plants || props.plants.length === 0) {
    return (
      <div className={classes["plant-list--empty"]}>
        <FontAwesomeIcon
          className={classes["plant-list__icon--empty"]}
          icon={props.error ? faWarning : faBan}
        />
        {props.error && <p>{String(props.error)} </p>}
        {!props.error && <p>조회된 결과가 없습니다.</p>}
      </div>
    );
  }

  return (
    <ul className={classes["plant-list"]}>
      {props.plants.map((plant) => (
        <PlantItem
          key={plant.plantId}
          plantId={plant.plantId}
          name={plant.name}
          description={plant.description}
          instt={plant.instt}
          collectionId={plant?.collectionId}
          imgLink={plant.imgLink}
        />
      ))}
    </ul>
  );
};
export default React.memo(PlantList);
