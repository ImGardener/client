import { db } from "./firebase";
import { ref, get, update, push, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { DEFAULT_ERROR, NEED_AUTH } from "./errorCase";
const collection = "collection/";
export const getCollectionList = async () => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) throw new Error(NEED_AUTH);
    // uid로 collectionRef 참조
    const collectionRef = ref(db, collection + getAuth().currentUser.uid + "/");

    // uid로 collectionList 조회 후 snapshot 반환.
    let result = await get(collectionRef).then((snapshot) => {
      if (snapshot.exists()) {
        let todos = snapshot.val();
        return todos;
      } else {
        return [];
      }
    });
    if (!result) return [];

    // object type return값을 정리
    const collectionList = [];
    for (let collectionId of Object.keys(result)) {
      collectionList.push({
        collectionId: collectionId,
        plantId: result[collectionId].plantId,
        description: result[collectionId].description,
        imgLink: result[collectionId].imgLink,
        instt: result[collectionId].instt,
        name: result[collectionId].name,
      });
    }

    return collectionList;
  } catch (error) {
    throw error;
  }
};

export const addCollection = async (requestConfig) => {
  try {
    // collection를 추가하기 위한 새로운 key를 형성
    const newPostKey = push(
      child(ref(db), collection + getAuth().currentUser.uid + "f")
    ).key;
    // 형성한 키로 collection 정보 업데이트
    await update(
      ref(db, collection + getAuth().currentUser.uid + "/" + newPostKey),
      requestConfig
    );
    return newPostKey;
  } catch (error) {
    throw DEFAULT_ERROR;
  }
};

export const removeCollection = async ({ collectionId }) => {
  try {
    // 기존 북마크 제거.
    await remove(
      ref(db, "collection/" + getAuth().currentUser.uid + "/" + collectionId)
    );
  } catch (error) {
    throw DEFAULT_ERROR;
  }
};
