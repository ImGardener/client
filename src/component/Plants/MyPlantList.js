import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import PlantList from "./PlantList";
import { useEffect, useState } from "react";
import { getBookmarkList } from "../../utils/bookmark-apis";
import Modal from "../UI/Modal/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const MyPlantList = () => {
  let [bookmarks, setBookmarks] = useState([]);
  let [error, setError] = useState(null);
  let [isLoading, setLoading] = useState(false);
  let [modal, setModal] = useState(null);
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      getBookmark();
    } else {
      setModal({
        message: "로그인이 필요합니다.",
        callback: () => {
          history.replace("/login");
          setModal(null);
        },
      });
    }
  }, [token, history]);

  const getBookmark = async () => {
    try {
      setError(null);
      setLoading(true);
      let token = localStorage.getItem("login_token");

      let bookmarkList = await getBookmarkList(token);
      setBookmarks(bookmarkList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (modal) {
    return <Modal {...modal} onClose={modal.callback} />;
  }
  return <PlantList plants={bookmarks} error={error} />;
};

export default MyPlantList;
