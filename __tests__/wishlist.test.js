// @flow
// #region IMPORTS
import type {
  WishlistState,
  GetWishlistStartAction,
  GetWishlistSuccessAction,
  GetWishlistFailureAction,
  AddToWishlistStartAction,
  AddToWishlistSuccessAction,
  AddToWishlistFailureAction,
  RemoveFromWishlistStartAction,
  RemoveFromWishlistSuccessAction,
  RemoveFromWishlistFailureAction
} from "../src/redux/reducers/wishlistReducer";
import * as Ac from "../src/redux/reducers/wishlistReducer";
import reducer, {
  initialState as emptyState,
  WishlistActionTypes as t
} from "../src/redux/reducers/wishlistReducer";
import products from "../__mocks__/api/products";
import Deal from "../src/models/Deal";
import User from "../src/models/Deal";
import type { DealCollection } from "../src/redux/reducers/dealsReducer";
import wishlistSaga, {
  getWishlist,
  getWishlistSaga
} from "../src/redux/actions/wishlistActions";
import recordSaga from "../recordSaga";
import * as fs from "fs";
import * as path from "path";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { WishlistUrls } from "../src/constants/constants";

// #endregion

// #region SETUP
const fullList: Deal[] = products.map(d => Deal.fromApi(d));
const fullListIds: number[] = fullList.map(d => d.id);
const deals: DealCollection = Deal.collectionFromApiArray(products);
const shorterList = [...fullList];
const lastDeal = shorterList.pop();
const initialState: WishlistState = { ...emptyState, deals };

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
// #endregion

describe("wishlistReducer", () => {
  describe("getting required info", () => {
    it("needs to receive the deals", () => {
      const dealAction = { type: "GET_DEALS_SUCCESS", deals };
      expect(reducer(emptyState, dealAction)).toEqual(initialState);
    });
    it("needs to receive the user", () => {
      const user = new User({
        id: 1,
        firstName: "asdf",
        lastName: "asdf",
        dateCreated: Date.now(),
        username: "asdf",
        email: "asdf@sdjkl.com"
      });
      const userState = { ...emptyState, user };
      expect(reducer(emptyState, { type: "LOGIN_SUCCESS", user })).toEqual(
        userState
      );
      expect(
        reducer(emptyState, { type: "REGISTRATION_SUCCESS", user })
      ).toEqual(userState);
      expect(reducer(emptyState, { type: "SET_USER", user })).toEqual(
        userState
      );
    });
  });
  describe("GET_WISHLIST actions", () => {
    describe("start", () => {
      test("start action does nothing", () => {
        const startAction: GetWishlistStartAction = {
          type: t.GET_WISHLIST_START
        };
        expect(reducer(stateWithFullList, startAction)).toEqual(
          stateWithFullList
        );
      });
    });

    describe("success", () => {
      const getSuccessAction: GetWishlistSuccessAction = {
        type: t.GET_WISHLIST_SUCCESS,
        wishlistIds: fullListIds
      };
      const successResult = reducer(initialState, getSuccessAction);
      it("updates the current wishlist", () => {
        // without "toString" these "serialize to the same string"
        expect(successResult.toString()).toEqual(stateWithFullList.toString());
      });
      it("resets the error and previous wishlist", () => {
        expect(successResult.previousWishlist).toBeNull();
        expect(successResult.error).toBeNull();
      });
    });

    describe("failure", () => {
      const getFailureAction: GetWishlistFailureAction = {
        type: t.GET_WISHLIST_FAILURE,
        error: Error("Something went wrong")
      };
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
        const addStart: AddToWishlistStartAction = {
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
        const addSuccessAction: AddToWishlistSuccessAction = {
          type: t.ADD_TO_WISHLIST_SUCCESS
        };
        expect(reducer(optimisticAddState, addSuccessAction)).toEqual({
          ...optimisticAddState,
          previousWishlist: null
        });
      });
    });
    describe("failure action", () => {
      const addFailureAction: AddToWishlistFailureAction = {
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
      const removeStart: RemoveFromWishlistStartAction = {
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
      const removeSuccess: RemoveFromWishlistSuccessAction = {
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
      const removeFailure: RemoveFromWishlistFailureAction = {
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

describe("getWishlist Actions/Saga", () => {
  const startAction: GetWishlistStartAction = { type: t.GET_WISHLIST_START };
  xit("is called by wishlistSaga", async () => {
    const getCurrentWishlist = jest
      .fn()
      .mockImplementation(() => console.log("hello from mock"));
    const dispatched = await recordSaga(getWishlistSaga, startAction);
    console.log(dispatched);
    expect(getCurrentWishlist).toHaveBeenCalled();
  });

  describe("action creator", () => {
    it("returns a start action", () => {
      expect(getWishlist()).toEqual(startAction);
    });
  });

  describe("getWishlistSaga", () => {
    describe("success response", () => {
      // setup mock response
      beforeAll(() => {
        const mockWishlistPath = path.resolve(
          __dirname,
          "../__mocks__/wishlist-2.html"
        );
        const mockWishlistStr = fs.readFileSync(mockWishlistPath).toString();
        const mock = new MockAdapter(axios);
        mock.onGet(WishlistUrls.get).replyOnce(200, mockWishlistStr);
      });
      const mockResponseWishlistIds = [2094, 2122, 2129];
      const successResponse: GetWishlistSuccessAction = {
        type: t.GET_WISHLIST_SUCCESS,
        wishlistIds: mockResponseWishlistIds
      };

      it("gets the wishlist", async () => {
        const dispatched = await recordSaga(getWishlistSaga, startAction);
        console.log(dispatched);
        expect(dispatched).toContainEqual(successResponse);
        // done();
      });
    });
  });
});
