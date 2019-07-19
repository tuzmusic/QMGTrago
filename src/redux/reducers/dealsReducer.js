// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

export const initialState: DealState = {
  deals: null,
  loadingMessage: "",
  error: null
};

export const DealActionTypes = {
  GET_DEALS_START: "GET_DEALS_START",
  GET_DEALS_SUCCESS: "GET_DEALS_SUCCESS",
  GET_DEALS_FAILURE: "GET_DEALS_FAILURE"
};

const types = DealActionTypes;

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  // if (!action.type.startsWith("@@")) console.log(action.type);
  switch (action.type) {
    case types.GET_DEALS_START:
      return { ...state, loadingMessage: "Loading Deals..." };
    case types.GET_DEALS_SUCCESS:
      return { ...state, deals: action.deals, loadingMessage: "" };
    case types.GET_DEALS_FAILURE:
      return { ...state, error: action.error, loadingMessage: "" };
    default:
      return state;
  }
}

export type DealState = {
  +deals: ?DealCollection,
  +loadingMessage: string,
  +error: ?string
};
export type DealCollection = { [number]: Deal };
export type DealAction =
  | GetDealsStartAction
  | GetDealsSuccessAction
  | GetDealsFailureAction;
export type GetDealsStartAction = { type: "GET_DEALS_START" };
export type GetDealsSuccessAction = {
  type: "GET_DEALS_SUCCESS",
  deals: DealCollection
};
export type GetDealsFailureAction = {
  type: "GET_DEALS_FAILURE",
  error: string
};
