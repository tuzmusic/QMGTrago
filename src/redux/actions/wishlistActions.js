// @flow
import { WishlistUrls } from "../../constants/constants";
import axios from "axios";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Deal from "../../models/Deal";
import type { DealAction } from "../reducers/dealsReducer";
import cheerio from "cheerio";
import { WishlistActionTypes as Types } from "../reducers/wishlistReducer";
import * as Actions from "../reducers/wishlistReducer";

/* export function addToWishlist(deal: Deal): DealAction {
  return {
    type: "ADD_TO_WISHLIST_START",
    id: deal.id
  };
}

export function removeFromWishlist(deal: Deal, wishlist: number[]): DealAction {
  return {
    type: "REMOVE_FROM_WISHLIST_START",
    removal: { id: deal.id, index: wishlist.indexOf(deal.id) }
  };
}

export async function addToWishlistApi(id: number) {
  try {
    const res = await axios.get(WishlistUrls.add(id));
  } catch (error) {
    const err = error;
    // debugger;
  }
}

export function* addToWishlistSaga({ id }: { id: number }): Saga<void> {
  try {
    // console.log("addToWishlistSaga HELLO CAN ANYBODY HEAR ME");
    const res = yield call(addToWishlistApi, id);
    // console.log(res); // don't actually need this response

    const wishlist = yield call(getCurrentWishlist);
    console.log("WISHLIST", wishlist);

    if (wishlist.contains(id)) {
      yield put({ type: DealActionTypes.WISHLIST_SUCCESS });
    } else {
      yield put({ type: DealActionTypes.ADD_TO_WISHLIST_FAILURE, id });
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

export function* removeFromWishlistSaga(): Saga<void> {} */

export async function getCurrentWishlist(): Promise<number[]> {
  console.log("hello from getCurrent");

  const res = await axios.get(WishlistUrls.getWishlist);
  // console.log(res.data.includes("WISHLIST-2.HTML"));

  const $ = cheerio.load(res.data); // problem is here
  const tags = $(".button.yith-wcqv-button");
  const idStrings: string[] = [];
  tags.each((i, tag) => {
    idStrings.push(tag.attribs["data-product_id"]);
  });
  const wishlist = idStrings.map(n => Number(n));
  return wishlist;
}

export function* getWishlistSaga(): Saga<void> {
  try {
    const wishlist = yield call(getCurrentWishlist);
  } catch (error) {
    console.log("error:", error);
  }
}

export function getWishlist(): Actions.GetWishlistStartAction {
  return { type: Types.GET_WISHLIST_START };
}

export default function* wishlistSaga(): Saga<void> {
  yield all([
    yield takeEvery(Types.GET_WISHLIST_START, getWishlistSaga)
    // yield takeEvery(Types.ADD_TO_WISHLIST_START, addToWishlistSaga),
    // yield takeEvery(Types.REMOVE_FROM_WISHLIST_START, removeFromWishlistSaga)
  ]);
}
