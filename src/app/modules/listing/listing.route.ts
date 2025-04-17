import express from "express";
import { ListingController } from "./listing.controller";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { ListingValidations } from "./listing.validation";

const router = express.Router();

router.post(
  "",
  auth("admin", "user"),
  validateRequest(ListingValidations.listingSchemaValidation),
  ListingController.createListing,
);
router.get("", ListingController.getAllAvailableListings);
router.get("/:id", auth("admin", "user"), ListingController.getSpecificAvailableListing);
router.put(
  "/:id",
  auth("admin", "user"),
  validateRequest(ListingValidations.updateListingSchemaValidation),
  ListingController.updateListing,
);
router.delete(
  "/:id",
  auth("admin", "user"),

  ListingController.deleteListing,
);

export const ListingRoutes = router;
