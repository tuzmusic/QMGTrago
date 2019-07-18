// @flow

import type { WishlistState } from "../src/redux/reducers/wishlistReducer";
import * as Action from "../src/redux/reducers/wishlistReducer";
import wishlistReducer, {
  initialState,
  WishlistActionTypes
} from "../src/redux/reducers/wishlistReducer";
import mockDeals from "../__mocks__/mockDeals";
import products from "../__mocks__/api/products";
import Deal from "../src/models/Deal";

describe("wishlistReducer", () => {
  describe("GET_WISHLIST actions", () => {
    const list1 = products.map(d => Deal.fromApi(d));
    const getSuccessAction: Action.GetWishlistSuccessAction = {
      type: WishlistActionTypes.getWishlistSuccess,
      wishlist: list1
    };
    const getFailureAction: Action.GetWishlistFailureAction = {
      type: WishlistActionTypes.getWishlistFailure,
      error: Error("Something went wrong")
    };

    it("updates the current wishlist, and resets the error and previous wishlist on success", () => {
      expect(wishlistReducer(initialState, getSuccessAction)).toEqual({
        ...initialState,
        currentWishlist: list1,
        previousWishlist: null,
        error: null
      });
    });

    describe("failure", () => {
      test("if state already has a wishlist, failure simply returns the state", () => {
        const state = { ...initialState, currentWishlist: list1 };
        expect(wishlistReducer(state, getFailureAction)).toEqual(state);
      });
      test("if no wishlist in state, failure returns an error", () => {
        expect(wishlistReducer(initialState, getFailureAction)).toEqual({
          ...initialState,
          error: "Something went wrong"
        });
      });
    });
  });
});
