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
  addToWishlistStart: "ADD_TO_WISHLIST_START",
  removeFromWishlistStart: "REMOVE_FROM_WISHLIST_START",
  addToWishlistFailure: "ADD_TO_WISHLIST_FAILURE",
  removeFromWishlistFailure: "REMOVE_FROM_WISHLIST_FAILURE",
  getDealsStart: "GET_DEALS_START",
  wishlistSuccess: "WISHLIST_SUCCESS",
  getDealsSuccess: "GET_DEALS_SUCCESS",
  getDealsFailure: "GET_DEALS_FAILURE"
};

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  // if (!action.type.startsWith("@@")) console.log(action.type);
  let wishlist; // local wishlist for manipulation
  switch (action.type) {
    case DealActionTypes.getDealsStart:
      return { ...state, loadingMessage: "Loading Deals..." };
    case DealActionTypes.getDealsSuccess:
      return { ...state, deals: action.deals, loadingMessage: "" };
    case DealActionTypes.getDealsFailure:
      return { ...state, error: action.error, loadingMessage: "" };
    case DealActionTypes.addToWishlistStart:
      return { ...state, wishlist: state.wishlist.concat(action.id) };
    case DealActionTypes.removeFromWishlistStart:
      wishlist = [...state.wishlist];
      wishlist.splice(action.removal.index, 1);
      return { ...state, wishlist };
    case DealActionTypes.addToWishlistFailure:
      wishlist = [...state.wishlist];
      wishlist.splice(wishlist.indexOf(action.id), 1);
      return {
        ...state,
        wishlistFailureId: action.id,
        wishlist,
        error: action.error.message
      };
    case DealActionTypes.removeFromWishlistFailure:
      const { id, index } = action.removal;
      wishlist = [...state.wishlist];
      wishlist.splice(index, 0, id);
      return {
        ...state,
        wishlistFailureId: -id,
        wishlist,
        error: action.error.message
      };
    case DealActionTypes.wishlistSuccess:
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
