import type Deal from "../../models/Deal";

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
    case Types.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        currentWishlist: action.wishlist,
        previousWishlist: null,
        error: null
      };
    case Types.GET_WISHLIST_FAILURE:
      if (state.currentWishlist) return state;
      return { ...state, error: action.error.message };
    case Types.ADD_TO_WISHLIST_START:
      return {
        ...state,
        currentWishlist: state.currentWishlist.concat(action.deal),
        previousWishlist: state.currentWishlist
      };
    case Types.ADD_TO_WISHLIST_SUCCESS:
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
  | AddToWishlistStartAction;
export type GetWishlistStartAction = {
  type: Types.GET_WISHLIST_START
};
export type GetWishlistSuccessAction = {
  type: Types.GET_WISHLIST_SUCCESS,
  wishlist: Deal[]
};
export type GetWishlistFailureAction = {
  type: Types.GET_WISHLIST_FAILURE,
  error: string
};
export type AddToWishlistStartAction = {
  type: Types.ADD_TO_WISHLIST_START,
  deal: Deal
};
export type AddToWishlistSuccessAction = {
  type: Types.ADD_TO_WISHLIST_SUCCESS
};
