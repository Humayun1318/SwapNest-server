import { Types } from "mongoose";
export type TWishlistItem = {
  user: Types.ObjectId;
  listing: Types.ObjectId;
};

export type TWishlistItemPopulated = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  listing: {
    _id: string;
    name: string;
    price: number;
  };
};
