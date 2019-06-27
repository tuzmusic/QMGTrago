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
      "<p>Pete's Tavern<br />129 E 18th St<br />New York, NY 10003</p><p>Weekdays from 4 p.m. to 7 p.m.<br />$5 wines and beers</p>",
    address: "129 E 18th St, New York, NY 10003",
    location: { latitude: 40.7364959, longitude: -73.9866989 },
    photoUrls: [
      "/Users/TuzMacbookPro2017/Development/QMG-local/APPS/QMGTrago/assets/wine-and-beers2.jpg"
    ]
  },
  {
    id: 2,
    name: "Sangria and Wine",
    headline: "$7 sangria and wine, $4.50 beer",
    fullPrice: 15,
    salePrice: 7,
    description:
      "<p>Lamano<br />265 W 20th St<br />New York, NY 10011</p><p>4 p.m. to 6:30 p.m.<br />$7 sangria and wine<br />$4.50 beer</p>",
    address: "265 W 20th St, New York, NY 10011",
    location: { latitude: 40.7433797, longitude: -73.9994258 },
    photoUrls: [
      "/Users/TuzMacbookPro2017/Development/QMG-local/APPS/QMGTrago/assets/sangria-and-wine2.jpg"
    ]
  },
  {
    id: 3,
    name: "Arigato Set",
    headline: "$10 arigato set",
    fullPrice: 20,
    salePrice: 10,
    description:
      "<p>Wokuni<br />327 Lexington Ave<br />New York, NY 10016</p><p>5 p.m. to 7 p.m.<br />$10 arigato set</p>",
    address: "327 Lexington Ave, New York, NY 10016",
    location: { latitude: 40.7492189, longitude: -73.9773529 },
    photoUrls: [
      "/Users/TuzMacbookPro2017/Development/QMG-local/APPS/QMGTrago/assets/wokuni-arigato-set2.jpg"
    ]
  }
];

const realDeals: { [key: number]: Deal } = {};
deals.forEach(d => {
  realDeals[d.id] = new Deal(d);
});

export default realDeals;
