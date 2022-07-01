import { useContext } from "react";
import { ModalDispatchContext } from "../context/modalContext";

const useModal = () => {
  // dispatchContext와 stateContext가 분리되어있어서 state가 업데이트되더라도 useModal에는 영향없음
  //만약 같은 context였다면 해당 context를 useContext해서 사용하는 useModal 훅도 같이 업데이트 된다.
  console.log("renders useModal hooks");
  const dispatch = useContext(ModalDispatchContext);
  const openModal = (body, callback) => {
    dispatch.open(body, callback);
  };
  const closeModal = () => {
    dispatch.close();
  };

  return { openModal, closeModal };
};

export default useModal;
