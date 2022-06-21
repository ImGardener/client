import { DATABASE_URL, FIREBASE_KEY } from "./key-store";

export const addUser = async (info) => {
  try {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: info.email,
        password: info.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      let errorMessage = "authentication is failed!";
      let responseJson = await response.json();
      console.log(responseJson);

      if (responseJson && responseJson.error?.message)
        errorMessage = responseJson?.error.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
};
export const getUser = async (info) => {
  try {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: info.email,
        password: info.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      let errorMessage = "authentication is failed!";
      let responseJson = await response.json();
      console.log(responseJson);

      if (responseJson && responseJson.error?.message)
        errorMessage = responseJson?.error.message;
      throw new Error(errorMessage);
    }
    let responseJson = await response.json();

    return { token: responseJson.idToken, expiresIn: responseJson.expiresIn };
  } catch (error) {
    throw error;
  }
};
export const getBookmarkList = async ({ userId }) => {
  try {
    let url = `${DATABASE_URL}/bookmark/${userId}.json`;
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
    let result = [];
    for (let plantIds of Object.values(responseJson)) {
      result.push(...plantIds.plants);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateBookmark = async ({ userId }) => {
  try {
    let url = `${DATABASE_URL}/bookmark/${userId}.json`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        plants: ["test1", "test2"],
      }),
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
