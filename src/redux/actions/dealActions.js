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

export async function getDealsApi(): Promise<Object[] | Error> {
  try {
    const res = await axios.get(ApiUrls.getProductsAuthorized);
    return res.data;
  } catch (error) {
    console.warn("get products failed. is axios mock adapter running?");
    return error;
  }
}

export function* getDealsSaga(): Saga<void> {
  try {
    const rawDeals: Object[] = yield call(getDealsApi);
    const deals: DealCollection = Deal.collectionFromArray(rawDeals);
    console.log("getDealsSaga", Object.keys(deals).length, "deals");
    yield put({ type: "GET_DEALS_SUCCESS", deals });
  } catch (error) {
    console.log("getDealsSaga", "error:", error);
    yield put({ type: "GET_DEALS_FAILURE", error });
  }
}

export default function* dealsSaga(): Saga<void> {
  yield all([yield takeEvery("GET_DEALS_START", getDealsSaga)]);
}
