import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { WishlistService } from "./wishlist.service";
import AppError from "../../errors/AppError";
import { Types } from "mongoose";

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const listingId = req.body.listing;

  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }
  const result = await WishlistService.addToWishlistDB({
    user: new Types.ObjectId(userId),
    listing: listingId,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Product added to wishlist",
    data: result,
  });
});

const getMyWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }
  const result = await WishlistService.getUserWishlistDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Wishlist retrieved successfully",
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const listingId = req.params.listingId;

  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  const result = await WishlistService.removeFromWishlistDB(userId, listingId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product removed from wishlist",
    data: result,
  });
});

export const WishlistController = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
};
