// @flow
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { ApiUrls } from "../../constants/constants";
import User from "../../models/User";
import type { Saga } from "redux-saga";
import { AsyncStorage } from "react-native";
import type { AuthAction } from "../reducers/authReducer";
import Sugar from "sugar";
Sugar.extend();

export function saveUser(user: User): AuthAction {
  return { type: "SAVE_USER_START", user };
}

export function* saveUserSaga(action: { user: User }): Saga<void> {
  const userString = JSON.stringify(action.user);
  try {
    yield call(AsyncStorage.setItem, "trago_logged_in_user", userString);
    yield put({ type: "SAVE_USER_SUCCESS" });
  } catch (error) {
    yield put({ type: "SAVE_USER_FAILURE", error: error.message });
  }
}

export function loadUser(): AuthAction {
  return { type: "LOAD_USER_START" };
}

export function* loadUserSaga(): Saga<void> {
  try {
    const user = yield call(AsyncStorage.getItem, "trago_logged_in_user");
    if (user) {
      yield put(setUser(JSON.parse(user)));
      yield put({ type: "LOAD_USER_SUCCESS" });
    } else {
      throw Error("No saved user found");
    }
  } catch (error) {
    yield put({ type: "LOAD_USER_FAILURE", error: error.message });
  }
}

export function clearUser(): AuthAction {
  return { type: "CLEAR_USER_START" };
}

export type AuthParams = { email?: string, username: string, password: string };
export async function registerWithApi({
  email,
  username,
  password
}: AuthParams) {
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

export async function loginWithApi(creds: AuthParams) {
  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export async function logoutWithApi() {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({ creds }: { creds: AuthParams }): Saga<void> {
  try {
    const { error, ...user } = yield call(loginWithApi, creds);
    if (error) {
      yield put({ type: "LOGIN_FAILURE", error });
    } else {
      const newUserInfo = { ...user, user: User.fromApi(user.user) };
      yield put({ type: "LOGIN_SUCCESS", user: newUserInfo });
      yield put(saveUser(newUserInfo));
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga(): Saga<void> {
  try {
    // yield call(logoutWithApi);
    yield call(AsyncStorage.setItem, "trago_logged_in_user", "");
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error: error.message });
  }
}

export function* registerSaga({ info }: { info: AuthParams }): Saga<void> {
  try {
    let { error, cookie, user_id } = yield call(registerWithApi, info);
    if (error) {
      yield put({ type: "REGISTRATION_FAILURE", error });
    } else {
      const newUserInfo = {
        username: info.username,
        email: info.email,
        userId: user_id,
        cookie
      };
      const newUser = new User(newUserInfo);
      yield put({
        type: "REGISTRATION_SUCCESS",
        user: newUser
      });
      yield put(saveUser(newUser));
    }
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message });
  }
}

export default function* authSaga(): Saga<void> {
  yield all([
    yield takeEvery("LOGIN_START", loginSaga),
    yield takeEvery("LOGOUT_START", logoutSaga),
    yield takeEvery("REGISTRATION_START", registerSaga),
    yield takeEvery("LOAD_USER_START", loadUserSaga),
    yield takeEvery("SAVE_USER_START", saveUserSaga)
  ]);
}

// ACTION CREATORS
export function clearAuthError() {
  return { type: "CLEAR_AUTH_ERROR" };
}

export function setUser(user: User) {
  return { type: "SET_USER", user };
}

export function login(creds: AuthParams) {
  return { type: "LOGIN_START", creds };
}

export function cancelLogin() {
  return { type: "LOGIN_FAILURE" };
}

export function logout() {
  return { type: "LOGOUT_START" };
}

export function register({ username, email, password }: AuthParams) {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}
