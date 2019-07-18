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

const fullList = products.map(d => Deal.fromApi(d));
const shorterList = [...fullList];
const lastDeal = shorterList.pop();

const stateWithFullList: WishlistState = {
  ...initialState,
  currentWishlist: fullList
};
const stateWithShorterList: WishlistState = {
  ...stateWithFullList,
  currentWishlist: shorterList
};
const optimisticAddState: WishlistState = {
  ...stateWithFullList,
  previousWishlist: shorterList
};
const optimisticRemoveState: WishlistState = {
  ...stateWithShorterList,
  previousWishlist: fullList
};

describe("wishlistReducer", () => {
  describe("GET_WISHLIST actions", () => {
    const getSuccessAction: Ac.GetWishlistSuccessAction = {
      type: t.GET_WISHLIST_SUCCESS,
      wishlist: fullList
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
      const addfailureResult: WishlistState = reducer(
        optimisticAddState,
        addFailureAction
      );

      it("reverts currentWishlist to the previous wishlist", () => {
        expect(addfailureResult.currentWishlist).toEqual(shorterList);
      });

      it("clears previousWishlist", () => {
        expect(addfailureResult.previousWishlist).toBeNull();
      });

      it("reports an error", () => {
        expect(addfailureResult.error).toEqual("Something went wrong");
      });
    });
  });

  describe("REMOVE_FROM_WISHLIST actions", () => {
    describe("start action", () => {
      const removeStart: Ac.RemoveFromWishlistStartAction = {
        type: t.REMOVE_FROM_WISHLIST_START,
        deal: lastDeal
      };
      const removeStartResult = reducer(stateWithFullList, removeStart);
      it("should remove the deal from the wishlist", () => {
        expect(removeStartResult.currentWishlist).not.toContain(lastDeal);
      });
      it("should store the current wish list in previousWishlist", () => {
        expect(removeStartResult.previousWishlist).toEqual(fullList);
      });
    });
    describe("success action", () => {
      const removeSuccess: Ac.RemoveFromWishlistSuccessAction = {
        type: t.REMOVE_FROM_WISHLIST_SUCCESS
      };
      const removeSuccessResult = reducer(optimisticRemoveState, removeSuccess);
      it("should simply clear the previousWishlist. since it's no longer needed. right?", () => {
        expect(removeSuccessResult).toEqual({
          ...optimisticRemoveState,
          previousWishlist: null
        });
      });
    });
    describe("failure action", () => {
      const removeFailure: Ac.RemoveFromWishlistFailureAction = {
        type: t.REMOVE_FROM_WISHLIST_FAILURE,
        error: Error("Something went wrong")
      };
      const removeFailureResult = reducer(optimisticRemoveState, removeFailure);

      it("reverts the [optimistic] currentWishlist to the previous wishlist", () => {
        expect(removeFailureResult.currentWishlist).toEqual(fullList);
      });
      it("clears previousWishlist", () => {
        expect(removeFailureResult.previousWishlist).toBeNull();
      });
      it("reports an error", () => {
        expect(removeFailureResult.error).toEqual("Something went wrong");
      });
    });
  });
});
