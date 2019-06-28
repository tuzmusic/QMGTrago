// @flow

const initialState: LocationState = {
  currentRegion: null,
  error: null,
  searchRadiusInMiles: 5,
  loadingMessage: ""
};

export default function dealsReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case "USER_LOCATION_START":
      return { ...state, loadingMessage: "Getting Location..." };
    case "USER_LOCATION_SUCCESS":
    case "SET_CURRENT_REGION":
      return { ...state, currentRegion: action.region, loadingMessage: "" };
    case "USER_LOCATION_FAILURE":
      return { ...state, error: action.error, loadingMessage: "" };
    case "SET_SEARCH_RADIUS":
      return { ...state, searchRadiusInMiles: action.radius };
    default:
      return state;
  }
}

export type Location = {
  latitude: number,
  longitude: number,
  latitudeDelta?: number,
  longitudeDelta?: number,
  accuracy?: number,
  showMarker?: boolean
};

type LocationState = {
  +currentRegion: ?Location,
  +error: ?string,
  +searchRadiusInMiles: number,
  +loadingMessage: string
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
    }
  | {
      type: "SET_SEARCH_RADIUS",
      radius: number
    }
  | {
      type: "SET_CURRENT_REGION",
      region: Location
    };
