// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

export const initialState: DealState = {
  deals: {},
  loadingMessage: "",
  error: null,
  wishlist: [],
  wishlistFailureId: null
};

export const DealActionTypes = {
  ADD_TO_WISHLIST_START: "ADD_TO_WISHLIST_START",
  REMOVE_FROM_WISHLIST_START: "REMOVE_FROM_WISHLIST_START",
  ADD_TO_WISHLIST_FAILURE: "ADD_TO_WISHLIST_FAILURE",
  REMOVE_FROM_WISHLIST_FAILURE: "REMOVE_FROM_WISHLIST_FAILURE",
  GET_DEALS_START: "GET_DEALS_START",
  WISHLIST_SUCCESS: "WISHLIST_SUCCESS",
  GET_DEALS_SUCCESS: "GET_DEALS_SUCCESS",
  GET_DEALS_FAILURE: "GET_DEALS_FAILURE"
};

const types = DealActionTypes;

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  // if (!action.type.startsWith("@@")) console.log(action.type);
  let wishlist; // local wishlist for manipulation
  switch (action.type) {
    case types.GET_DEALS_START:
      return { ...state, loadingMessage: "Loading Deals..." };
    case types.GET_DEALS_SUCCESS:
      return { ...state, deals: action.deals, loadingMessage: "" };
    case types.GET_DEALS_FAILURE:
      return { ...state, error: action.error, loadingMessage: "" };
    /* case types.ADD_TO_WISHLIST_START:
      return { ...state, wishlist: state.wishlist.concat(action.id) };
    case types.REMOVE_FROM_WISHLIST_START:
      wishlist = [...state.wishlist];
      wishlist.splice(action.removal.index, 1);
      return { ...state, wishlist };
    case types.ADD_TO_WISHLIST_FAILURE:
      wishlist = [...state.wishlist];
      wishlist.splice(wishlist.indexOf(action.id), 1);
      return {
        ...state,
        wishlistFailureId: action.id,
        wishlist,
        error: action.error.message
      };
    case types.REMOVE_FROM_WISHLIST_FAILURE:
      const { id, index } = action.removal;
      wishlist = [...state.wishlist];
      wishlist.splice(index, 0, id);
      return {
        ...state,
        wishlistFailureId: -id,
        wishlist,
        error: action.error.message
      };
    case types.WISHLIST_SUCCESS: */
    default:
      return state;
  }
}

export type DealState = {
  +deals: DealCollection,
  +wishlist: number[],
  +loadingMessage: string,
  +error: ?string,
  wishlistFailureId: ?number
};
export type DealCollection = { [number]: Deal };
export type DealAction =
  | AddToWishlistStartAction
  | RemoveFromWishlistStartAction
  | AddToWishlistFailureAction
  | RemoveFromWishlistFailureAction
  | GetDealsStartAction
  | WishlistSuccessAction
  | GetDealsSuccessAction
  | GetDealsFailureAction;
export type AddToWishlistStartAction = {
  type: "ADD_TO_WISHLIST_START",
  id: number
};
export type RemoveFromWishlistStartAction = {
  type: "REMOVE_FROM_WISHLIST_START",
  removal: { id: number, index: number }
};
export type AddToWishlistFailureAction = {
  type: "ADD_TO_WISHLIST_FAILURE",
  id: number,
  error: Error
};
export type RemoveFromWishlistFailureAction = {
  type: "REMOVE_FROM_WISHLIST_FAILURE",
  removal: { id: number, index: number },
  error: Error
};
export type GetDealsStartAction = { type: "GET_DEALS_START" };
export type WishlistSuccessAction = { type: "WISHLIST_SUCCESS" };
export type GetDealsSuccessAction = {
  type: "GET_DEALS_SUCCESS",
  deals: DealCollection
};
export type GetDealsFailureAction = {
  type: "GET_DEALS_FAILURE",
  error: string
};
