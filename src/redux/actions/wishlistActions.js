// @flow
import { WishlistUrls } from "../../constants/constants";
import axios from "axios";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Deal from "../../models/Deal";
import type { DealAction } from "../reducers/dealsReducer";
import cheerio from "cheerio";

export function addToWishlist(deal: Deal): DealAction {
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

export function* addToWishlistSaga(): Saga<void> {}

export function* removeFromWishlistSaga(): Saga<void> {}

export async function getCurrentWishlist(): Promise<number[]> {
  const res = await axios(WishlistUrls.get);
  const $ = cheerio.load(res.data);
  const tags = $(".button.yith-wcqv-button");
  const idStrings: string[] = [];
  tags.each((i, tag) => {
    idStrings.push(tag.attribs["data-product_id"]);
  });
  return idStrings.map(n => Number(n));
}

export default function* wishlistSaga(): Saga<void> {
  yield all([
    yield takeEvery("ADD_TO_WISHLIST_START", addToWishlistSaga),
    yield takeEvery("REMOVE_FROM_WISHLIST_START", removeFromWishlistSaga)
  ]);
}
