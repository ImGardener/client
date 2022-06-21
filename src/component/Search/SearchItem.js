import classes from "./SearchItem.module.css";
import plant from "../../assets/sample_plants.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const Search = (props) => {
  return (
    <li className={classes["plant"]}>
      <img className={classes["image"]} src={plant} alt="식물이미지" />
      <div className={classes["plant__info"]}>
        <h3>{props.name}</h3>
        <p className={classes["plant__description"]}>{props.description}</p>
        <p className={classes["plant__property"]}>#{props.instt}</p>
      </div>
      <button>
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </li>
  );
};
export default Search;
