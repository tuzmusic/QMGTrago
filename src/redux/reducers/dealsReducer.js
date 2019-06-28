// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

const initialState: DealState = { deals: mockDeals, loadingMessage: "" };

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  switch (action.type) {
    case "GET_DEALS_START":
      return { ...state, loadingMessage: "Loading Deals..." };
    case "GET_DEALS_SUCCESS":
      return { ...state, deals: action.deals };
    case "GET_DEALS_FAILURE":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

type DealState = { +deals: { [key: number]: Deal }, +loadingMessage: string };
type DealAction =
  | { type: "GET_DEALS_START" }
  | { type: "GET_DEALS_SUCCESS", deals: { [key: number]: Deal } }
  | { type: "GET_DEALS_FAILURE", error: string };
