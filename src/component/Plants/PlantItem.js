import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addCollection, removeCollection } from "../../utils/collection-apis";
import Modal from "../UI/Modal/Modal";
import classes from "./PlantItem.module.css";

const PlantItem = (props) => {
  const [collection, setCollection] = useState(props.collectionId);
  const [modal, setModal] = useState(null);

  const collectionStyle = `${classes["collection__btn"]} ${
    collection && classes["active"]
  }`;
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (!isLogin) {
      setCollection(null);
    }
  }, [isLogin]);
  const changeCollectionHandler = async () => {
    if (!isLogin) {
      return setModal({
        message: "로그인이 필요합니다.",
        type: "ERROR",
        callback: () => {
          setModal(null);
        },
      });
    }
    if (!collection) {
      let collectionId = await addCollection({
        plantId: props.plantId,
        name: props.name,
        imgLink: props.imgLink,
        description: props.description,
        instt: props.instt,
      });
      setCollection(collectionId);
    } else {
      removeCollection({
        collectionId: collection,
      });
      setCollection(false);
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
          <button className={collectionStyle} onClick={changeCollectionHandler}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </li>
      {modal && <Modal {...modal} onClose={modal.callback} />}
    </>
  );
};
export default PlantItem;
