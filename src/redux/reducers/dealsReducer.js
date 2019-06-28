// @flow
import mockDeals from "../../../__mocks__/mockDeals";
import type Deal from "../../models/Deal";

const initialState: DealState = { deals: mockDeals, loadingMessage: "" };

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  return state;
}

type DealState = { +deals: { [key: number]: Deal }, +loadingMessage: string };
type DealAction = {
  type: string,
  payload: Object
};
