import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.put(
  "/:id",
  validateRequest(UserValidation.updateUserValidationShcema),
  UserController.updateUser,
);
router.put("/:id/ban", UserController.blockUserByAdmin);
router.delete("/:id", UserController.getSingleUser);

export const UserRoutes = router;
