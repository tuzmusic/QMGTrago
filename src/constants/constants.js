export const baseUrl = "https://www.tragodeals.com/";
export const apiSlug = "2J73N8Bn8N5Yw8V/";
export const ApiUrls = {
  login: baseUrl + apiSlug + "user/generate_auth_cookie/",
  nonce: baseUrl + apiSlug + "get_nonce/?controller=user&method=register",
  register: baseUrl + apiSlug + "user/register",
  logout: baseUrl + "wp-json/auth/logout"
};
