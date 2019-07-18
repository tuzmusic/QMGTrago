import type Deal from "../../models/Deal";

export const WishlistActionTypes = {
  addToWishlistStart: "ADD_TO_WISHLIST_START",
  addToWishlistSuccess: "ADD_TO_WISHLIST_SUCCESS",
  addToWishlistFailure: "ADD_TO_WISHLIST_FAILURE",
  removeFromWishlistStart: "REMOVE_FROM_WISHLIST_START",
  removeFromWishlistSuccess: "REMOVE_FROM_WISHLIST_SUCCESS",
  removeFromWishlistFailure: "REMOVE_FROM_WISHLIST_FAILURE",
  getWishlistStart: "GET_WISHLIST_START",
  getWishlistSuccess: "GET_WISHLIST_SUCCESS",
  getWishlistFailure: "GET_WISHLIST_FAILURE"
};

export type WishlistState = {
  previousWishlist: ?(Deal[]),
  currentWishlist: ?(Deal[]),
  error: ?string
};

export const initialState: WishlistState = {
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
    case Types.getWishlistSuccess:
      return {
        ...state,
        currentWishlist: action.wishlist,
        previousWishlist: null,
        error: null
      };
    case Types.getWishlistFailure:
      if (state.currentWishlist) return state;
      return { ...state, error: action.error.message };
    case Types.addToWishlistStart:
      return {
        ...state,
        currentWishlist: state.currentWishlist.concat(action.deal),
        previousWishlist: state.currentWishlist
      };
    case Types.addToWishlistSuccess:
      return { ...state, previousWishlist: null };
    default:
      return state;
  }
}
const Types = WishlistActionTypes;
export type WishlistAction =
  | GetWishlistStartAction
  | GetWishlistSuccessAction
  | GetWishlistFailureAction
  | AddWishlistStartAction;
export type GetWishlistStartAction = {
  type: Types.getWishlistStart
};
export type GetWishlistSuccessAction = {
  type: Types.getWishlistSuccess,
  wishlist: Deal[]
};
export type GetWishlistFailureAction = {
  type: Types.getWishlistFailure,
  error: string
};
export type AddWishlistStartAction = {
  type: Types.addToWishlistStart,
  deal: Deal
};
export type AddWishlistSuccessAction = {
  type: Types.addToWishlistSuccess
};
