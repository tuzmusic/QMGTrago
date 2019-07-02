import Deal from "../src/models/Deal";
import apiProducts from "../__mocks__/api/products";

describe("Deal", () => {
  describe("Deal.fromApi", () => {
    it("takes an api product and returns a Deal", () => {
      const apiDeal = apiProducts[0];
      const newDeal = Deal.fromApi(apiDeal);
      const expected = expectedDeal();

      for (let key in expected) {
        if (typeof expected[key] === "function") continue;
        expect(expected[key]).toEqual(newDeal[key]);
      }
      // expect(newDeal).toMatchObject(expected);
    });
  });
});

import { setupMockAdapter } from "../__mocks__/axiosMocks";
import axios from "axios";
import { ApiUrls } from "../src/constants/constants";

describe("Deals api mock", () => {
  it("should return the mock deals", async () => {
    setupMockAdapter({ deals: true });
    expect((await axios.get(ApiUrls.getProductsAuthorized)).data).toEqual(
      apiProducts
    );
  });
});

function expectedDeal(): Deal {
  const deal = new Deal();
  deal.id = 566;
  deal.name = "Wines and beers";
  deal.slug = "wines-and-beers";
  deal.permalink = "https://tragodeals.com/product/wines-and-beers/";
  deal.dateCreated = "2019-05-18T17:36:14";
  deal.dateModified = "2019-05-18T17:39:02";
  deal.status = "publish";
  deal.featured = false;
  deal.catalogVisibility = "visible";
  deal.venue = "Pete's Tavern";
  deal.address = "129 E 18th St New York, NY 10003";
  deal.descriptionHTML =
    "<p>Pete's Tavern<br />\n129 E 18th St<br />\nNew York, NY 10003</p>\n<p>Weekdays from 4 p.m. to 7 p.m.<br />\n$5 wines and beers</p>\n";
  deal.shortDescriptionHTML = "<p>$5 wines and beers</p>\n";
  deal.price = 5;
  deal.regularPrice = 11;
  deal.salePrice = 5;
  deal.dateOnSaleFrom = null;
  deal.dateOnSaleTo = null;
  deal.onSale = true;
  deal.purchasable = true;
  deal.relatedIds = [552, 564, 390, 37, 543];
  deal.upsellIds = [53];
  deal.crossSellIds = [34, 31];
  deal.categories = [
    {
      id: 15,
      name: "New York",
      slug: "new-york"
    }
  ];
  deal.tags = [
    {
      id: 58,
      name: "beers",
      slug: "beers"
    },
    {
      id: 54,
      name: "Cocktails",
      slug: "cocktails"
    },
    {
      id: 45,
      name: "drink",
      slug: "drink"
    },
    {
      id: 57,
      name: "wine",
      slug: "wine"
    }
  ];
  deal.images = [
    {
      id: 567,
      date_created: "2019-05-18T17:38:52",
      date_created_gmt: "2019-05-18T17:38:52",
      date_modified: "2019-05-18T17:38:52",
      date_modified_gmt: "2019-05-18T17:38:52",
      src:
        "https://tragodeals.com/wp-content/uploads/2019/05/wine-and-beers2.jpg",
      name: "wine and beers2",
      alt: ""
    }
  ];

  return deal;
}
