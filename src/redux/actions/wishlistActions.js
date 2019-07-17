// @flow
import { WishlistUrls } from "../../constants/constants";
import axios from "axios";
import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Deal from "../../models/Deal";
import type { DealAction } from "../reducers/dealsReducer";

export function* addToWishlistSaga(): Saga<void> {}

export function* removeFromWishlistSaga(): Saga<void> {}

export default function* wishlistSaga(): Saga<void> {
  yield all([
    yield takeEvery("ADD_TO_WISHLIST_START", addToWishlistSaga),
    yield takeEvery("REMOVE_FROM_WISHLIST_START", removeFromWishlistSaga)
  ]);
}
