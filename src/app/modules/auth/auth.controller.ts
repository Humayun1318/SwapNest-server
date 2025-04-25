import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthServices } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const { identifier, password, ...rest } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const userData = {
    ...rest,
    email: isEmail ? identifier : undefined,
    phone: !isEmail ? identifier : undefined,
    password,
  };

  // eslint-disable-next-line no-unused-vars
  const user = await AuthServices.userRegisteredIntoDB(userData);

  const loginData = {
    identifier,
    password,
  };

  const loginResult = await AuthServices.userLoginIntoDB(loginData);

  res.cookie("refreshToken", loginResult.refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: "User registered and logged in successfully",
    statusCode: status.CREATED,
    data: {
      accessToken: loginResult.accessToken,
      refreshToken: loginResult.refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.userLoginIntoDB(req.body);
  const { refreshToken, accessToken } = result;
  // res.cookie("refreshToken", refreshToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  //   sameSite: "strict",
  // });

  const data = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: status.OK,
    data: data,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { authorization } = req.headers;

  // const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(authorization as string);
  sendResponse(res, {
    success: true,
    message: "Access token retrieved successfully!",
    statusCode: status.OK,
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  refreshToken,
};
