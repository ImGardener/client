import classes from "./Modal.module.css";
import {
  faCircleCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
const ModalUI = (props) => {
  const icon = props.type === "ERROR" ? faExclamationTriangle : faCircleCheck;

  return (
    <div className={classes["modal-ui"]}>
      <div className={classes["modal-ui__content"]}>
        <FontAwesomeIcon icon={icon} className={classes.icon} />
        {props.body}
      </div>
      <Button className={classes["modal-ui__btn"]} onClick={props.onClose}>
        닫기
      </Button>
    </div>
  );
};

export default ModalUI;
