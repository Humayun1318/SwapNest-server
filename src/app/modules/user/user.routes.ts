import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), UserController.getAllUsers);
router.get("/:id", auth("user", "admin"), UserController.getSingleUser);
router.put(
  "/:id",
  auth("user"),
  validateRequest(UserValidation.updateUserValidationShcema),
  UserController.updateUser,
);
router.put("/:id/ban", auth("admin"), UserController.blockUserByAdmin);
router.delete("/:id", auth("user", "admin"), UserController.deleteUser);

export const UserRoutes = router;
