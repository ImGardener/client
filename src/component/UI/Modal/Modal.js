import ReactDOM from "react-dom";

import BackDropUI from "./BackDropUI";
import classes from "./Modal.module.css";
import ModalUI from "./ModalUI";

const Modal = (props) => {
  console.log(props);
  return (
    // <div className={classes["modal"]}>
    <>
      {ReactDOM.createPortal(
        <BackDropUI />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalUI
          onClose={props.onClose}
          message={props.message}
          type={props.type}
        />,
        document.getElementById("overlays")
      )}
    </>
    // </div>
  );
};

export default Modal;
