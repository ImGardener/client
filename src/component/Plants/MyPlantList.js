import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import PlantList from "./PlantList";
import { useEffect, useState } from "react";
import { getBookmarkList } from "../../utils/bookmark-apis";

const MyPlantList = () => {
  let [bookmarks, setBookmarks] = useState([]);
  let [error, setError] = useState(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getBookmark();
  }, []);

  const getBookmark = async () => {
    try {
      setError(null);
      setLoading(true);
      let token = localStorage.getItem("login_token");

      let bookmarkList = await getBookmarkList(token);
      console.log(bookmarkList);
      setBookmarks(bookmarkList);
    } catch (error) {
      if (error.message === "MISSING_ID_TOKEN")
        setError(() => {
          throw error;
        });
      else setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <PlantList plants={bookmarks} error={error} />;
};

export default MyPlantList;
