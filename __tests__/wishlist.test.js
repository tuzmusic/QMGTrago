// @flow

import type { WishlistState } from "../src/redux/reducers/wishlistReducer";
import * as Action from "../src/redux/reducers/wishlistReducer";
import reducer, {
  initialState,
  WishlistActionTypes as Types
} from "../src/redux/reducers/wishlistReducer";
import mockDeals from "../__mocks__/mockDeals";
import products from "../__mocks__/api/products";
import Deal from "../src/models/Deal";

const list1 = products.map(d => Deal.fromApi(d));
const stateWithList: WishlistState = {
  ...initialState,
  currentWishlist: list1
};

describe("wishlistReducer", () => {
  describe("GET_WISHLIST actions", () => {
    const getSuccessAction: Action.GetWishlistSuccessAction = {
      type: Types.GET_WISHLIST_SUCCESS,
      wishlist: list1
    };
    const getFailureAction: Action.GetWishlistFailureAction = {
      type: Types.GET_WISHLIST_FAILURE,
      error: Error("Something went wrong")
    };
    test("start action does nothing", () => {
      const startAction: Action.GetWishlistStartAction = {
        type: Types.GET_WISHLIST_START
      };
      expect({ type: Types.gws });
    });
    test("success updates the current wishlist, and resets the error and previous wishlist", () => {
      expect(reducer(initialState, getSuccessAction)).toEqual(stateWithList);
    });

    describe("failure", () => {
      test("if state already has a wishlist, failure simply returns the state", () => {
        expect(reducer(stateWithList, getFailureAction)).toEqual(stateWithList);
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
    const list2 = [...list1];
    const lastDeal = list2.pop();
    const stateWithList2: WishlistState = {
      ...stateWithList,
      currentWishlist: list2
    };
    const optimisticAddState: WishlistState = {
      ...stateWithList,
      previousWishlist: list2
    };
    describe("start action", () => {
      it("should update the currentWishlist and previousWishlist", () => {
        const addStart: Action.AddToWishlistStartAction = {
          type: Types.ADD_TO_WISHLIST_START,
          deal: lastDeal
        };
        expect(reducer(stateWithList2, addStart)).toEqual(optimisticAddState);
      });
    });
    describe("success action", () => {
      it("should simply clear the previousWishlist. since it's no longer needed. right?", () => {
        const addSuccessAction: Action.AddToWishlistSuccessAction = {
          type: Types.ADD_TO_WISHLIST_SUCCESS
        };
        expect(reducer(optimisticAddState, addSuccessAction)).toEqual({
          ...optimisticAddState,
          previousWishlist: null
        });
      });
    });
  });
});
