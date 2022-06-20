const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const initialLoginState = {
  isLogin: false,
  token: null,
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

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isLogin: true, token: action.value };
    }
    case LOGOUT: {
      localStorage.removeItem("expired_date");
      localStorage.removeItem("login_token");
      return { ...state, isLogin: false, token: null };
    }
    default:
      return state;
  }
};

export default loginReducer;

export const autoLoginThunk = () => {
  return (dispatch, state) => {
    console.log("go..");
    const expiredDate = localStorage.getItem("expired_date");
    const loginToken = localStorage.getItem("login_token");

    // 토큰이 유효하지 않으므로 로그인 불가능.
    if (!loginToken || !expiredDate) return;

    const isValid = checkToeknIsValid(expiredDate);

    // local token으로 로그인
    if (isValid) dispatch(login(loginToken));
  };
};

// login
export const loginThunk = ({ token, expiresIn }) => {
  return (dispatch, state) => {
    // 토큰이 유효하지 않으므로 로그인 불가능.
    if (!token || !expiresIn) return;

    // 토큰 유효시간 계산
    const expiredDate = calcTokenExpiredDate(expiresIn);

    // local token 저장
    localStorage.setItem("expired_date", expiredDate);
    localStorage.setItem("login_token", token);

    dispatch(login(token));
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
