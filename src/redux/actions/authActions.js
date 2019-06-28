import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { ApiUrls } from "../../../constants";
import User from "../../models/User";
import Sugar from "sugar";
Sugar.extend();

export async function registerWithApi({ email, username, password }) {
  const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
  if (!nonce) throw Error("Could not get nonce");
  const params = {
    username,
    email,
    nonce,
    display_name: username,
    user_pass: password
  };
  const res = await axios.get(ApiUrls.register, { params });
  return res.data;
}

export async function loginWithApi(creds) {
  const res = await axios.get(ApiUrls.login, { params: creds });
  // console.log("login response:", res.data);
  return res.data;
}

export async function logoutWithApi() {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({ creds }) {
  try {
    const { error, ...user } = yield call(loginWithApi, creds);

    if (error) {
      yield put({ type: "LOGIN_FAILURE", error });
    } else {
      const newUser = User.fromApi(user.user);
      yield put({
        type: "LOGIN_SUCCESS",
        // user
        user: { ...user, user: newUser }
      });
    }
  } catch (error) {
    // console.log("login error:", error.message);
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga() {
  try {
    // yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error: error.message });
  }
}

export function* registerSaga({ info }) {
  try {
    let { error, cookie, user_id } = yield call(registerWithApi, info);
    yield put(
      error
        ? { type: "REGISTRATION_FAILURE", error }
        : {
            type: "REGISTRATION_SUCCESS",
            user: {
              username: info.username,
              email: info.email,
              userId: user_id,
              cookie
            }
          }
    );
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message });
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery("LOGIN_START", loginSaga),
    yield takeEvery("LOGOUT_START", logoutSaga),
    yield takeEvery("REGISTRATION_START", registerSaga)
  ]);
}

// ACTION CREATORS
export function clearAuthError() {
  return { type: "CLEAR_AUTH_ERROR" };
}

export function setUser(user) {
  return { type: "SET_USER", user };
}

export function login(creds) {
  return { type: "LOGIN_START", creds };
}

export function cancelLogin() {
  return { type: "LOGIN_FAILURE" };
}

export function logout() {
  return { type: "LOGOUT_START" };
}

export function register({ username, email, password }) {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}
