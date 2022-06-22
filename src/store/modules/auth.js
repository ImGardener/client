import { getUser } from "../../utils/user-apis";

const LOGIN = "auth/login";
const LOGOUT = "auth/logout";
const LOGIN_REQUEST = "auth/login_request";
const GET_AUTH_ERROR = "auth/get_auth_error";

const initialLoginState = {
  isLogin: false,
  token: null,
  loading: false,
  error: null,
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const login = (token) => {
  return {
    type: LOGIN,
    value: token,
  };
};
export const logout = (token) => {
  return {
    type: LOGOUT,
    value: null,
  };
};
export const getAuthError = (error) => {
  return {
    type: GET_AUTH_ERROR,
    value: error || "request is failed",
  };
};

const loginReducer = (state = initialLoginState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...initialLoginState, loading: true };
    }
    case LOGIN: {
      return { ...state, isLogin: true, loading: false, token: action.value };
    }
    case LOGOUT: {
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
      return { ...state, isLogin: false, token: null };
    }

    case GET_AUTH_ERROR: {
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
      return { ...state, isLogin: false, loading: false, error: action.value };
    }
    default:
      return state;
  }
};

export default loginReducer;

// login
export const loginThunk = ({ email, password }) => {
  return async (dispatch, state) => {
    // 유효하지 않으므로 로그인 불가능.
    if (!email || !password) return;
    try {
      dispatch(loginRequest());
      const { token, expiresIn } = await getUser({ email, password });

      // 토큰 유효시간 계산
      const expiredDate = calcTokenExpiredDate(expiresIn);

      // local token 저장
      localStorage.setItem("expired_date", expiredDate);
      localStorage.setItem("login_token", token);

      dispatch(login(token));
    } catch (error) {
      dispatch(getAuthError(error?.message));
    }
  };
};
export const autoLoginThunk = () => {
  return (dispatch, state) => {
    try {
      const expiredDate = localStorage.getItem("expired_date");
      const loginToken = localStorage.getItem("login_token");

      // 토큰이 유효하지 않으면 로그인 불가능.
      if (!loginToken || !expiredDate) return;

      const isValid = checkToeknIsValid(expiredDate);

      // local token으로 로그인
      if (isValid) dispatch(login(loginToken));
    } catch (error) {
      // 오류발생 시 local token 삭제
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
    }
  };
};

// 현재 토큰이 유효한지 검증
const checkToeknIsValid = (expiredDate) => {
  const expiredD = new Date(expiredDate).getTime();
  const current = new Date().getTime();

  if (expiredD - current > 10000) {
    return true;
  } else {
    localStorage.removeItem("expired_date");
    localStorage.removeItem("login_token");
    return false;
  }
};

// 토큰의 만료시간 계산.
const calcTokenExpiredDate = (expirationIn) => {
  const expiredTime = new Date(new Date().getTime() + expirationIn * 1000);
  return expiredTime;
};
