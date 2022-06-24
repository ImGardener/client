import { getUser } from "../../utils/user-apis";

const LOGIN_SUCCESS = "auth/login";
const LOGOUT_SUCCESS = "auth/logout";
const LOGIN_REQUEST = "auth/login_request";
const AUTH_ERROR = "auth/get_auth_error";
const ERROR_RESET = "auth/reset_error";

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

export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    value: token,
  };
};
export const logout = (token) => {
  return {
    type: LOGOUT_SUCCESS,
    value: null,
  };
};
export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    value: error || "request is failed",
  };
};
export const resetError = () => {
  return {
    type: ERROR_RESET,
  };
};

const authReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...initialLoginState, loading: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLogin: true, loading: false, token: action.value };
    }
    case LOGOUT_SUCCESS: {
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
      return { ...state, isLogin: false, token: null };
    }

    case AUTH_ERROR: {
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
      return { ...state, isLogin: false, loading: false, error: action.value };
    }
    case ERROR_RESET: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

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

      dispatch(loginSuccess(token));
    } catch (error) {
      dispatch(authError(error?.message));
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
      if (isValid) dispatch(loginSuccess(loginToken));
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
export default authReducer;
