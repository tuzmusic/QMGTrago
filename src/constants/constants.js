import { WCKey, WCSecret, GoogleMapsApiKey } from "../../secrets";

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
  mapsSearch: address =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`,
  mapsDetails: placeId =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`
};

export const WishlistUrls = {
  add(id) {
    return baseUrl + "?add_to_wishlist=" + id;
  },
  remove(id) {
    return baseUrl + "?remove_from_wishlist=" + id;
  },
  getWishlist: baseUrl + "wishlist-2"
};

// These don't seem to work...
String.prototype.authorized = () => {
  // debugger;
  return this + wcApiCreds;
};

export const ApiRequests = {
  getProducts: {
    method: "get",
    url: ApiUrls.getProducts,
    params: { consumer_key: WCKey, consumer_secret: WCSecret }
  }
};

export const WcApiRequestParams = {
  params: { consumer_key: WCKey, consumer_secret: WCSecret }
};
