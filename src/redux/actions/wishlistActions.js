// @flow
import { WishlistUrls } from "../../constants/constants";
import axios from "axios";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Deal from "../../models/Deal";
import User from "../../models/User";
import type { DealAction } from "../reducers/dealsReducer";
import { WishlistActionTypes as Types } from "../reducers/wishlistReducer";
import * as Actions from "../reducers/wishlistReducer";

export function addToWishlist(
  deal: Deal,
  user: User
): Actions.AddToWishlistStartAction {
  return { type: Types.ADD_TO_WISHLIST_START, deal, user };
}

export function removeFromWishlist(
  deal: Deal,
  user: User
): Actions.RemoveFromWishlistStartAction {
  return { type: Types.REMOVE_FROM_WISHLIST_START, deal, user };
}
/* 
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

export async function getCurrentWishlist(user: User): Promise<number[]> {
  const url = WishlistUrls.getWishlist(user);
  const { data } = await axios.get(WishlistUrls.getWishlist(user));
  if (data.includes("No products were added to the wishlist")) return [];
  const tags: string[] = data.match(/data-product_id="(\d+)"/g);
  const idStrings = tags.map(t => t.match(/\d+/));
  const wishlistIds = idStrings.map(n => Number(n));
  return wishlistIds;
}

export function* getWishlistSaga({ user }: { user: User }): Saga<void> {
  try {
    const wishlistIds = yield call(getCurrentWishlist, user);
    yield put({ type: Types.GET_WISHLIST_SUCCESS, wishlistIds });
  } catch (error) {
    console.log("error:", error);
  }
}

export function getWishlist(user: User): Actions.GetWishlistStartAction {
  return { type: Types.GET_WISHLIST_START, user };
}

export default function* wishlistSaga(): Saga<void> {
  yield all([
    yield takeEvery(Types.GET_WISHLIST_START, getWishlistSaga)
    // yield takeEvery(Types.ADD_TO_WISHLIST_START, addToWishlistSaga),
    // yield takeEvery(Types.REMOVE_FROM_WISHLIST_START, removeFromWishlistSaga)
  ]);
}
