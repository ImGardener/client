import classes from "./PlantItem.module.css";
import plant from "../../assets/sample_plants.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addBookmark, removeBookmark } from "../../utils/bookmark-apis";
import { useSelector } from "react-redux";
import { useState } from "react";
const PlantItem = (props) => {
  const [bookmark, setBookmark] = useState(props.bookmark);
  const bookmarkStyle = `${classes["bookmark__btn"]} ${
    bookmark && classes["active"]
  }`;
  const token = useSelector((state) => state.login.token);
  const changeBookmarkHandler = async () => {
    if (!props.bookmark) {
      let bookmarkId = await addBookmark(token, {
        plantId: props.id,
        name: props.name,
        imgLink: props.imgLink,
        description: props.description,
        instt: props.instt,
      });
      setBookmark(bookmarkId);
    } else {
      removeBookmark({
        token,
        bookmarkId: props.bookmark,
        plantId: props.id,
      });
      setBookmark(false);
    }
  };
  console.log(props);
  return (
    <li className={classes["plant"]}>
      <img className={classes["image"]} src={props.imgLink} alt="식물이미지" />
      <div className={classes["plant__info"]}>
        <h3>{props.name}</h3>
        <p className={classes["plant__description"]}>{props.description}</p>
        <p className={classes["plant__property"]}>#{props.instt}</p>
        <button className={bookmarkStyle} onClick={changeBookmarkHandler}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </li>
  );
};
export default PlantItem;
