const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY;

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

export const getUserInfoById = async (id) => {
  try {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_KEY}`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: id,
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

    return { userId: responseJson.users[0].localId };
  } catch (error) {
    throw error;
  }
};
