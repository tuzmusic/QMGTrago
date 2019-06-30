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
  getProductsAuthorized: baseUrl + wcSlug + "products" + wcApiCreds
};

String.prototype.authorized = () => {
  // debugger;
  return this + wcApiCreds;
};

import { WCKey, WCSecret } from "../../secrets";
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
