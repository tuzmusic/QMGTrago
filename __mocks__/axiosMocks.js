import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiUrls } from "../src/constants/constants";
import {
  loginResponse,
  registerResponse,
  registration
} from "./auth/authResponses";
import mockProducts from "./api/products";

export function setupMockAdapter({ deals = false, auth = false }) {
  let mock = new MockAdapter(axios, { delayResponse: 2000 });
  if (deals) setupDealsMockAdapter(mock);
  if (auth) setupAuthMockAdapter(mock);
}

export function setupDealsMockAdapter(mock) {
  mock.onGet(ApiUrls.getProductsAuthorized).reply(200, mockProducts);
}

export function setupAuthMockAdapter(mock) {
  mock
    // register
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, {
      params: {
        username: "testuser1",
        email: "api1@trago.com",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.success)
    .onGet(ApiUrls.register, {
      // params: registration.badUserApiParams
      params: {
        username: "testuser1dupe",
        email: "api1@trago.com",
        nonce: "29a63be176",
        display_name: "testuser1dupe",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.usernameTaken)
    .onGet(ApiUrls.register, {
      // params: registration.badEmailApiParams
      params: {
        username: "testuser1",
        email: "api1@trago.comdupe",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.emailTaken)
    // login
    .onGet(ApiUrls.login, {
      params: {
        username: "testuser1",
        password: "123123"
      }
    })
    .reply(200, loginResponse.apiResponse)
    .onGet(ApiUrls.login, {
      params: {
        email: "testuser@trago.com",
        password: "123123"
      }
    })
    .reply(200, loginResponse.apiResponse)
    .onGet(ApiUrls.login)
    .reply(200, loginResponse.failure)
    // logout
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout)
    .onAny()
    .passThrough();
  return mock;
}
