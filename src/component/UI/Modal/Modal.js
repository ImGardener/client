import { useContext } from "react";
import ReactDOM from "react-dom";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "../../../context/modalContext";
import BackDropUI from "./BackDropUI";
import ModalUI from "./ModalUI";

const Modal = (props) => {
  const { body, callback } = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);
  const onCloseHandler = async () => {
    close();
    if (callback && typeof callback === "function") await callback();
  };
  return body && <ModalPortal body={body} onClose={onCloseHandler} />;
};

const ModalPortal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDropUI />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalUI onClose={props.onClose} body={props.body} />,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
