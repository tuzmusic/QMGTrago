// @flow
import { ApiUrls } from "../../constants/constants";
import axios from "axios";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Deal from "../../models/Deal";
import type { DealAction, DealCollection } from "../reducers/dealsReducer";

export function getDeals(): DealAction {
  return { type: "GET_DEALS_START" };
}

export async function getDealsApi(): Promise<DealCollection> {
  const res = await axios.get(ApiUrls.getProductsAuthorized);
  const deals: DealCollection = await Deal.collectionFromApiArray(res.data);
  for (const id in deals) {
    const deal = deals[id];
    if (!deal.location && deal.address) await deal.setLocation();
  }
  return deals;
}

export function* getDealsSaga(): Saga<void> {
  try {
    const deals: DealCollection = yield call(getDealsApi);
    yield put({ type: "GET_DEALS_SUCCESS", deals });
  } catch (error) {
    yield put({ type: "GET_DEALS_FAILURE", error });
  }
}

export default function* dealsSaga(): Saga<void> {
  yield all([yield takeEvery("GET_DEALS_START", getDealsSaga)]);
}
