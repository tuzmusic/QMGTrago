// @flow
import { WCKey, WCSecret, GoogleMapsApiKey } from "../../secrets";
import type Deal from "../models/Deal";
import type User from "../models/User";
export const baseUrl = "https://tragodeals.com/";
export const wcSlug = "wp-json/wc/v3/";
export const apiSlug = "2J73N8Bn8N5Yw8V/";
const wcApiCreds = "?consumer_key=" + WCKey + "&consumer_secret=" + WCSecret;

export const ApiUrls = {
  login: baseUrl + apiSlug + "user/generate_auth_cookie/",
  nonce: baseUrl + apiSlug + "get_nonce/?controller=user&method=register",
  register: baseUrl + apiSlug + "user/register",
  logout: baseUrl + "wp-json/auth/logout",
  getProducts: baseUrl + wcSlug + "products", // + wcApiCreds
  getProductsAuthorized: baseUrl + wcSlug + "products" + wcApiCreds,
  mapsSearch: (address: string) =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`,
  mapsDetails: (placeId: string) =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`
};

export const WishlistUrls = {
  add(deal: Deal, user: User) {
    // return baseUrl + "?add_to_wishlist=" + id;
    return `${baseUrl}?add_to_wishlist=${deal.id}&user_id=${user.id}`;
  },
  remove(deal: Deal, user: User) {
    return `${baseUrl}?remove_from_wishlist=${deal.id}&user_id=${user.id}`;
  },
  getWishlist(user: User) {
    return `${baseUrl}wishlist-2/?user_id=${user.id}`;
  }
};
