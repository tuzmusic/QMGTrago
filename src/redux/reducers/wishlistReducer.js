import type Deal from "../../models/Deal";

export const WishlistActionTypes = {
  addToWishlistStart: "ADD_TO_WISHLIST_START",
  removeFromWishlistStart: "REMOVE_FROM_WISHLIST_START",
  addToWishlistFailure: "ADD_TO_WISHLIST_FAILURE",
  removeFromWishlistFailure: "REMOVE_FROM_WISHLIST_FAILURE",
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
  { error, wishlist, ...action }: WishlistAction
): WishlistState {
  // if (!action.type.startsWith("@@")) console.log(action.type);

  switch (action.type) {
    case WishlistActionTypes.getWishlistSuccess:
      return {
        ...state,
        currentWishlist: wishlist,
        previousWishlist: null,
        error: null
      };
    case WishlistActionTypes.getWishlistFailure:
      if (state.currentWishlist) return state;
      return { ...state, error: error.message };
    default:
      return state;
  }
}

export type WishlistAction =
  | GetWishlistSuccessAction
  | GetWishlistFailureAction;

export type GetWishlistSuccessAction = {
  type: WishlistActionTypes.getWishlistSuccess,
  wishlist: Deal[]
};
export type GetWishlistFailureAction = {
  type: WishlistActionTypes.getWishlistFailure,
  error: string
};
