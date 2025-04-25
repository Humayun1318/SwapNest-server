import { model, Schema } from "mongoose";
import { TWishlistItem } from "./wishlist.interface";

const wishlistSchema = new Schema<TWishlistItem>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Wishlist = model<TWishlistItem>("Wishlist", wishlistSchema);
