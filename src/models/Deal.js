// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type { DealCollection } from "../redux/reducers/dealsReducer";
import { GoogleMapsApiKey } from "../../secrets";
import { ApiUrls } from "../constants/constants";
import he from "he";

type unitOfDistance = "mi" | "km" | "nm";
type Info = { id: number, name: string, slug: string };
type ImageInfo = {
  id: number,
  date_created: string,
  date_created_gmt: string,
  date_modified: string,
  date_modified_gmt: string,
  src: string,
  name: string,
  alt: string
};

export default class Deal {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  headline: string;
  fullPrice: number;
  salePrice: number;
  photoUrls: string[];
  description: string;
  shortDescription: string;
  venue: string;
  address: string;
  location: ?Location;
  // reviews: Review[]

  dateCreated: string;
  dateModified: string;
  status: string;
  featured: boolean;
  catalogVisibility: string;
  descriptionHTML: string;
  shortDescriptionHTML: string;
  price: number;
  regularPrice: number;
  salePrice: number;
  price$: string;
  regularPrice$: string;
  salePrice$: string;
  dateOnSaleFrom: null;
  dateOnSaleTo: null;
  onSale: boolean;
  purchasable: boolean;
  relatedIds: number[];
  upsellIds: number[];
  crossSellIds: number[];
  categories: Info[];
  tags: Info[];
  images: {
    id: number,
    date_created: string,
    date_created_gmt: string,
    date_modified: string,
    date_modified_gmt: string,
    src: string,
    name: string,
    alt: string
  }[];

  constructor(obj?: Object) {
    if (!obj) return;
    // console.log(obj);

    // console.log("id", obj.id);
    this.id = obj.id;
    this.name = obj.name;
    this.headline = obj.headline;
    this.fullPrice = obj.fullPrice;
    this.salePrice = obj.salePrice;
    this.photoUrls = obj.photoUrls;
    this.description = obj.description;
    this.address = obj.address;
    this.location = obj.location;
    // this.reviews = obj.reviews;
  }

  static fromApi(obj: Object): Deal {
    const deal = new Deal();
    deal.id = obj.id;
    deal.name = obj.name;
    deal.slug = obj.slug;
    deal.permalink = obj.permalink;
    deal.dateCreated = obj.date_created;
    deal.dateModified = obj.date_modified;
    deal.status = obj.status;
    deal.featured = obj.featured;
    deal.catalogVisibility = obj.catalog_visibility;
    deal.venue = obj.venue_fake_api;
    deal.address = obj.address_fake_api;
    deal.descriptionHTML = obj.description;
    deal.shortDescriptionHTML = obj.short_description;
    deal.shortDescription = he.decode(
      obj.short_description.replace(/<[^>]*>?/gm, "").trim()
    );
    deal.price = Number(obj.price);
    deal.regularPrice = Number(obj.regular_price);
    deal.salePrice = Number(obj.sale_price);
    deal.price$ = `$${deal.price.toFixed(2)}`;
    deal.regularPrice$ = `$${deal.regularPrice.toFixed(2)}`;
    deal.salePrice$ = `$${deal.salePrice.toFixed(2)}`;
    deal.dateOnSaleFrom = obj.date_on_sale_from;
    deal.dateOnSaleTo = obj.date_on_sale_to;
    deal.onSale = obj.on_sale;
    deal.purchasable = obj.purchasable;
    deal.relatedIds = obj.related_ids;
    deal.upsellIds = obj.upsell_ids;
    deal.crossSellIds = obj.cross_sell_ids;
    deal.categories = obj.categories;
    deal.tags = obj.tags;
    deal.images = obj.images;

    deal.address = obj.meta_data
      .find(o => {
        return o.key === "unit_product";
      })
      .value.trim();

    return deal;
  }

  async setLocation() {
    this.location = await Deal.getLocationForAddress(this.address);
  }

  static async getLocationForAddress(address: string): Promise<?Location> {
    try {
      const search = await fetch(ApiUrls.mapsSearch(address));
      const { predictions, ...searchData } = await search.json();
      if (searchData.error_message) throw Error(searchData.error_message);
      if (!predictions.length) throw Error("No places found for " + address);
      const details = await fetch(ApiUrls.mapsDetails(predictions[0].place_id));
      const { result, ...detailsData } = await details.json();
      if (detailsData.error_message) throw Error(searchData.error_message);
      const location = result.geometry.location;

      return {
        latitude: location.lat,
        longitude: location.lng
      };
    } catch (error) {
      console.log("Error getting location for address in deal:", error);
    }
  }

  descriptionWithTextSize(size: number): string {
    return this.descriptionWithStyle(`font-size:${size}`);
  }

  descriptionWithStyle(style: string): string {
    return `<div style="${style}">${this.description}</div>`;
  }

  distanceFromLocation = (
    location: Location,
    unit: unitOfDistance = "mi"
  ): ?number => {
    if (this.location) return distanceBetween(this.location, location);
  };

  distanceFrom = (otherDeal: Deal, unit: unitOfDistance = "mi"): ?number => {
    if (this.location && otherDeal.location)
      return distanceBetween(this.location, otherDeal.location);
  };

  static toApi(deal: Deal): Object {
    return { ...deal };
  }

  static collectionFromApiArray(array: Object[]) {
    const deals: DealCollection = {};
    array.forEach(p => (deals[p.id] = Deal.fromApi(p)));
    return deals;
  }
}

export function distanceBetween(
  location1: Location,
  location2: Location,
  unit: unitOfDistance = "mi"
): number {
  if (
    location1.latitude == location2.latitude &&
    location1.longitude == location2.longitude
  ) {
    return 0;
  } else {
    var radlat1 = (Math.PI * location1.latitude) / 180;
    var radlat2 = (Math.PI * location2.latitude) / 180;
    var theta = location1.longitude - location2.longitude;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "km") {
      dist = dist * 1.609344;
    }
    if (unit == "nm") {
      dist = dist * 0.8684;
    }
    return Number(dist.toFixed(2));
  }
}
