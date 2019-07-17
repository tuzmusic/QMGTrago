// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

const initialState: DealState = {
  deals: mockDeals,
  deals: {},
  loadingMessage: "",
  error: null,
  wishlist: []
};

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
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
      const wishlist = state.wishlist;
      wishlist.splice(wishlist.indexOf(action.id), 1);
      return { ...state, wishlist };
    default:
      return state;
  }
}

export type DealState = {
  +deals: DealCollection,
  +wishlist: number[],
  +loadingMessage: string,
  +error: ?string
};
export type DealCollection = { [number]: Deal };
export type DealAction =
  | { type: "ADD_TO_WISHLIST_START", id: number }
  | { type: "REMOVE_FROM_WISHLIST_START", id: number }
  | { type: "GET_DEALS_START" }
  | { type: "GET_DEALS_SUCCESS", deals: DealCollection }
  | { type: "GET_DEALS_FAILURE", error: string };
