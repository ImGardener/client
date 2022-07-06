import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addCollection, removeCollection } from "../../utils/collection-apis";
import classes from "./PlantItem.module.css";
import useModal from "../../hooks/use-modal";
const PlantItem = (props) => {
  const [collection, setCollection] = useState(props.collectionId);
  const { openModal } = useModal();

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
      return openModal("로그인이 필요한 서비스입니다.");
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
    </>
  );
};
export default PlantItem;
