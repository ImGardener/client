import app from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AUTH_ERROR, firebaseErrorHandler } from "./errorCase";

// eamil , password로 로그인
export const getUser = async (info) => {
  try {
    const auth = getAuth();
    let userCredential = await signInWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );

    const user = userCredential._tokenResponse;

    return { token: user.idToken, expiresIn: user.expiresIn };
  } catch (error) {
    // 정의된 error case에 해당하는 errorMessage throw;
    firebaseErrorHandler(error.code, AUTH_ERROR);
  }
};

// eamil , password로 회원가입
export const addUser = async (info) => {
  try {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, info.email, info.password).then(
      (userCredential) => {
        return userCredential.user;
      }
    );
  } catch (e) {
    // 정의된 error case에 해당하는 errorMessage throw;
    firebaseErrorHandler(e.code, AUTH_ERROR);
  }
};
