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
  return state;
}
type Location = {
  +latitude: number,
  +longitude: number,
  +latitudeDelta: number,
  +longitudeDelta: number,
  +showMarker: boolean
};
type LocationState = {
  +currentRegion: Location
};
export type LocationAction = {
  type: string,
  payload: Object
};
