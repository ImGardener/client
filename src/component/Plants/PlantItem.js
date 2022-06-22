import classes from "./PlantItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addBookmark, removeBookmark } from "../../utils/bookmark-apis";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
const PlantItem = (props) => {
  const [bookmark, setBookmark] = useState(props.bookmarkId);
  const [modal, setModal] = useState(null);

  const bookmarkStyle = `${classes["bookmark__btn"]} ${
    bookmark && classes["active"]
  }`;
  const token = useSelector((state) => state.login.token);
  const changeBookmarkHandler = async () => {
    if (!token) {
      return setModal({
        message: "로그인이 필요한 서비스 입니다.",
        type: "ERROR",
        callback: () => {
          setModal(null);
        },
      });
    }
    if (!bookmark) {
      let bookmarkId = await addBookmark(token, {
        plantId: props.plantId,
        name: props.name,
        imgLink: props.imgLink,
        description: props.description,
        instt: props.instt,
      });
      setBookmark(bookmarkId);
    } else {
      removeBookmark({
        token,
        bookmarkId: bookmark,
        plantId: props.plantId,
      });
      setBookmark(false);
    }
  };
  return (
    <>
      <li className={classes["plant"]}>
        <img
          className={classes["image"]}
          src={props.imgLink}
          alt="식물이미지"
        />
        <div className={classes["plant__info"]}>
          <h3>{props.name}</h3>
          <p className={classes["plant__description"]}>{props.description}</p>
          <p className={classes["plant__property"]}>#{props.instt}</p>
          <button className={bookmarkStyle} onClick={changeBookmarkHandler}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </li>
      {modal && <Modal {...modal} onClose={modal.callback} />}
    </>
  );
};
export default PlantItem;
