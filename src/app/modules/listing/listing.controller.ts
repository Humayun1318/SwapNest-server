import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ListingServices } from "./listing.service";
import httpStatus from "http-status";

const createListing = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await ListingServices.createListingIntoDb({ ...req.body, userID: userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing is created successfully",
    data: result,
  });
});

const getAllAvailableListings = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListingsFromDb();

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

export const ListingController = {
  createListing,
  getAllAvailableListings,
  getSpecificAvailableListing,
  updateListing,
};
