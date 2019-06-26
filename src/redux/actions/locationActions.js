// @flow
import { Location, Permissions } from "expo";
import type { LocationAction } from "../reducers/locationReducer";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";

export function getLocationAsync(): LocationAction {
  return { type: "USER_LOCATION_START" };
}

export function* getLocationSaga(): Saga<void> {
  try {
    const region = yield call(getUserLocation);
    yield put({ type: "USER_LOCATION_SUCCESS", region });
  } catch (error) {
    yield put({ type: "USER_LOCATION_FAILURE", error: error.message });
  }
}

async function getUserLocation() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return console.warn("Permission to access location was denied");
  }
  let location = await Location.getCurrentPositionAsync({});
  let { latitude, longitude } = location.coords;
  let region = { latitude, longitude, accuracy: 0.05 };
  return { ...region, ...calculateRegion(region) };
}

function calculateRegion({ latitude, longitude, accuracy = 0.05 }) {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  return { latitude, longitude, latitudeDelta, longitudeDelta };
}

export default function* locationSaga(): Saga<void> {
  yield all([yield takeEvery("USER_LOCATION_START", getLocationSaga)]);
}
