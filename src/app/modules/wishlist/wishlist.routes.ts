import express from "express";
import auth from "../../middlewares/auth";
import { WishlistController } from "./wishlist.controller";
import validateRequest from "../../middlewares/validateRequest";
import { WishlistValidation } from "./wishlist.validation";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  validateRequest(WishlistValidation.addWishlistSchema),
  WishlistController.addToWishlist,
);

router.get("/", auth("user"), WishlistController.getMyWishlist);

router.delete("/:listingId", auth("user"), WishlistController.removeFromWishlist);

export const WishlistRoutes = router;
