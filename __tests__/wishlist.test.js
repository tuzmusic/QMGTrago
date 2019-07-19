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
import mockDeals from "../__mocks__/mockDeals";
import products from "../__mocks__/api/products";
import Deal from "../src/models/Deal";
import type { DealCollection } from "../src/redux/reducers/dealsReducer";
import wishlistSaga, {
  getWishlist,
  getWishlistSaga
} from "../src/redux/actions/wishlistActions";
import recordSaga from "../recordSaga";

// #endregion

// #region PREP
const fullList: Deal[] = products.map(d => Deal.fromApi(d));
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
  fdescribe("GET_WISHLIST actions", () => {
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
        wishlistIds: fullList.map(d => d.id)
      };
      const successResult = reducer(initialState, getSuccessAction);
      it("updates the current wishlist", () => {
        expect(
          successResult.currentWishlist &&
            successResult.currentWishlist.toString()
        ).toEqual(
          stateWithFullList.currentWishlist &&
            stateWithFullList.currentWishlist.toString()
        );
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
  it("is called by wishlistSaga", async () => {
    const getWishlist = jest.fn().mockImplementation(() => []);
    const dispatched = await recordSaga(getWishlistSaga, startAction);
    console.log(dispatched);
  });
  describe("action creator", () => {
    it("returns a start action", () => {
      expect(getWishlist()).toEqual(startAction);
    });
  });
  describe("getWishlistSaga", () => {
    describe("success response", () => {
      const successResponse: GetWishlistSuccessAction = {
        type: t.GET_WISHLIST_SUCCESS,
        wishlist: fullList
      };

      // NOT SURE IF THIS IS THE RIGHT WAY TO TEST A SAGA
      it("returns the current wishlist", async () => {
        expect((await getWishlistSaga()).wishlist).toEqual(
          successResponse.wishlist
        );
      });
    });
  });
});
