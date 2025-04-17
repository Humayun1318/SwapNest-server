import AppError from "../../errors/AppError";
import { IListing, TListingUpdate } from "./listing.interface";
import { Listing } from "./listing.model";
import status from "http-status";

const createListingIntoDb = async (payload: IListing) => {
  const result = await Listing.create(payload);
  return result;
};

const getAllListingsFromDb = async () => {
  const result = await Listing.find().populate("userID", "name email");
  if (!result.length) {
    throw new AppError(status.NOT_FOUND, "No listings found,");
  }

  return result;
};
const getSpecificListingFromDb = async (id: string) => {
  const result = await Listing.findById(id).populate("userID", "name email");

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Listing is not found!");
  }
  if (result.isDeleted) {
    throw new AppError(status.FORBIDDEN, "The listing is deleted already!!");
  }

  return result;
};
const updateAListingIntoDb = async (
  listingId: string,
  userId: string | undefined,
  data: TListingUpdate,
) => {
  const isListingExist = await Listing.findById(listingId);

  if (!isListingExist) {
    throw new AppError(status.NOT_FOUND, "Listing is not existing now!");
  }
  if (isListingExist?.userID.toString() !== userId) {
    throw new AppError(
      status.UNAUTHORIZED,
      "You are not owner of this listing. You can't update!!",
    );
  }

  const result = await Listing.findByIdAndUpdate(listingId, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const ListingServices = {
  createListingIntoDb,
  getAllListingsFromDb,
  getSpecificListingFromDb,
  updateAListingIntoDb,
};
