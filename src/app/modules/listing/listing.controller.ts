import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ListingServices } from "./listing.service";
import httpStatus from "http-status";

const createListing = catchAsync(async (req, res) => {
  const result = await ListingServices.createListingIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing is created successfully",
    data: result,
  });
});

const getAllAvailableListings = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await ListingServices.getAllListingsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing is created successfully",
    data: result,
  });
});

export const ListingController = {
  createListing,
  getAllAvailableListings,
};
