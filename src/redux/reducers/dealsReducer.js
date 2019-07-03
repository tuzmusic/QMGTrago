// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

const initialState: DealState = {
  deals: mockDeals,
  deals: {},
  loadingMessage: "",
  error: null
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
    default:
      return state;
  }
}

export type DealState = {
  +deals: DealCollection,
  +loadingMessage: string,
  +error: ?string
};
export type DealCollection = { [number]: Deal };
export type DealAction =
  | { type: "GET_DEALS_START" }
  | { type: "GET_DEALS_SUCCESS", deals: DealCollection }
  | { type: "GET_DEALS_FAILURE", error: string };
