import { IListing, TListingCreate } from "./listing.interface";
import { Listing } from "./listing.model";

const createListingIntoDb = async (payload: TListingCreate) => {
  const listingData = {
    ...payload,
    userID: "123456777", // ✅ Automatically add the userID here
  };
  const result = await Listing.create(listingData);
  return result;
};

const getAllListingsFromDb = async () => {
  const result = await Listing.find();
  return result;
};

export const ListingServices = {
  createListingIntoDb,
  getAllListingsFromDb,
};
