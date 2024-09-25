import { Model } from "mongoose";

export type IDala = {
  title: string;
  images: [string];
  dalaCode: Number;
  items: string[];
  details: Array<object>;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number | string;
  deleted: boolean;
};

export type DalaModel = Model<IDala, Record<string, unknown>>;