import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ListingServices } from "./listing.service";
import httpStatus from "http-status";

const createListing = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await ListingServices.createListingIntoDb({
    ...req.body,
    userID: userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing is created successfully",
    data: result,
  });
});

const getAllAvailableListings = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListingsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listings are retrieved successfully",
    data: result,
  });
});

const getSpecificAvailableListing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ListingServices.getSpecificListingFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "The listing is retrieved successfully",
    data: result,
  });
});
const updateListing = catchAsync(async (req, res) => {
  const { id: listingId } = req.params;
  const userId = req.user?.userId;
  const listingData = req.body;
  const result = await ListingServices.updateAListingIntoDb(listingId, userId, listingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "The listing is updated successfully",
    data: result,
  });
});
const deleteListing = catchAsync(async (req, res) => {
  const { id: listingId } = req.params;
  const userId = req.user?.userId;
  const role = req.user?.role as "admin" | "user" | undefined;
  const result = await ListingServices.deleteAListingIntoDb(listingId, userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "The listing is deleted successfully",
    data: result,
  });
});

export const ListingController = {
  createListing,
  getAllAvailableListings,
  getSpecificAvailableListing,
  updateListing,
  deleteListing,
};
