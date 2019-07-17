// @flow
import User from "../src/models/User";
import dealsReducer, { initialState } from "../src/redux/reducers/dealsReducer";
import type { DealState } from "../src/redux/reducers/dealsReducer";

describe("Wishlist actions - Reducer", () => {
  describe("start actions", () => {
    it("start action optimistically adds a deal id to the wishlist in state", () => {
      const startAction = { type: "ADD_TO_WISHLIST_START", id: 2129 };
      expect(dealsReducer(initialState, startAction).wishlist).toContain(2129);
    });
    it("start action optimistically removes a deal id from the wishlist in state", () => {
      const startAction = {
        type: "REMOVE_FROM_WISHLIST_START",
        removal: { id: 2129, index: 0 }
      };
      const state = { ...initialState, wishlist: [2129, 3, 4] };
      expect(dealsReducer(state, startAction).wishlist).not.toContain(2129);
    });
  });
  describe("success action", () => {
    it("doesn't actually change the state. just a formality.", () => {
      expect(dealsReducer(initialState, { type: "WISHLIST_SUCCESS" })).toEqual(
        initialState
      );
    });
  });
  describe("failure actions", () => {
    const originalWishlist = [1, 2, 3, 4];

    it("stores the failed ID as a positive number on a failed add, and restores the pre-optimistic wishlist", () => {
      const addFail = { type: "ADD_TO_WISHLIST_FAILURE", id: 10 };
      const optimisticAddState = {
        ...initialState,
        wishlist: [1, 2, 3, 4, 10]
      };
      expect(dealsReducer(optimisticAddState, addFail)).toEqual({
        ...initialState,
        wishlist: originalWishlist,
        wishlistFailureId: 10
      });
    });

    it("stores the failed ID as a negative number on a failed remove, and restores the pre-optimistic wishlist", () => {
      const removeFail = {
        type: "REMOVE_FROM_WISHLIST_FAILURE",
        removal: { id: 2, index: 1 }
      };
      const optimisticRemoveState = {
        ...initialState,
        wishlist: [1, 3, 4]
      };
      expect(dealsReducer(optimisticRemoveState, removeFail)).toEqual({
        ...initialState,
        wishlist: originalWishlist,
        wishlistFailureId: -2
      });
    });

    xit("somehow handles overlapping failures and successes. ", () => {});
  });
});
