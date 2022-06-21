import ReactDOM from "react-dom";

import BackDropUI from "./BackDropUI";
import ModalUI from "./ModalUI";

const Modal = (props) => {
  return (
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
  );
};

export default Modal;
