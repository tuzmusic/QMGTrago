// @flow
import type { Location } from "../redux/reducers/locationReducer";
type unitOfDistance = "mi" | "km" | "nm";

export default class Deal {
  id: number;
  name: string;
  headline: string;
  fullPrice: number;
  salePrice: number;
  photoUrls: string[];
  description: string; // almost definitely HTML
  address: string;
  location: Location;
  // reviews: Review[]

  constructor(obj: Object) {
    this.id = obj.id;
    this.name = obj.name;
    this.headline = obj.headline;
    this.fullPrice = obj.fullPrice;
    this.salePrice = obj.salePrice;
    this.photoUrls = obj.photoUrls;
    this.description = obj.description;
    this.address = obj.address;
    this.location = obj.location;
    // this.reviews = obj.reviews
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
  ): number => {
    return distanceBetween(this.location, location);
  };

  distanceFrom = (otherDeal: Deal, unit: unitOfDistance = "mi"): number => {
    return distanceBetween(this.location, otherDeal.location);
  };

  static fromApi(json: Object): Deal {
    return new Deal(json);
  }

  static toApi(deal: Deal): Object {
    return { ...deal };
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
