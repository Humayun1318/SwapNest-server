/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { Listing } from "../listing/listing.model";
import { User } from "../user/user.model";
import { TTransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createTransaction = async (payload: TTransaction, identifier: string) => {
  // check if buyer is exists
  const buyer = await User.isUserExistsByCustomEmail(identifier);
  if (!buyer) {
    throw new AppError(404, "Buyer not found with this ID");
  }

  // check if listing is exists
  const listing = await Listing.findOne({ _id: payload.itemID });
  if (!listing) {
    throw new AppError(404, "Item not found with this ID");
  }
  if (!listing.userID) {
    throw new AppError(400, "Listing has no seller information");
  }
  // check if seller is exists
  const seller = await User.findOne({ _id: listing.userID });
  if (!seller) {
    throw new AppError(404, "Seller not found with this ID");
  }
  if (buyer.id.toString() === seller.id.toString()) {
    throw new AppError(400, "You cannot purchase your own listing");
  }
  const createdOrder = await Transaction.create(payload);
  return createdOrder;
};

const updateTransactionStatusById = async (id: string, status: string, identifier: string) => {
  // check if user is exists
  const user = await User.isUserExistsByCustomEmail(identifier);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const validStatuses = ["pending", "completed"];

  if (!validStatuses.includes(status)) {
    throw new AppError(400, `Invalid status: ${status}`);
  }

  const updatedStatus = await Transaction.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true, runValidators: true },
  );

  if (!updatedStatus) {
    throw new AppError(404, "No transaction found with ID");
  }

  return updatedStatus;
};

const getPurchasesHistoryBySpecificUser = async (
  identifier: string,
  query: Record<string, unknown>,
) => {
  const user = await User.isUserExistsByCustomEmail(identifier);
  // console.log(user)
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const activeListingIds = await Listing.find({ isDeleted: false }).distinct("_id");

  const purchasesHistoryQuery = new QueryBuilder(
    Transaction.find({ buyerID: user.id, itemID: { $in: activeListingIds } })
      .populate("buyerID", "_id name identifier role")
      .populate("sellerID", "_id name identifier role")
      .populate("itemID"),
    query,
  )
    .sort()
    .paginate();

  const meta = await purchasesHistoryQuery.countTotal();
  const result = await purchasesHistoryQuery.modelQuery;

  if (result.length === 0) {
    throw new AppError(404, "No purchases history found for this user");
  }

  return {
    meta,
    result,
  };
};

const getSalesHistoryBySpecificUser = async (
  identifier: string,
  query: Record<string, unknown>,
) => {
  const user = await User.isUserExistsByCustomEmail(identifier);
  // console.log(user)
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const activeListingIds = await Listing.find({ isDeleted: false }).distinct("_id");

  const salesHistoryQuery = new QueryBuilder(
    Transaction.find({ sellerID: user.id, itemID: { $in: activeListingIds } })
      .populate("buyerID", "_id name identifier role")
      .populate("sellerID", "_id name identifier role")
      .populate("itemID"),
    query,
  )
    .sort()
    .paginate();

  const meta = await salesHistoryQuery.countTotal();
  const result = await salesHistoryQuery.modelQuery;

  if (result.length === 0) {
    throw new AppError(404, "No sales history found for this user");
  }

  return {
    meta,
    result,
  };
};

export const TransactionServices = {
  createTransaction,
  updateTransactionStatusById,
  getPurchasesHistoryBySpecificUser,
  getSalesHistoryBySpecificUser,
};
