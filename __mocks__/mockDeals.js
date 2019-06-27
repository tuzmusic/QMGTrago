const deals = [
  {
    id: 1,
    name: "Cheap beer",
    headline: "Get drunk for cheap",
    fullPrice: 10,
    salePrice: 5,
    description: "123 Main St. New York, NY."
  },
  {
    id: 2,
    name: "Cheap wine",
    headline: "Get wine drunk for cheap",
    fullPrice: 20,
    salePrice: 15,
    description: "123 Alfred St. New York, NY."
  },
  {
    id: 3,
    name: "Cheap shots",
    headline: "Get way too drunk for cheap",
    fullPrice: 100,
    salePrice: 50,
    description: "123 Tequila St. New York, NY."
  }
];

const realDeals = {};
deals.forEach(d => {
  realDeals[d.id] = new Deal(d);
});

export default realDeals;
