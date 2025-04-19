/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WishlistServices } from "./wishlist.service";
import { TUser } from "../user/user.interface"; // Add this import
import AppError from "../../errors/AppError"; // Add this import
import { JwtPayload } from "jsonwebtoken";

export interface IDecodedUser extends JwtPayload {
  userId: string;
  role: string;
}
const addToWishlist = catchAsync(async (req, res) => {
  const user = req.user as IDecodedUser;
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }

  const userForService: Partial<TUser> = {
    id: user.userId,
  };

  const wishlist = await WishlistServices.addToWishlist(req.body, userForService as TUser);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Wishlist added successfully",
    data: wishlist,
  });
});

const getMyWishlist = catchAsync(async (req, res) => {
  const user = req.user as IDecodedUser;
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }
  const userForService: Partial<TUser> = {
    id: user.userId,
  };

  const result = await WishlistServices.getWishlist(userForService as TUser);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Wishlist retrieved successfully", // Fixed typo
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as IDecodedUser;
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }
  const userForService: Partial<TUser> = {
    id: user.userId,
  };

  const result = await WishlistServices.deleteWishlist(id, userForService as TUser);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Wishlist removed successfully",
    data: result,
  });
});

export const WishlistControllers = {
  addToWishlist,
  getMyWishlist,
  deleteWishlist,
};
