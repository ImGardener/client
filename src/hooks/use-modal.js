import { useCallback, useContext } from "react";
import { ModalDispatchContext } from "../context/modalContext";

const useModal = () => {
  // dispatch context를 update하기 위한 hook
  const dispatch = useContext(ModalDispatchContext);
  const openModal = useCallback((body, callback) => {
    dispatch.open(body, callback);
  }, []);
  const closeModal = () => {
    dispatch.close();
  };

  return { openModal, closeModal };
};

export default useModal;
