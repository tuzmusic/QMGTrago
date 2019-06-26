// @flow
import { Location } from "expo";
import type { LocationAction } from "../reducers/locationReducer";

export function getLocationAsync(): LocationAction {
  console.log("hello from getLocationAsync");
  return { type: "", payload: null };
}
