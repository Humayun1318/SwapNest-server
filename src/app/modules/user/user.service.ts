import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import status from "http-status";
const getAllUsersFromDB = async () => {
  const result = await User.find();
  if (!result.length) {
    throw new AppError(status.NOT_FOUND, "No users found,");
  }
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, "User is not found!");
  }
  if (result.isBlocked) {
    throw new AppError(status.FORBIDDEN, "User is Blocked");
  }

  return result;
};

const updateUserIntoDB = async (id: string, data: Partial<TUser>) => {
  const isUserExits = await User.findById(id);

  if (!isUserExits) {
    throw new AppError(status.NOT_FOUND, "User is not found!");
  }
  if (isUserExits.isBlocked) {
    throw new AppError(status.FORBIDDEN, "User is Blocked");
  }

  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const isUserExits = await User.findById(id);
  if (!isUserExits) {
    throw new AppError(status.NOT_FOUND, "User is not Found");
  }

  const result = await User.findByIdAndDelete(id);
  return result;
};

const userBlockByAdminIntoDB = async (id: string) => {
  const isUserExits = await User.findById(id);
  if (!isUserExits) {
    throw new AppError(status.NOT_FOUND, "User is not Found");
  }

  const { isBlocked } = isUserExits;

  const updatedIsBlocked = !isBlocked;
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: updatedIsBlocked },
    {
      new: true,
      runValidators: true,
    },
  );

  const message = updatedIsBlocked ? "User is Ban successfully" : "User is Unban successfully";

  return { result, message };
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserIntoDB,
  userBlockByAdminIntoDB,
};
