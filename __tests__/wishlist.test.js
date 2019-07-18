// @flow

import type { WishlistState } from "../src/redux/reducers/wishlistReducer";
import * as Ac from "../src/redux/reducers/wishlistReducer";
import reducer, {
  initialState,
  WishlistActionTypes as t
} from "../src/redux/reducers/wishlistReducer";
import mockDeals from "../__mocks__/mockDeals";
import products from "../__mocks__/api/products";
import Deal from "../src/models/Deal";

const list1 = products.map(d => Deal.fromApi(d));
const list2 = [...list1];
const lastDeal = list2.pop();

const stateWithFullList: WishlistState = {
  ...initialState,
  currentWishlist: list1
};
const stateWithShorterList: WishlistState = {
  ...stateWithFullList,
  currentWishlist: list2
};
const optimisticAddState: WishlistState = {
  ...stateWithFullList,
  previousWishlist: list2
};

describe("wishlistReducer", () => {
  describe("GET_WISHLIST actions", () => {
    const getSuccessAction: Ac.GetWishlistSuccessAction = {
      type: t.GET_WISHLIST_SUCCESS,
      wishlist: list1
    };
    const getFailureAction: Ac.GetWishlistFailureAction = {
      type: t.GET_WISHLIST_FAILURE,
      error: Error("Something went wrong")
    };
    test("start action does nothing", () => {
      const startAction: Ac.GetWishlistStartAction = {
        type: t.GET_WISHLIST_START
      };
      expect(reducer(stateWithFullList, startAction)).toEqual(
        stateWithFullList
      );
    });
    test("success updates the current wishlist, and resets the error and previous wishlist", () => {
      expect(reducer(initialState, getSuccessAction)).toEqual(
        stateWithFullList
      );
    });

    describe("failure", () => {
      test("if state already has a wishlist, failure simply returns the state", () => {
        expect(reducer(stateWithFullList, getFailureAction)).toEqual(
          stateWithFullList
        );
      });
      test("if no wishlist in state, failure returns an error", () => {
        expect(reducer(initialState, getFailureAction)).toEqual({
          ...initialState,
          error: "Something went wrong"
        });
      });
    });
  });

  describe("ADD_TO_WISHLIST actions", () => {
    describe("start action", () => {
      it("should update the currentWishlist and previousWishlist", () => {
        const addStart: Ac.AddToWishlistStartAction = {
          type: t.ADD_TO_WISHLIST_START,
          deal: lastDeal
        };
        expect(reducer(stateWithShorterList, addStart)).toEqual(
          optimisticAddState
        );
      });
    });
    describe("success action", () => {
      it("should simply clear the previousWishlist. since it's no longer needed. right?", () => {
        const addSuccessAction: Ac.AddToWishlistSuccessAction = {
          type: t.ADD_TO_WISHLIST_SUCCESS
        };
        expect(reducer(optimisticAddState, addSuccessAction)).toEqual({
          ...optimisticAddState,
          previousWishlist: null
        });
      });
    });
    describe("failure action", () => {
      const addFailureAction: Ac.AddToWishlistFailureAction = {
        type: t.ADD_TO_WISHLIST_FAILURE,
        error: Error("Something went wrong")
      };
      const failureResult: WishlistState = reducer(
        optimisticAddState,
        addFailureAction
      );

      it("reverts currentWishlist to the previous wishlist", () => {
        expect(failureResult.currentWishlist).toEqual(list2);
      });

      it("clears previousWishlist", () => {
        expect(failureResult.previousWishlist).toBe(null);
      });

      it("reports an error", () => {
        expect(failureResult.error).toEqual("Something went wrong");
      });
    });
  });
});
