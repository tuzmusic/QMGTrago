// #region IMPORTS
// @flow
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { WishlistUrls } from "../src/constants/constants";
import * as fs from "fs";
import * as path from "path";
import { getCurrentWishlist } from "../src/redux/actions/wishlistActions";
import mockDeals from "../__mocks__/mockDeals";
import Deal from "../src/models/Deal";
import User from "../src/models/User";
// #endregion

describe("Wishlist redux actions", () => {
  const deal = new Deal(mockDeals[0]);
  const mock = new MockAdapter(axios);
  const user = new User({
    id: 1,
    firstName: "asdf",
    lastName: "asdf",
    dateCreated: Date.now(),
    username: "asdf",
    email: "asdf@sdjkl.com"
  });

  beforeEach(() => {
    // Set up mock response for getWishlist and addToWishlist
    const path1 = path.resolve(__dirname, "../__mocks__/wishlist-2.html");
    const path2 = path.resolve(__dirname, "../__mocks__/add_to_wishlist.html");
    mock
      // .onGet(WishlistUrls.add(deal.id))
      // .reply(200, fs.readFileSync(path2).toString(), {
      //   "content-type": "text/html"
      // })
      .onGet(WishlistUrls.getWishlist(user))
      .reply(200, fs.readFileSync(path1).toString());
  });

  describe("helper functions and action creators", () => {
    fdescribe("just searching the text", () => {
      it("gets the wishlist ids using regular expressions", async () => {
        expect(await getCurrentWishlist(user)).toEqual([2094, 2122, 2129]);
      });
    });
  });
});
