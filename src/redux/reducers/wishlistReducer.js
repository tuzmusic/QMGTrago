// @flow
import type Deal from "../../models/Deal";
import type { DealCollection } from "./dealsReducer";
import User from "../../models/User";
export const WishlistActionTypes = {
  ADD_TO_WISHLIST_START: "ADD_TO_WISHLIST_START",
  ADD_TO_WISHLIST_SUCCESS: "ADD_TO_WISHLIST_SUCCESS",
  ADD_TO_WISHLIST_FAILURE: "ADD_TO_WISHLIST_FAILURE",
  REMOVE_FROM_WISHLIST_START: "REMOVE_FROM_WISHLIST_START",
  REMOVE_FROM_WISHLIST_SUCCESS: "REMOVE_FROM_WISHLIST_SUCCESS",
  REMOVE_FROM_WISHLIST_FAILURE: "REMOVE_FROM_WISHLIST_FAILURE",
  GET_WISHLIST_START: "GET_WISHLIST_START",
  GET_WISHLIST_SUCCESS: "GET_WISHLIST_SUCCESS",
  GET_WISHLIST_FAILURE: "GET_WISHLIST_FAILURE"
};

export type WishlistState = {
  +deals: ?DealCollection,
  +previousWishlist: ?(Deal[]),
  +currentWishlist: ?(Deal[]),
  +error: ?string
};

export const initialState: WishlistState = {
  deals: null,
  previousWishlist: null,
  currentWishlist: null,
  error: null
};

export default function wishlistReducer(
  state: WishlistState = initialState,
  action: WishlistAction
): WishlistState {
  // if (!action.type.startsWith("@@")) console.log(action.type);

  switch (action.type) {
    case "GET_DEALS_SUCCESS":
      return { ...state, deals: action.deals };
    case types.GET_WISHLIST_SUCCESS:
      // console.log(action);
      const currentWishlist: Deal[] = !state.deals
        ? []
        : action.wishlistIds.map(d => state.deals[d]);
      return {
        ...state,
        currentWishlist,
        previousWishlist: null,
        error: null
      };
    case types.GET_WISHLIST_FAILURE:
      if (state.currentWishlist) return state;
      return { ...state, error: action.error.message };
    case types.ADD_TO_WISHLIST_START:
      if (!state.currentWishlist) return state;
      return {
        ...state,
        currentWishlist: state.currentWishlist.concat(action.deal),
        previousWishlist: state.currentWishlist
      };
    case types.ADD_TO_WISHLIST_SUCCESS:
    case types.REMOVE_FROM_WISHLIST_SUCCESS:
      return { ...state, previousWishlist: null };
    case types.ADD_TO_WISHLIST_FAILURE:
    case types.REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        currentWishlist: state.previousWishlist,
        previousWishlist: null,
        error: action.error.message
      };
    case types.REMOVE_FROM_WISHLIST_START:
      if (!state.currentWishlist) return state;
      const wishlist = [...state.currentWishlist];
      wishlist.splice(wishlist.indexOf(action.deal), 1);
      return {
        ...state,
        currentWishlist: wishlist,
        previousWishlist: state.currentWishlist
      };

    default:
      return state;
  }
}
const types = WishlistActionTypes;
export type WishlistAction =
  | GetWishlistStartAction
  | GetWishlistSuccessAction
  | GetWishlistFailureAction
  | AddToWishlistStartAction
  | AddToWishlistSuccessAction
  | AddToWishlistFailureAction
  | RemoveFromWishlistStartAction
  | RemoveFromWishlistSuccessAction
  | RemoveFromWishlistFailureAction
  | UserSuccessAction
  | { type: "GET_DEALS_SUCCESS", deals: DealCollection };

export type GetWishlistStartAction = {
  type: "GET_WISHLIST_START",
  user: User
};
export type GetWishlistSuccessAction = {
  type: "GET_WISHLIST_SUCCESS",
  wishlistIds: number[]
};
export type GetWishlistFailureAction = {
  type: "GET_WISHLIST_FAILURE",
  error: Error
};
export type AddToWishlistStartAction = {
  type: "ADD_TO_WISHLIST_START",
  deal: Deal,
  user: User
};
export type AddToWishlistSuccessAction = {
  type: "ADD_TO_WISHLIST_SUCCESS"
};
export type AddToWishlistFailureAction = {
  type: "ADD_TO_WISHLIST_FAILURE",
  error: Error
};
export type RemoveFromWishlistStartAction = {
  type: "REMOVE_FROM_WISHLIST_START",
  deal: Deal,
  user: User
};
export type RemoveFromWishlistSuccessAction = {
  type: "REMOVE_FROM_WISHLIST_SUCCESS"
};
export type RemoveFromWishlistFailureAction = {
  type: "REMOVE_FROM_WISHLIST_FAILURE",
  error: Error
};
export type UserSuccessAction = {
  type: "LOGIN_SUCCESS" | "REGISTRATION_SUCCESS" | "SET_USER",
  user: User
};
