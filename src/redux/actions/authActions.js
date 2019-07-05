// @flow
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { ApiUrls } from "../../constants/constants";
import User from "../../models/User";
import type { Saga } from "redux-saga";
import Sugar from "sugar";
Sugar.extend();

export type AuthParams = { email?: string, username: string, password: string };
export async function registerWithApi({
  email,
  username,
  password
}: AuthParams) {
  // return MockResponses.registerResponse.success;
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

import * as MockResponses from "../../../__mocks__/auth/authResponses";

export async function loginWithApi(creds: AuthParams) {
  // return MockResponses.loginResponse.apiResponse;
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
      const newUser = User.fromApi(user.user);
      yield put({
        type: "LOGIN_SUCCESS",
        // user
        user: { ...user, user: newUser }
      });
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga(): Saga<void> {
  try {
    // yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error: error.message });
  }
}

export function* registerSaga({ info }: { info: AuthParams }): Saga<void> {
  try {
    let { error, cookie, user_id } = yield call(registerWithApi, info);
    error = null;
    (cookie = ""), (user_id = 1);
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

export default function* authSaga(): Saga<void> {
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
