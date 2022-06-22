import { DATABASE_URL, FIREBASE_KEY } from "./key-store";
import { getUserInfoById } from "./user-apis";
export const getBookmarkList = async (token) => {
  try {
    console.log("token", token);
    const { userId } = await getUserInfoById(token);

    let url = `${DATABASE_URL}/bookmark/${userId}.json?auth=${token}`;
    let response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      let errorMessage = "request is failed!";
      let responseJson = await response.json();
      if (responseJson && responseJson.error?.message)
        errorMessage = responseJson?.error.message;
      throw new Error(errorMessage);
    }

    let responseJson = await response.json();

    if (!responseJson) return [];
    let result = [];
    console.log(responseJson);

    for (let plantId of Object.keys(responseJson)) {
      result.push({
        bookmarkId: plantId,
        plantId: responseJson[plantId].plantId,
        description: responseJson[plantId].description,
        imgLink: responseJson[plantId].imgLink,
        instt: responseJson[plantId].instt,
        name: responseJson[plantId].name,
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const addBookmark = async (token, requestConfig) => {
  try {
    const { userId } = await getUserInfoById(token);

    let url = `${DATABASE_URL}/bookmark/${userId}.json?auth=${token}`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestConfig),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      let errorMessage = "request is failed!";
      let responseJson = await response.json();
      if (responseJson && responseJson.error?.message)
        errorMessage = responseJson?.error.message;
      throw new Error(errorMessage);
    }
    let responseJson = await response.json();
    return responseJson.name;
  } catch (error) {
    throw error;
  }
};
export const removeBookmark = async ({ token, bookmarkId, plantId }) => {
  try {
    const { userId } = await getUserInfoById(token);
    let url = `${DATABASE_URL}/bookmark/${userId}/${bookmarkId}.json?auth=${token}`;
    let response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ plantId }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      let errorMessage = "request is failed!";
      let responseJson = await response.json();
      if (responseJson && responseJson.error?.message)
        errorMessage = responseJson?.error.message;
      throw new Error(errorMessage);
    }

    let responseJson = await response.json();
    console.log("result : ", responseJson);
  } catch (error) {
    throw error;
  }
};