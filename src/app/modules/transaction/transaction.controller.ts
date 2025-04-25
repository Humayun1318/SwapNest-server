/* eslint-disable prettier/prettier */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TransactionServices } from "./transaction.service";

const createTransactionController = catchAsync(async (req, res) => {
  const transactionPayload = req.body;
  const userId = req.user?.userId;

  const createdOrder = await TransactionServices.createTransaction(transactionPayload, userId!);

  sendResponse(res, {
    success: true,
    message: "Transaction created successfully",
    statusCode: 201,
    data: createdOrder,
  });
});

const updateTransactionStatusByIdController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user?.userId;
  const { status } = req.body;

  const updatedStatus = await TransactionServices.updateTransactionStatusById(id, status, userId!);

  sendResponse(res, {
    success: true,
    message: "Transaction status updated successfully",
    statusCode: 200,
    data: updatedStatus,
  });
});

const getPurchasesHistoryBySpecificUserController = catchAsync(async (req, res) => {
  const userId = req.user?.userId;

  const purchasesHistory = await TransactionServices.getPurchasesHistoryBySpecificUser(userId!);

  const purchaseResult = {
    result: purchasesHistory,
  };
  sendResponse(res, {
    success: true,
    message: "Purchase history retrieved successfully",
    statusCode: 200,
    data: purchaseResult,
  });
});

const getSalesHistoryBySpecificUserController = catchAsync(async (req, res) => {
  const userId = req.user?.userId;

  const salesHistory = await TransactionServices.getSalesHistoryBySpecificUser(userId!);

  const saleResult = {
    result: salesHistory,
  };

  sendResponse(res, {
    success: true,
    message: "Sales history retrieved successfully",
    statusCode: 200,
    data: saleResult,
  });
});

export const TransactionControllers = {
  createTransactionController,
  updateTransactionStatusByIdController,
  getPurchasesHistoryBySpecificUserController,
  getSalesHistoryBySpecificUserController,
};
