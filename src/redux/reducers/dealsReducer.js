// @flow

const initialState: DealState = { deals: {} };

export default function dealsReducer(
  state: DealState = initialState,
  action: DealAction
): DealState {
  return state;
}

type DealState = { deals: Object };
type DealAction = {
  type: string,
  payload: Object
};
