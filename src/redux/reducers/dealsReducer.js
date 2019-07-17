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

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  let wishlist; // local wishlist for manipulation
  switch (action.type) {
    case "GET_DEALS_START":
      return { ...state, loadingMessage: "Loading Deals..." };
    case "GET_DEALS_SUCCESS":
      return { ...state, deals: action.deals, loadingMessage: "" };
    case "GET_DEALS_FAILURE":
      return { ...state, error: action.error, loadingMessage: "" };
    case "ADD_TO_WISHLIST_START":
      return { ...state, wishlist: state.wishlist.concat(action.id) };
    case "REMOVE_FROM_WISHLIST_START":
      wishlist = [...state.wishlist];
      wishlist.splice(action.removal.index, 1);
      return { ...state, wishlist };
    case "ADD_TO_WISHLIST_FAILURE":
      wishlist = [...state.wishlist];
      wishlist.splice(wishlist.indexOf(action.id), 1);
      return { ...state, wishlistFailureId: action.id, wishlist };
    case "REMOVE_FROM_WISHLIST_FAILURE":
      const { id, index } = action.removal;
      wishlist = [...state.wishlist];
      wishlist.splice(index, 0, id);
      return { ...state, wishlistFailureId: -id, wishlist };
    case "WISHLIST_SUCCESS":
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
  | { type: "ADD_TO_WISHLIST_START", id: number }
  | {
      type: "REMOVE_FROM_WISHLIST_START",
      removal: { id: number, index: number }
    }
  | { type: "ADD_TO_WISHLIST_FAILURE", id: number }
  | {
      type: "REMOVE_FROM_WISHLIST_FAILURE",
      removal: { id: number, index: number }
    }
  | { type: "GET_DEALS_START" | "WISHLIST_SUCCESS" }
  | { type: "GET_DEALS_SUCCESS", deals: DealCollection }
  | { type: "GET_DEALS_FAILURE", error: string };
