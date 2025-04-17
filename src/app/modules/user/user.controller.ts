import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import status from "http-status";
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users are retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is retrieve successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  const result = await UserServices.updateUserIntoDB(userId, userData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is update successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await UserServices.deleteUserIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is deleted successfully",
    data: "",
  });
});

const blockUserByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { result, message } = await UserServices.userBlockByAdminIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: message,
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  blockUserByAdmin,
};
