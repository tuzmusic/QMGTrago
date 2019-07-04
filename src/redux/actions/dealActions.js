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
    console.log("2. API got", res.data.length, "deals (from getDealsApi)");
    const deals = await Deal.collectionFromArray(res.data);
    console.log(
      "3. converted",
      Object.keys(deals).length,
      "deals with Deal.fromApi (from getDealsApi)"
    );
    return deals;
    // return res.data;
  } catch (error) {
    console.warn("get products failed. is axios mock adapter running?");
    return error;
  }
}

export function* getDealsSaga(): Saga<void> {
  try {
    // const rawDeals: Object[] = yield call(getDealsApi);

    // console.log(
    //   "3. converting",
    //   rawDeals.length,
    //   "deals with Deal.fromApi (from getDealsSaga)"
    // );
    // const deals: DealCollection = yield call(
    //   Deal.collectionFromArray,
    //   rawDeals
    // );
    // console.log(
    //   "4. dispatching",
    //   Object.keys(deals).length,
    //   "deals (from getDealsSaga)"
    // );
    console.log("1. calling API (from getDealsSaga)");

    const deals: DealCollection = yield call(getDealsApi);
    console.log(
      "4. dispatching",
      Object.keys(deals).length,
      "deals (from getDealsSaga)"
    );
    yield put({ type: "GET_DEALS_SUCCESS", deals });
  } catch (error) {
    console.warn("getDealsSaga", "error:", error);
    yield put({ type: "GET_DEALS_FAILURE", error });
  }
}

export default function* dealsSaga(): Saga<void> {
  yield all([yield takeEvery("GET_DEALS_START", getDealsSaga)]);
}
