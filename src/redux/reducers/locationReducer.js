// @flow

const initialState: LocationState = {
  currentRegion: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
    showMarker: false
  }
};

export default function dealsReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case "USER_LOCATION_SUCCESS":
      return { ...state, region: action.region };
    case "USER_LOCATION_FAILURE":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export type Location = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
  showMarker?: boolean
};
type LocationState = {
  +currentRegion: Location
};
export type LocationAction =
  | { type: "USER_LOCATION_START" }
  | {
      type: "USER_LOCATION_SUCCESS",
      region: Location
    }
  | {
      type: "USER_LOCATION_FAILURE",
      error: string
    };
