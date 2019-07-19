// @flow
import User from "../../models/User";
type State = {
  +user: ?User,
  +isLoading: boolean,
  +error: ?string,
  +loadingMessage: string,

  +users: {}
};

export const initialState: State = {
  user: null,
  isLoading: false,
  error: null,
  loadingMessage: "",
  users: {}
};

const authReducer = (
  state: State = initialState,
  action: AuthAction
): State => {
  // if (action.type[0] !== "@") console.log("AuthReducer");

  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loadingMessage: "Logging in...", error: null };
    case "LOGOUT_START":
      return { ...state, loadingMessage: "Logging out...", error: null };
    case "REGISTRATION_START":
      return { ...state, loadingMessage: "Registering...", error: null };
    case "LOGIN_SUCCESS":
    case "REGISTRATION_SUCCESS":
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        loadingMessage: "",
        error: null
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, loadingMessage: "", error: null };
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
    case "REGISTRATION_FAILURE":
      return {
        ...state,
        loadingMessage: "",
        error: action.error,
        isLoading: false
      };
    case "CLEAR_AUTH_ERROR":
      return { ...state, loadingMessage: "", error: null };
    default:
      return state;
  }
};
export default authReducer;
export type AuthAction =
  | { type: "LOGIN_START" | "LOGOUT_START" | "REGISTRATION_START" }
  | { type: "LOGIN_SUCCESS" | "REGISTRATION_SUCCESS" | "SET_USER", user: User }
  | { type: "LOGOUT_SUCCESS" }
  | {
      type: "LOGIN_FAILURE" | "LOGOUT_FAILURE" | "REGISTRATION_FAILURE",
      error: string
    }
  | { type: "CLEAR_AUTH_ERROR" }
  | { type: "SAVE_USER_START", user: User }
  | { type: "LOAD_USER_START" }
  | { type: "CLEAR_USER_START" };
