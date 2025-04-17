import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import status from "http-status";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";
const userRegisteredIntoDB = async (payload: TUser) => {
  if (!payload.email && !payload.phone) {
    throw new AppError(400, "Either email or phone is required");
  }

  if (payload.phone === null) delete payload.phone;
  if (payload.email === null) delete payload.email;

  const user = await User.create(payload);

  const loginPayload = {
    identifier: payload.email || payload.phone || "",
    password: payload.password,
  };

  const loginResult = await userLoginIntoDB(loginPayload);

  return {
    user,
    loginResultUser: loginResult.user,
    accessToken: loginResult.accessToken,
    refreshToken: loginResult.refreshToken,
  };
};

const userLoginIntoDB = async (payload: TLoginUser) => {
  const { identifier, password } = payload;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const queryKey = isEmail ? { email: identifier } : { phone: identifier };

  const user = await User.findOne(queryKey).select("+password");

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  if (user?.isBlocked) {
    throw new AppError(status.FORBIDDEN, "Access denied. Your account has been Deactivate.");
  }

  if (!(await User.isPasswordMatched(password, user?.password)))
    throw new AppError(status.FORBIDDEN, "Password does not matched");

  const jwtPayload = {
    userId: user?._id.toString(),
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_exires_in as string,
  );
  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
  const { userId } = decoded;
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }
  if (user?.isBlocked) {
    throw new AppError(status.FORBIDDEN, "Access denied. Your account has been Deactivate.");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );
  return { accessToken };
};

export const AuthServices = {
  userRegisteredIntoDB,
  userLoginIntoDB,
  refreshToken,
};
