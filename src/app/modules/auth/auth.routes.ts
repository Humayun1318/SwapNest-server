import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.userValidationShcema),
  AuthController.registerUser,
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationShcema),
  AuthController.loginUser,
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
export const AuthRoutes = router;
