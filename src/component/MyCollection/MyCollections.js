import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import PlantList from "../Plants/PlantList";
import Modal from "../UI/Modal/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth } from "firebase/auth";
import { getCollectionThunk } from "../../store/modules/collection";
import useModal from "../../hooks/use-modal";

const MyCollection = () => {
  let [modal, setModal] = useState(null);
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { collections, loading, error } = useSelector(
    (state) => state.collections
  );
  useEffect(() => {
    /*token이 refresh 될때 인증상태가 유효한지 확인
      (page refresh 와 logout을 구분)
    */
    getAuth().onAuthStateChanged((user) => {
      // 인증 상태가 변경될때 비동기 콜백 수신
      if (user) {
        token && dispatch(getCollectionThunk());
      } else {
        openModal("로그인이 필요합니다.", history.replace("/login"));
      }
    });
  }, [token, history, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (modal) {
    return <Modal {...modal} onClose={modal.callback} />;
  }

  return <PlantList plants={collections} error={error} />;
};

export default MyCollection;
