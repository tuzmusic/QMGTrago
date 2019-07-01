import { ApiUrls } from "../../constants/constants";
import axios from "axios";

export async function getProductsApi() {
  // debugger;
  try {
    const products = await axios.get(ApiUrls.getProductsAuthorized);
    // console.log(products);
  } catch (error) {
    console.warn("get products failed. is axios mock adapter running?");
    // console.log(error);
  }
}
