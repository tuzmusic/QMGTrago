// #region IMPORTS
// @flow
import dealsReducer, {
  initialState,
  DealActionTypes as Types
} from "../src/redux/reducers/dealsReducer";
import * as Action from "../src/redux/reducers/dealsReducer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { WishlistUrls } from "../src/constants/constants";
import * as fs from "fs";
import * as path from "path";
import cheerio from "cheerio";
import wishlistSaga, {
  getCurrentWishlist
} from "../src/redux/actions/wishlistActions";
import mockDeals from "../__mocks__/mockDeals";
import Deal from "../src/models/Deal";
import SagaTester from "redux-saga-tester";
import recordSaga from "../recordSaga";
// #endregion

describe("Wishlist redux actions", () => {
  const deal = new Deal(mockDeals[0]);
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    // Set up mock response for getWishlist and addToWishlist
    const path1 = path.resolve(__dirname, "../__mocks__/wishlist-2.html");
    const path2 = path.resolve(__dirname, "../__mocks__/add_to_wishlist.html");
    mock
      .onGet(WishlistUrls.add(deal.id))
      .reply(200, fs.readFileSync(path2).toString(), {
        "content-type": "text/html"
      })
      .onGet(WishlistUrls.get)
      .reply(200, fs.readFileSync(path1).toString());
  });

  describe("helper functions and action creators", () => {
    describe("getCurrentWishlist helper function", () => {
      it("loads the current user's wishlist and returns the ids", async () => {
        expect(await getCurrentWishlist()).toEqual([2094, 2122, 2129]);
      });
    });
  });

  fdescribe("just searching the text", () => {
    it("gets the wishlist ids using regular expressions", async () => {
      expect(await getCurrentWishlist()).toEqual([2094, 2122, 2129]);
    });
  });
});
