// @flow
import type {
  Location,
  LocationAction
} from "../src/redux/reducers/locationReducer";
import { getLocationSaga } from "../src/redux/actions/locationActions";
import SagaTester from "redux-saga-tester";
import recordSaga from "../recordSaga";

describe("getLocationAsync", () => {
  const calculatedSimulatorLocation: Location = {
    latitude: 37.33233141,
    latitudeDelta: 0.0004491555874955085,
    longitude: -122.0312186,
    longitudeDelta: -0.05737702242408729
  };
  const startAction: LocationAction = { type: "USER_LOCATION_START" };
  const successAction: LocationAction = {
    type: "USER_LOCATION_SUCCESS",
    region: calculatedSimulatorLocation
  };
  describe("userLocationSaga", () => {
    it("gets the user's location", async () => {
      const dispatched = await recordSaga(getLocationSaga, startAction);
      expect(dispatched).toContainEqual(successAction);
    });
  });
});
