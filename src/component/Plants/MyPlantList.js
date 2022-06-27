import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import PlantList from "./PlantList";
import { useEffect, useState } from "react";
import { getBookmarkList } from "../../utils/bookmark-apis";
import Modal from "../UI/Modal/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import useHttp from "../../hoc/use-https";

const MyPlantList = () => {
  let [modal, setModal] = useState(null);
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const { requestHandler, error: errorMsg, status, data } = useHttp();

  useEffect(() => {
    /*token이 refresh 될때 인증상태가 유효한지 확인
      (page refresh 와 logout을 구분)
    */
    getAuth().onAuthStateChanged((user) => {
      // 인증 상태가 변경될때 비동기 콜백 수신
      if (user) getBookmark();
      else {
        setModal({
          message: "로그인이 필요합니다.",
          callback: () => {
            history.replace("/login");
            setModal(null);
          },
        });
      }
    });
  }, [token, history]);

  const getBookmark = async () => {
    await requestHandler(getBookmarkList);
  };

  if (status === "PENDING") {
    return <LoadingSpinner />;
  }
  if (modal) {
    return <Modal {...modal} onClose={modal.callback} />;
  }
  return <PlantList plants={data} error={errorMsg} />;
};

export default MyPlantList;
