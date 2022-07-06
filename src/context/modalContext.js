import { createContext, useMemo, useState } from "react";
import Modal from "../component/UI/Modal/Modal";
export const ModalDispatchContext = createContext({
  open: () => {},
  close: () => {},
});
export const ModalStateContext = createContext({});

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState({});
  const open = (body, callback) => {
    if (typeof body === "string") body = <p>{body}</p>;
    setShowModal((prevModal) => ({ ...prevModal, body, callback }));
  };
  const close = () => {
    setShowModal({});
  };

  //open, close function은 변하지않으므로(params로만 움직임) 재생성 방지
  const dispatch = useMemo(() => ({ open, close }), []);
  return (
    <ModalStateContext.Provider value={showModal}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modal />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
