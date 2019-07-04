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
  const res = await axios.get(ApiUrls.getProductsAuthorized);
  console.log("2. API got", res.data.length, "deals (from getDealsApi)");

  // Simply convert all objects to Deals
  const deals = await Deal.collectionFromApiArray(res.data);
  const count = Object.keys(deals).length;
  console.log("3. converted", count, "deals (from getDealsApi)");

  // Get locations for each deal if needed
  for (const id in deals) {
    const deal = deals[id];
    if (!deal.location && deal.address) {
      deal.location = await Deal.getLocationForAddress(deal.address);
      console.log(
        `lat: ${deal.location.latitude}, long: ${deal.location.longitude}`
      );
    }
  }

  return deals;
  // return res.data;
}

export function* getDealsSaga(): Saga<void> {
  try {
    console.log("1. calling API (from getDealsSaga)");
    const deals: DealCollection = yield call(getDealsApi);
    const count = Object.keys(deals).length;
    console.log("4. dispatching", count, "deals (from getDealsSaga)");
    yield put({ type: "GET_DEALS_SUCCESS", deals });
  } catch (error) {
    console.warn("getDealsSaga", "error:", error);
    yield put({ type: "GET_DEALS_FAILURE", error });
  }
}

export default function* dealsSaga(): Saga<void> {
  yield all([yield takeEvery("GET_DEALS_START", getDealsSaga)]);
}
