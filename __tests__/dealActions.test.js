// @flow
import Deal from "../src/models/Deal";
import { setupMockAdapter } from "../__mocks__/axiosMocks";
import products from "../__mocks__/api/products";
import SagaTester from "redux-saga-tester";
import recordSaga from "../recordSaga";
import dealsSaga, {
  getDeals,
  getDealsSaga
} from "../src/redux/actions/dealActions";
import dealsReducer from "../src/redux/reducers/dealsReducer";
import type {
  DealAction,
  DealCollection,
  DealState
} from "../src/redux/reducers/dealsReducer";

setupMockAdapter({ deals: true });

const expectedDeals: DealCollection = Deal.collectionFromApiArray(products);
// products.forEach(p => (expectedDeals[p.id] = Deal.fromApi(p)));
const startAction: DealAction = { type: "GET_DEALS_START" };
const successAction: DealAction = {
  type: "GET_DEALS_SUCCESS",
  deals: expectedDeals
};
const failureAction: DealAction = {
  type: "GET_DEALS_FAILURE",
  error: "Bad stuff happened"
};
const initialState: DealState = { deals: {}, loadingMessage: "", error: null };
const successState: DealState = {
  deals: expectedDeals,
  loadingMessage: "",
  error: null
};
const failureState: DealState = {
  deals: {},
  loadingMessage: "",
  error: "Bad stuff happened"
};

describe("getDeals", () => {
  describe("reducer", () => {
    it("updates the state for a success action", () => {
      expect(dealsReducer(initialState, successAction)).toEqual(successState);
    });
    it("updates the state for a failure action", () => {
      expect(dealsReducer(initialState, failureAction)).toEqual(failureState);
    });
  });

  describe("getDeals action creator", () => {
    it("returns the start action", () => {
      expect(getDeals()).toEqual(startAction);
    });
  });

  xdescribe("getDealsSaga", () => {
    it("dispatches a success action with the fetched deals", async () => {
      const dispatched = await recordSaga(getDealsSaga, startAction);
      console.log(dispatched);

      expect(dispatched).toContainEqual(successAction);
    });
  });

  describe("integration", () => {
    let sagaStore;
    beforeEach(() => {
      sagaStore = new SagaTester({});
      sagaStore.start(dealsSaga);
      jest.setTimeout(1000);
    });

    it("does the whole saga thing", async () => {
      sagaStore.dispatch(startAction);
      await sagaStore.waitFor(successAction.type);
      const calledActionTypes: string[] = sagaStore
        .getCalledActions()
        .map(a => a.type);
      expect(calledActionTypes).toEqual([startAction.type, successAction.type]);
      const receivedDeals: DealCollection = sagaStore.getLatestCalledAction()
        .deals;
      Object.keys(receivedDeals).forEach((k: string) => {
        const id = Number(k);
        const deal: Object = { ...receivedDeals[id] };
        // const expected: Deal = expectedDeals[id];
        const expected: Object = { ...expectedDeals[id] };
        for (let key in expected) {
          if (typeof expected[key] === "function") continue;
          expect(expected[key]).toEqual(deal[key]);
        }
      });
      // expect(receivedDeals).toEqual(expectedDeals);
    });
  });
});
