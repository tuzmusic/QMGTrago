// @flow

const initialState: LocationState = {
  currentRegion: null,
  error: null,
  searchRadiusInMiles: 5,
  isLoading: false
};

export default function dealsReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case "USER_LOCATION_START":
      return { ...state, isLoading: true };
    case "USER_LOCATION_SUCCESS":
    case "SET_CURRENT_REGION":
      return { ...state, currentRegion: action.region, isLoading: false };
    case "USER_LOCATION_FAILURE":
      return { ...state, error: action.error, isLoading: false };
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
  +isLoading: boolean
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
