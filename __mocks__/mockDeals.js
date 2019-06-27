// @flow
import Deal from "../src/models/Deal";

const deals: Object[] = [
  {
    id: 1,
    name: "Wine and Beers",
    headline: "$5 wines and beers",
    fullPrice: 11,
    salePrice: 5,
    description:
      "<p>Pete's Tavern<br />129 E 18th St<br />New York, NY 10003</p><p>Weekdays from 4 p.m. to 7 p.m.<br />$5 wines and beers</p>"
  },
  {
    id: 2,
    name: "Sangria and Wine",
    headline: "$7 sangria and wine, $4.50 beer",
    fullPrice: 15,
    salePrice: 7,
    description:
      "<p>Lamano<br />265 W 20th St<br />New York, NY 10011</p><p>4 p.m. to 6:30 p.m.<br />$7 sangria and wine<br />$4.50 beer</p>"
  },
  {
    id: 3,
    name: "Arigato Set",
    headline: "$10 arigato set",
    fullPrice: 20,
    salePrice: 10,
    description:
      "<p>Wokuni<br />327 Lexington Ave<br />New York, NY 10016</p><p>5 p.m. to 7 p.m.<br />$10 arigato set</p>"
  }
];

const realDeals: { [key: number]: Deal } = {};
deals.forEach(d => {
  realDeals[d.id] = new Deal(d);
});

export default realDeals;
