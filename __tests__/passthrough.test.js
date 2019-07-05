import { setupMockAdapter } from "../__mocks__/axiosMocks";
import axios from "axios";
import { ApiUrls } from "../src/constants/constants";

describe("passthrough", () => {
  setupMockAdapter({ deals: true, auth: true });
  it("returns a mocked response when it should", async () => {
    const mockedResponse = await axios.get(ApiUrls.nonce);
    expect(mockedResponse.status).toEqual(200);
  });

  it("lets through everything else", async () => {
    const mockedResponse = await axios.get("https://www.google.com");
    expect(mockedResponse.status).toEqual(200);
  });
});
