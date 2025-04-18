import { Router } from "express";
import { WishlistControllers } from "./wishlist.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("user"), WishlistControllers.addToWishlist);

router.get("/", auth("user"), WishlistControllers.getMyWishlist);

router.delete("/:id", auth("user"), WishlistControllers.deleteWishlist);

export const WishlistRouters = router;
