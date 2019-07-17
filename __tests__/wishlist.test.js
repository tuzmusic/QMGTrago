// @flow
import dealsReducer, {
  initialState,
  DealActionTypes as Types
} from "../src/redux/reducers/dealsReducer";
import * as Type from "../src/redux/reducers/dealsReducer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { WishlistUrls } from "../src/constants/constants";
import * as fs from "fs";
import * as path from "path";
import cheerio from "cheerio";
import {
  getCurrentWishlist,
  addToWishlist,
  removeFromWishlist
} from "../src/redux/actions/wishlistActions";
import mockDeals from "../__mocks__/mockDeals";
import Deal from "../src/models/Deal";
import SagaTester from "redux-saga-tester";

describe("Wishlist actions - Reducer", () => {
  describe("start actions", () => {
    it("start action optimistically adds a deal id to the wishlist in state", () => {
      const startAction: Type.AddToWishlistStartAction = {
        type: Types.addToWishlistStart,
        id: 2129
      };
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

describe("Wishlist redux actions", () => {
  let deal;

  beforeAll(() => {
    // Set up mock response for getWishlist
    const mock = new MockAdapter(axios);
    const thePath = path.resolve(__dirname, "../__mocks__/wishlist-2.html");
    const mockHtml = fs.readFileSync(thePath);
    mock.onGet(WishlistUrls.get).reply(200, mockHtml.toString(), {
      "content-type": "text/html"
    });

    deal = new Deal(mockDeals[0]);
  });

  describe("helper functions and action creators", () => {
    describe("getCurrentWishlist helper function", () => {
      it("loads the current user's wishlist and returns the ids", async () => {
        expect(await getCurrentWishlist()).toEqual([2094, 2122, 2129]);
      });
    });

    describe("addToWishlist", () => {
      it("takes a deal argument and returns an action to add the deal to the wishlist", () => {
        expect(addToWishlist(deal)).toEqual({
          type: "ADD_TO_WISHLIST_START",
          id: deal.id
        });
      });
    });

    describe("removeFromWishlist", () => {
      it("takes a deal and the current wishlist and returns an action to remove the deal from the wishlist", () => {
        const wishlist = [1, 2, deal.id, 4];
        expect(removeFromWishlist(deal, wishlist)).toEqual({
          type: "REMOVE_FROM_WISHLIST_START",
          removal: { id: deal.id, index: 2 }
        });
      });
    });
  });

  describe("addToWishlistSaga", () => {
    const startAction = { type: Types.addToWishlistStart, id: deal.id };
  });
});
