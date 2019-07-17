// @flow
import User from "../src/models/User";
import dealsReducer from "../src/redux/reducers/dealsReducer";
import type { DealState } from "../src/redux/reducers/dealsReducer";
const initialState: DealState = {
  deals: {},
  loadingMessage: "",
  error: null,
  wishlist: []
};

describe("Wishlist redux actions", () => {
  describe("reducer", () => {
    it("start action optimistically adds a deal id to the wishlist in state", () => {
      const startAction = { type: "ADD_TO_WISHLIST_START", id: 2129 };
      expect(dealsReducer(initialState, startAction).wishlist).toContain(2129);
    });
    it("start action optimistically removes a deal id from the wishlist in state", () => {
      const startAction = { type: "REMOVE_FROM_WISHLIST_START", id: 2129 };
      const state = { ...initialState, wishlist: [2129] };
      expect(dealsReducer(state, startAction).wishlist).not.toContain(2129);
    });
  });
});
