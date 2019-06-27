// @flow

export default class Deal {
  id: number;
  name: string;
  headline: string;
  fullPrice: number;
  salePrice: number;
  photoUrls: string[];
  description: string; // almost definitely HTML
  address: string;
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
    // this.reviews = obj.reviews
  }

  descriptionWithTextSize(size: number): string {
    return this.descriptionWithStyle(`font-size:${size}`);
  }

  descriptionWithStyle(style: string): string {
    return `<div style="${style}">${this.description}</div>`;
  }

  static fromApi(json: Object): Deal {
    return new Deal(json);
  }

  static toApi(deal: Deal): Object {
    return { ...deal };
  }
}
