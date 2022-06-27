export const DEFAULT_ERROR = "요청에 실패하였습니다. 관리자에게 문의하세요.";
export const AUTH_ERROR = {
  "auth/user-token-expired": "로그인이 만료되었습니다.",
  "auth/user-disabled": "유효하지않은 계정입니다.",
  "auth/email-already-in-use": "이미 사용중인 이메일주소입니다.",
  "auth/too-many-requests":
    "비정상적인 요청으로 기기의 요청이 차단되었습니다. 나중에 다시 시도하세요.",
  "auth/wrong-password": "이메일 또는 비밀번호를 확인하세요",
  "auth/invalid-email": "유효하지않은 이메일입니다.",
};

export const BOOKMARK_ERROR = {
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "비정상적인 요청으로 기기의 요청이 차단되었습니다. 나중에 다시 시도하세요.",
};

// firebase error handling
export const errorHandler = async (response, errorCase = {}) => {
  if (!response.ok) {
    let errorMessage = DEFAULT_ERROR;
    let responseJson = await response.json();

    // error case에서 해당하는 error message가 key값으로 존재하는 경우 return.
    //없는 경우 DEFAULT ERROR return.
    if (
      responseJson &&
      responseJson.error?.message &&
      errorCase[responseJson?.error.message]
    )
      errorMessage = errorCase[responseJson?.error.message];
    throw new Error(errorMessage);
  }
};
// findErrorMessage
export const firebaseErrorHandler = (code, errorCase = {}) => {
  // error case에서 해당하는 error message가 key값으로 존재하는 경우 return.
  //없는 경우 DEFAULT ERROR return.
  let errorMessage = DEFAULT_ERROR;
  if (code && errorCase && errorCase[code]) errorMessage = errorCase[code];

  throw new Error(errorMessage);
};
