// @flow
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import type {
  Location as LocationType,
  LocationAction
} from "../reducers/locationReducer";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";

export function setCurrentRegion(region: LocationType): LocationAction {
  return {
    type: "SET_CURRENT_REGION",
    region: { ...region, ...calculateRegion(region) }
  };
}

export function setSearchRadius(radius: number) {
  return { type: "SET_SEARCH_RADIUS", radius };
}

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

async function getUserLocation(): Promise<LocationType | void> {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted")
    return console.warn("Permission to access location was denied");

  let location = await Location.getCurrentPositionAsync();
  let { latitude, longitude } = location.coords;
  let region = { latitude, longitude, accuracy: 0.05 };
  return { ...region, ...calculateRegion(region) };
}

function calculateRegion({
  latitude,
  longitude,
  accuracy = 0.05
}): LocationType {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  const region = { latitude, longitude, latitudeDelta, longitudeDelta };
  return { ...region, latitudeDelta: 0.03, longitudeDelta: 0.03 };
}

export default function* locationSaga(): Saga<void> {
  yield all([yield takeEvery("USER_LOCATION_START", getLocationSaga)]);
}
