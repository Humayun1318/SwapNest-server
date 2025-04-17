import { model, Schema } from "mongoose";
import {
  IListing,
  ListingCategory,
  ListingCondition,
  ListingLocation,
  ListingStatus,
} from "./listing.interface";

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    condition: {
      type: String,
      enum: {
        values: Object.values(ListingCondition),
        message: "Condition must be one of: excellent, good, fair, poor",
      },
      required: [true, "Condition is required"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(ListingStatus),
        message: "Status must be one of: available, sold",
      },
      default: ListingStatus.AVAILABLE,
    },
    category: {
      type: String,
      enum: Object.values(ListingCategory),
      required: [true, "Category is required"],
    },
    customCategory: { type: String },
    location: {
      type: String,
      enum: Object.values(ListingLocation),
      required: [true, "Location is required"],
    },
    customLocation: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

listingSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Listing = model<IListing>("Listing", listingSchema);
