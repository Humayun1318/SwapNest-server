import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { forbiddenKeys, ListingSearchableFields } from "./listing.constant";
import { ListingStatus, TListingCreate, TListingUpdate } from "./listing.interface";
import { Listing } from "./listing.model";
import status from "http-status";

const createListingIntoDb = async (payload: TListingCreate) => {
  const savingListing = {
    ...payload,
    status: ListingStatus.AVAILABLE,
    isDeleted: false,
  };
  const result = await Listing.create(savingListing);
  return result;
};

const getAllListingsFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Listing.find().populate("userID", "name email"), query)
    .search(ListingSearchableFields)
    .filter();

  const result = await courseQuery.modelQuery;
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
  if (isListingExist?.status === "sold") {
    throw new AppError(
      status.FORBIDDEN,
      "The listing is already sold out. You can't update more!!",
    );
  }
  if (isListingExist?.isDeleted) {
    throw new AppError(status.FORBIDDEN, "The listing is not available");
  }
  if (isListingExist?.userID.toString() !== userId) {
    throw new AppError(
      status.UNAUTHORIZED,
      "You are not owner of this listing. You can't update!!",
    );
  }

  for (const key of forbiddenKeys) {
    if (key in data) {
      throw new AppError(status.BAD_REQUEST, `You are not allowed to update '${key}'`);
    }
  }

  const result = await Listing.findByIdAndUpdate(listingId, data, {
    new: true,
    runValidators: true,
  }).populate("userID", "name email");
  return result;
};
const deleteAListingIntoDb = async (
  listingId: string,
  userId: string | undefined,
  role: "admin" | "user" | undefined,
) => {
  const isListingExist = await Listing.findById(listingId);

  if (!isListingExist) {
    throw new AppError(status.NOT_FOUND, "Listing is not found!!");
  }
  // Only allow if admin or listing owner
  if (role !== "admin" && isListingExist.userID.toString() !== userId) {
    throw new AppError(status.UNAUTHORIZED, "You are not authorized to delete this listing.");
  }

  // Soft delete
  isListingExist.isDeleted = true;
  await isListingExist.save();

  return isListingExist;
};

export const ListingServices = {
  createListingIntoDb,
  getAllListingsFromDb,
  getSpecificListingFromDb,
  updateAListingIntoDb,
  deleteAListingIntoDb,
};
