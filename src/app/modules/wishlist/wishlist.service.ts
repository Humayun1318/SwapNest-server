import { Wishlist } from "./wishlist.model";
import { TWishlistItem } from "./wishlist.interface";
import AppError from "../../errors/AppError";
import status from "http-status";

const addToWishlistDB = async (data: TWishlistItem) => {
  const exists = await Wishlist.findOne({
    user: data.user,
    listing: data.listing,
  });

  if (exists) {
    throw new AppError(status.CONFLICT, "Product already in wishlist");
  }

  const result = await Wishlist.create(data);
  return result;
};

const getUserWishlistDB = async (userId: string) => {
  const result = await Wishlist.find({ user: userId }).populate("listing");
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Wishlist items not found");
  }

  return result;
};

const removeFromWishlistDB = async (userId: string, listingId: string) => {
  const result = await Wishlist.findOneAndDelete({ user: userId, listing: listingId });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Wishlist item not found");
  }

  return result;
};

export const WishlistService = {
  addToWishlistDB,
  getUserWishlistDB,
  removeFromWishlistDB,
};
