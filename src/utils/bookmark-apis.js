import { db } from "./firebase";
import { ref, get, update, push, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { DEFAULT_ERROR, NEED_AUTH } from "./errorCase";
const bookmark = "bookmark/";
export const getBookmarkList = async () => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error(NEED_AUTH);
    // uid로 bookmarkRef 참조
    const bookmarkRef = ref(db, bookmark + getAuth().currentUser.uid + "/");

    // uid로 bookmarkList 조회 후 snapshot 반환.
    let result = await get(bookmarkRef).then((snapshot) => {
      if (snapshot.exists()) {
        let todos = snapshot.val();
        return todos;
      } else {
        return [];
      }
    });
    console.log(result);
    if (!result) return [];

    // object type return값을 정리
    const bookmarkList = [];
    for (let bookmarkId of Object.keys(result)) {
      bookmarkList.push({
        bookmarkId: bookmarkId,
        plantId: result[bookmarkId].plantId,
        description: result[bookmarkId].description,
        imgLink: result[bookmarkId].imgLink,
        instt: result[bookmarkId].instt,
        name: result[bookmarkId].name,
      });
    }

    return bookmarkList;
  } catch (error) {
    throw error;
  }
};

export const addBookmark = async (requestConfig) => {
  try {
    // bookmark를 추가하기 위한 새로운 key를 형성
    const newPostKey = push(
      child(ref(db), bookmark + getAuth().currentUser.uid + "f")
    ).key;
    // 형성한 키로 bookmark 정보 업데이트
    await update(
      ref(db, bookmark + getAuth().currentUser.uid + "/" + newPostKey),
      requestConfig
    );
    return newPostKey;
  } catch (error) {
    throw DEFAULT_ERROR;
  }
};

export const removeBookmark = async ({ bookmarkId }) => {
  try {
    // 기존 북마크 제거.
    await remove(
      ref(db, "bookmark/" + getAuth().currentUser.uid + "/" + bookmarkId)
    );
  } catch (error) {
    throw DEFAULT_ERROR;
  }
};
