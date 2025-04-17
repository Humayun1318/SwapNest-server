import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthServices } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const { identifier, password, ...rest } = req.body;

  // Detect if it's email or phone
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  // Prepare the user data, depending on whether the identifier is email or phone
  const userData = {
    ...rest,
    email: isEmail ? identifier : undefined,
    phone: !isEmail ? identifier : undefined,
    password, // Make sure password is passed in the request
  };

  // Register the user in the database
  const user = await AuthServices.userRegisteredIntoDB(userData);

  // Perform auto-login using the newly registered user credentials
  const loginData = {
    identifier, // The identifier can be either email or phone
    password, // Ensure the password is passed in for the login
  };

  const loginResult = await AuthServices.userLoginIntoDB(loginData);

  // Set the refresh token as a cookie in the response (optional for storing in browser)
  res.cookie("refreshToken", loginResult.refreshToken, {
    secure: config.NODE_ENV === "production", // Set secure cookie in production
    httpOnly: true, // To prevent access from JavaScript
  });

  // Send the response with the access token
  sendResponse(res, {
    success: true,
    message: "User registered and logged in successfully",
    statusCode: status.CREATED,
    data: {
      accessToken: loginResult.accessToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.userLoginIntoDB(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  const data = {
    accessToken: accessToken,
  };
  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: status.OK,
    data: data,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
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
